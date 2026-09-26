<script setup lang="ts">
type AppInputProps = {
  id: string;
  modelValue: string;
  label: string;
  placeholder?: string;
};
defineProps<AppInputProps>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
</script>
<template>
  <div class="app-input-field">
    <label class="app-input-label" :for="id">{{ label }}</label>
    <input
      type="text"
      :id="id"
      class="app-input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
<style scoped>
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
</style>
