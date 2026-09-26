import { getOptionsListFromRecord } from './components/ui';
import type { IncidentPriority, IncidentStatus } from './domain';

export type AppTagColors = {
  backgroundColor: string;
  textColor: string;
};

export const PRIORITIES: Record<IncidentPriority, string> = {
  critical: 'Критичный',
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
};
export const prioritiesList = getOptionsListFromRecord(PRIORITIES);

export const STATUSES: Record<IncidentStatus, string> = {
  'in-progress': 'В работе',
  investigating: 'Расследуется',
  monitoring: 'Мониторинг',
  new: 'Новый',
  solved: 'Решён',
};
export const statusesList = getOptionsListFromRecord(STATUSES);

export const USERS: Record<string, string> = {
  'anna-smirnova': 'Анна Смирнова',
  'ivan-kuznetsov': 'Иван Кузнецов',
  'maria-orlova': 'Мария Орлова',
  'petr-volkov': 'Пётр Волков',
  'elena-novikova': 'Елена Новикова',
  'sergey-morozov': 'Сергей Морозов',
  'olga-belova': 'Ольга Белова',
  'dmitry-sokolov': 'Дмитрий Соколов',
  'alexey-pavlov': 'Алексей Павлов',
};
export const usersList = getOptionsListFromRecord(USERS);

export const SERVICES: Record<string, string> = {
  checkout: 'Оформление',
  payments: 'Платежи',
  accounts: 'Аккаунты',
  notifications: 'Уведомления',
  auth: 'Аутентификация',
  search: 'Поиск',
  warehouse: 'Склад',
  cart: 'Корзина',
  cdn: 'CDN',
  observability: 'Observability',
};
export const servicesList = getOptionsListFromRecord(SERVICES);

export const PRIORITY_TAG_COLORS: Record<IncidentPriority, AppTagColors> = {
  critical: { backgroundColor: '#fee2e2', textColor: '#b91c1c' },
  high: { backgroundColor: '#ffedd5', textColor: '#c2410c' },
  medium: { backgroundColor: '#fef9c3', textColor: '#a16207' },
  low: { backgroundColor: '#dbeafe', textColor: '#1d4ed8' },
};

export const STATUS_TAG_COLORS: Record<IncidentStatus, AppTagColors> = {
  'in-progress': { backgroundColor: '#f3e8ff', textColor: '#7e22ce' },
  investigating: { backgroundColor: '#e0e7ff', textColor: '#4338ca' },
  monitoring: { backgroundColor: '#e0f2fe', textColor: '#0369a1' },
  new: { backgroundColor: '#ecfeff', textColor: '#0e7490' },
  solved: { backgroundColor: '#dcfce7', textColor: '#15803d' },
};
