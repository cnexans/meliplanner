import { StoreSection } from '@/types';

export const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const MEAL_TYPE_LABELS: Record<string, string> = {
  breakfast: 'Desayuno',
  lunch: 'Almuerzo',
  snack: 'Snack',
  dinner: 'Cena',
  dessert: 'Postre',
};

export const MEAL_TYPE_EMOJIS: Record<string, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  snack: '🍎',
  dinner: '🌙',
  dessert: '🍮',
};

export const SECTION_NAMES: Record<StoreSection, string> = {
  carniceria: 'Carnicería',
  pescaderia: 'Pescadería',
  verduleria: 'Verdulería',
  lacteos: 'Lácteos',
  almacen: 'Almacén',
  dietetica: 'Dietética',
  congelados: 'Congelados',
  panaderia_keto: 'Panadería Keto',
};

export const SECTION_ORDER: StoreSection[] = [
  'carniceria',
  'pescaderia',
  'verduleria',
  'lacteos',
  'almacen',
  'dietetica',
  'congelados',
  'panaderia_keto',
];

export const PERSON_COLORS = {
  carlos: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', accent: '#3B82F6' },
  johana: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300', accent: '#EC4899' },
  both: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', accent: '#8B5CF6' },
};

export const PERSON_DEFAULTS = {
  carlos: {
    daysPerWeek: 3,
    upperDays: 2,
    lowerDays: 1,
    defaultSets: 4,
    defaultReps: '8-10',
    cardio: { type: 'cinta' as const, duration: 20, incline: 'máxima', speed: '5-6' },
  },
  johana: {
    daysPerWeek: 3,
    upperDays: 1,
    lowerDays: 2,
    defaultSets: 4,
    defaultReps: '8-10',
    cardio: { type: 'cinta' as const, duration: 20, incline: 'máxima', speed: '5' },
  },
};
