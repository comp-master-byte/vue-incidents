<script setup lang="ts">
import { AppInput, AppSelect } from '@/shared/components/ui';
import { useIncidentsStore } from '../store';

const incidentsStore = useIncidentsStore();
</script>
<template>
  <section class="incidents-filter__wrapper">
    <AppSelect
      size="m"
      label="Статус"
      :options="incidentsStore.incidentsStatusesOptionsList"
      :selected-option="incidentsStore.incidentStatusSelected"
      @select-option="incidentsStore.handleIncidentsStatusSelect"
    />

    <AppInput
      label="Поиск"
      id="incidents-search"
      placeholder="Поиск по заголовку или сервису"
      v-model="incidentsStore.incidentsQuery"
    />

    <AppSelect
      size="m"
      label="Сортировка"
      :options="incidentsStore.incidentsSortingOptionsList"
      :selected-option="incidentsStore.incidentSortingSelected"
      @select-option="incidentsStore.handleIncidentsSortingSelect"
    />
  </section>
</template>
<style scoped>
.incidents-filter__wrapper {
  display: flex;
  column-gap: 8px;
  margin-bottom: 12px;
}
.app-input-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.app-input-label {
  width: fit-content;
  color: #334155;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}
.app-input {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background-color: var(--color-white);
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.app-input::placeholder {
  color: #94a3b8;
}
.app-input:hover {
  border-color: #cbd5e1;
}
.app-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(93, 95, 239, 0.15);
}

@media (max-width: 900px) {
  .incidents-filter__wrapper {
    flex-direction: column;
    row-gap: 10px;
  }

  .incidents-filter__wrapper :deep(.app-select),
  .incidents-filter__wrapper :deep(.size-s),
  .incidents-filter__wrapper :deep(.size-m),
  .incidents-filter__wrapper :deep(.size-l) {
    width: 100%;
  }
}
</style>
