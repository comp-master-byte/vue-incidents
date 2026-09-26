<script setup lang="ts">
import { AppButton, AppInput, AppModal } from '@/shared/components/ui';
import { useIncidentsCreateModalStore } from '../store/useIncidentsCreateModalStore';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const incidentsCreateModalStore = useIncidentsCreateModalStore();

const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
  }),
});

const { value: title } = useField<string>('title');
const { value: description } = useField<string>('description');

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
