<script setup lang="ts">
import {
  AppButton,
  AppInput,
  AppModal,
  AppSelect,
  type AppSelectOption,
} from '@/shared/components/ui';
import { useIncidentsCreateModalStore } from '../store/useIncidentsCreateModalStore';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { prioritiesList, servicesList, statusesList, usersList } from '@/shared/consts';

const incidentsCreateModalStore = useIncidentsCreateModalStore();

const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    service: yup
      .object({
        id: yup.string().required(),
        label: yup.string().required(),
      })
      .required(),
    priority: yup
      .object({
        id: yup.string().required(),
        label: yup.string().required(),
      })
      .required(),
    status: yup
      .object({
        id: yup.string().required(),
        label: yup.string().required(),
      })
      .required(),
    assignee: yup
      .object({
        id: yup.string().required(),
        label: yup.string().required(),
      })
      .required(),
  }),
  initialValues: {
    title: '',
    description: '',
    service: null,
    priority: null,
    status: null,
    assignee: null,
  },
});

const { value: title } = useField<string>('title');
const { value: description } = useField<string>('description');
const { value: service } = useField<AppSelectOption>('service');
const { value: priority } = useField<AppSelectOption>('priority');
const { value: status } = useField<AppSelectOption>('status');
const { value: assignee } = useField<AppSelectOption>('assignee');

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>
<template>
  <AppModal v-model="incidentsCreateModalStore.createModalValue">
    <h1>Создать инцидент</h1>
    <form @submit="onSubmit" class="create-modal__form">
      <AppInput
        label="Название"
        id="incident-name"
        placeholder="Название инцидента..."
        v-model="title"
      />
      <AppInput
        label="Описание"
        id="incident-description"
        placeholder="Описание инцидента..."
        v-model="description"
      />
      <AppSelect label="Сервис" v-model="service" :options="servicesList" />
      <AppSelect label="Приоритет" v-model="priority" :options="prioritiesList" />
      <AppSelect label="Статус" v-model="status" :options="statusesList" />
      <AppSelect label="Ответственный" v-model="assignee" :options="usersList" />

      <AppButton type="submit">Создать</AppButton>
    </form>
  </AppModal>
</template>
<style scoped>
.create-modal__form {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin-top: 15px;
}
</style>
