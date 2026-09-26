import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type {
  IncidentPriority,
  IncidentsDict,
  IncidentStatus,
  IncidentType,
} from '@/shared/domain';
import { STATUSES, statusesList } from '@/shared/consts';
import { getOptionsListFromRecord, type AppSelectOption } from '@/shared/components/ui';
import { incidentsService } from '../services/IncidentsService';
import { parseIncidentDate } from '../components/helpers/parseIncidentDate';

const INCIDENTS_STATUSES = {
  all: 'Все статусы',
  ...STATUSES,
};

const INCIDENTS_SORTING = {
  date: 'По обновлению',
  priority: 'По приоритету',
};

const SEARCH_FIELDS: ['title', 'service'] = ['title', 'service'];

const PRIORITY_ORDER: Record<IncidentPriority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

let lastIncidentsRequestId = 0; // Защита от race condition загрузки/обновления списка инцидентов
let incidentsFailureCounter = 0;

function normalizeSearchValue(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, '');
}

export const useIncidentsStore = defineStore('incidents', () => {
  const incidentsQuery = ref('');
  const isIncidentsLoading = ref(false);
  const incidents = ref<IncidentsDict>({});
  const incidentsError = ref('');
  const selectedIncidentId = ref<string | null>(null);
  const incidentStatusSelected = ref<AppSelectOption>({ id: 'all', label: 'Все статусы' });
  const incidentSortingSelected = ref<AppSelectOption>({ id: 'date', label: 'По обновлению' });

  const incidentsStatusesOptionsList = getOptionsListFromRecord(INCIDENTS_STATUSES);
  const incidentsSortingOptionsList = getOptionsListFromRecord(INCIDENTS_SORTING);

  const incidentSelected = computed(() => {
    if (!selectedIncidentId.value) return null;
    return incidents.value[selectedIncidentId.value] || null;
  });

  const incidentsList = computed<IncidentType[]>(() => {
    return Object.values(incidents.value);
  });

  const currentIncidentSelectedOption = computed(() =>
    statusesList.find((option) => incidentSelected.value?.status === option.id),
  );

  const incidentsFilteredList = computed<IncidentType[]>(() => {
    const normalizedQuery = normalizeSearchValue(incidentsQuery.value);

    const filteredListQuery = incidentsList.value.filter((incident) =>
      SEARCH_FIELDS.some((field) =>
        normalizeSearchValue(incident[field]).includes(normalizedQuery),
      ),
    );

    if (incidentStatusSelected.value.id === 'all') {
      return filteredListQuery;
    }

    const incidentsFilteredQueryStatus = filteredListQuery.filter(
      (incident) => incident.status === incidentStatusSelected.value.id,
    );

    return incidentsFilteredQueryStatus;
  });

  const incidentsFilteredSortedList = computed<IncidentType[]>(() => {
    const result = [...incidentsFilteredList.value];

    if (incidentSortingSelected.value.id === 'priority') {
      result.sort((a, b) => {
        const aPriority = PRIORITY_ORDER[a.priority] ?? Number.MAX_SAFE_INTEGER;
        const bPriority = PRIORITY_ORDER[b.priority] ?? Number.MAX_SAFE_INTEGER;
        return aPriority - bPriority;
      });

      return result;
    }

    result.sort((a, b) => parseIncidentDate(b.updatedAt) - parseIncidentDate(a.updatedAt));
    return result;
  });

  const dashboardView = computed(() => {
    if (isIncidentsLoading.value) return 'loading';
    if (incidentsError.value) return 'error';
    if (incidentsFilteredSortedList.value.length === 0) return 'empty';
    return 'list';
  });

  function handleIncidentsStatusSelect(incidentsStatus: AppSelectOption) {
    incidentStatusSelected.value = incidentsStatus;
  }

  function handleIncidentsSortingSelect(incidentsSorting: AppSelectOption) {
    incidentSortingSelected.value = incidentsSorting;
  }

  function handleSelectIncident(incident: IncidentType) {
    selectedIncidentId.value = incident.id;
  }

  function handleResetSelectedIncident() {
    selectedIncidentId.value = null;
  }

  async function updateIncidentsList() {
    lastIncidentsRequestId += 1;
    const requestId = lastIncidentsRequestId;

    incidentsFailureCounter += 1;

    try {
      if (incidentsFailureCounter === 10) {
        throw new Error('[ERROR 429]: Исчерпан лимит на кол-во запросов!');
      }

      isIncidentsLoading.value = true;
      incidents.value = {};
      incidentsError.value = '';
      selectedIncidentId.value = null;

      const response = await incidentsService.fetchAllIncidents();

      if (requestId !== lastIncidentsRequestId) {
        return;
      }

      incidents.value = response;
    } catch (e) {
      if (e instanceof Error) {
        incidentsError.value = e.message;
        incidentsFailureCounter = 0;
        return;
      }

      if (requestId !== lastIncidentsRequestId) {
        return;
      }
    } finally {
      if (requestId === lastIncidentsRequestId) {
        isIncidentsLoading.value = false;
      }
    }
  }

  async function initIncidentsList() {
    try {
      if (incidentsList.value.length > 0) {
        return;
      }

      isIncidentsLoading.value = true;
      incidents.value = {};
      incidentsError.value = '';
      selectedIncidentId.value = null;

      const response = await incidentsService.fetchAllIncidents();
      incidents.value = response;
    } catch (e) {
      if (e instanceof Error) {
        incidentsError.value = e.message;
        return;
      }
    } finally {
      isIncidentsLoading.value = false;
    }
  }

  async function handleChangeIncidentStatus(incident: AppSelectOption) {
    const incidentSelectedId = incidentSelected.value?.id;

    if (!incidentSelectedId) {
      return;
    }

    const currentIncident = incidents.value[incidentSelectedId];

    if (!currentIncident) {
      return;
    }

    // Реализация стратегии uptimistic update
    const prevIncidentStatus = currentIncident.status;
    const nextIncidentStatus = incident.id as IncidentStatus;

    currentIncident.status = nextIncidentStatus;

    try {
      await incidentsService.updateIncidentStatus(currentIncident);
    } catch {
      currentIncident.status = prevIncidentStatus;
    }
  }

  return {
    incidents,
    dashboardView,
    incidentsQuery,
    incidentSelected,
    isIncidentsLoading,
    incidentStatusSelected,
    incidentSortingSelected,
    incidentsFilteredSortedList,
    incidentsSortingOptionsList,
    incidentsStatusesOptionsList,
    currentIncidentSelectedOption,
    incidentsError,
    initIncidentsList,
    updateIncidentsList,
    handleSelectIncident,
    handleResetSelectedIncident,
    handleIncidentsStatusSelect,
    handleIncidentsSortingSelect,
    handleChangeIncidentStatus,
  };
});
