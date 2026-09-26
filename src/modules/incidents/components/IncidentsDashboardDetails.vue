<script setup lang="ts">
import { AppSelect } from '@/shared/components/ui';
import { useIncidentsStore } from '../store';
import { PRIORITIES, statusesList } from '@/shared/consts';

const incidentsStore = useIncidentsStore();
</script>

<template>
  <section class="incidents-details white-wrapper">
    <header class="incidents-details__header">
      <p class="incidents-details__eyebrow">Детали инцидента</p>
      <button class="incidents-details__close" @click="incidentsStore.handleResetSelectedIncident">
        Закрыть
      </button>
    </header>

    <h2 class="incidents-details__title">{{ incidentsStore.incidentSelected?.title }}</h2>

    <div class="incidents-details__grid">
      <div class="incidents-details__field">
        <span class="incidents-details__label">ID</span>
        <strong class="incidents-details__value">{{ incidentsStore.incidentSelected?.id }}</strong>
      </div>

      <div class="incidents-details__field">
        <span class="incidents-details__label">Сервис</span>
        <strong class="incidents-details__value">{{
          incidentsStore.incidentSelected?.service
        }}</strong>
      </div>

      <div class="incidents-details__field">
        <span class="incidents-details__label">Приоритет</span>
        <strong class="incidents-details__value">{{
          PRIORITIES[incidentsStore.incidentSelected!.priority]
        }}</strong>
      </div>

      <div class="incidents-details__field">
        <span class="incidents-details__label">Ответственный</span>
        <strong class="incidents-details__value">{{
          incidentsStore.incidentSelected?.assignee
        }}</strong>
      </div>

      <div class="incidents-details__field">
        <span class="incidents-details__label">Последнее обновление</span>
        <strong class="incidents-details__value">{{
          incidentsStore.incidentSelected?.updatedAt
        }}</strong>
      </div>
    </div>

    <p class="incidents-details__description">{{ incidentsStore.incidentSelected?.description }}</p>

    <AppSelect
      size="fit-content"
      label="Статус"
      :options="statusesList"
      v-model="incidentsStore.currentIncidentSelectedOption!"
    />
  </section>
</template>

<style scoped>
.incidents-details {
  padding: 28px;
  align-self: start;
}

.incidents-details__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.incidents-details__eyebrow {
  margin: 0;
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.incidents-details__close {
  border: none;
  background: transparent;
  padding: 0;
  color: var(--color-text-muted);
  font-size: 14px;
  cursor: pointer;
}

.incidents-details__close:hover {
  color: var(--color-text-primary);
}

.incidents-details__title {
  margin: 0 0 15px;
  color: var(--color-text-primary);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
}

.incidents-details__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.incidents-details__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 14px;
  background-color: var(--color-surface-muted);
}

.incidents-details__label {
  color: var(--color-text-secondary);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.incidents-details__value {
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
}

.incidents-details__description {
  margin: 0;
  margin-bottom: 15px;
  color: var(--color-text-primary);
  font-size: 15px;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .incidents-details {
    padding: 20px 16px;
  }

  .incidents-details__title {
    font-size: 18px;
  }

  .incidents-details__grid {
    grid-template-columns: 1fr;
  }
}
</style>
