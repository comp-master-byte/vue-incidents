<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

export type AppSelectOption = {
  id: string;
  label: string;
};
type AppSelectProps = {
  label?: string;
  options: AppSelectOption[];
  size?: 's' | 'm' | 'l' | 'fit-content';
  modelValue: AppSelectOption | null;
};

defineProps<AppSelectProps>();
const emit = defineEmits<{
  'update:modelValue': [value: AppSelectOption];
}>();

const rootRef = ref<HTMLElement | null>(null);
const isSelectOptionsVisible = ref(false);

function toggleSelectOptionsVisibility() {
  isSelectOptionsVisible.value = !isSelectOptionsVisible.value;
}

function handleSelectOption(option: AppSelectOption) {
  isSelectOptionsVisible.value = false;
  emit('update:modelValue', option);
}

function handleDocumentPointerDown(event: PointerEvent) {
  if (!isSelectOptionsVisible.value || !rootRef.value) {
    return;
  }

  const target = event.target as Node | null;
  if (target && !rootRef.value.contains(target)) {
    isSelectOptionsVisible.value = false;
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointerDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleDocumentPointerDown);
});
</script>
<template>
  <div ref="rootRef" class="app-select" :class="`size-${size || 'fit-content'}`">
    <label v-if="label" class="app-label">{{ label }}</label>
    <div
      class="app-select__button"
      :class="{ 'app-select__button--open': isSelectOptionsVisible }"
      @click="toggleSelectOptionsVisibility"
    >
      <span class="app-select__value">{{ modelValue?.label || 'Выберите значение' }}</span>
      <svg
        class="app-select__chevron"
        :class="{ 'app-select__chevron--open': isSelectOptionsVisible }"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div v-if="isSelectOptionsVisible" class="app-select__options">
      <p
        v-for="option in options"
        :key="option.id"
        class="app-select__option"
        @click="handleSelectOption(option)"
      >
        {{ option.label }}
      </p>
    </div>
  </div>
</template>
<style scoped>
.app-select {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.app-label {
  width: fit-content;
  color: #334155;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}

.app-select__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background-color: var(--color-white);
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.app-select__value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-select__chevron {
  flex-shrink: 0;
  color: var(--color-text-secondary);
  transition: transform 0.2s ease;
}

.app-select__chevron--open {
  transform: rotate(180deg);
}

.app-select__button:hover {
  border-color: #cbd5e1;
}

.app-select__button--open {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(93, 95, 239, 0.15);
}

.app-select__options {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: var(--color-white);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.app-select__option {
  margin: 0;
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  line-height: 1.3;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.app-select__option:hover {
  background-color: var(--color-surface-muted);
}

.app-select__option--selected {
  background-color: var(--color-white-selected);
  font-weight: 600;
}

.size-s {
  width: 250px;
}
.size-m {
  width: 300px;
}
.size-l {
  width: 400px;
}
.size-fit-content {
  width: 100%;
}
</style>
