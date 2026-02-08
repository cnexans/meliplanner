import { CarbOption } from '@/types';

export const carbs: CarbOption[] = [
  {
    id: 'carb1',
    name: 'Batata, boniato o papa cocida (100g)',
    emoji: '🍠',
    ingredients: [
      { name: 'Batata/boniato/papa', quantity: 100, unit: 'g', section: 'verduleria' },
    ],
  },
  {
    id: 'carb2',
    name: 'Calabaza o zapallo cocido (300g)',
    emoji: '🎃',
    ingredients: [
      { name: 'Calabaza/zapallo', quantity: 300, unit: 'g', section: 'verduleria' },
    ],
  },
  {
    id: 'carb3',
    name: 'Medio plátano',
    emoji: '🍌',
    ingredients: [
      { name: 'Plátano', quantity: 0.5, unit: 'u', section: 'verduleria' },
    ],
  },
  {
    id: 'carb4',
    name: 'Una fruta de estación',
    emoji: '🍎',
    ingredients: [
      { name: 'Fruta de estación', quantity: 1, unit: 'u', section: 'verduleria' },
    ],
  },
  {
    id: 'carb5',
    name: 'Chocolate sin azúcar 70% (25g)',
    emoji: '🍫',
    ingredients: [
      { name: 'Chocolate negro 70% sin azúcar (Nutrirte)', quantity: 25, unit: 'g', section: 'dietetica' },
    ],
  },
  {
    id: 'carb6',
    name: 'Arroz yamani integral (1/2 taza cocido)',
    emoji: '🍚',
    maxPerWeek: 2,
    ingredients: [
      { name: 'Arroz yamani integral', quantity: 75, unit: 'g', section: 'almacen' },
    ],
  },
  {
    id: 'carb7',
    name: 'Pasta integral (1/2 taza cocida)',
    emoji: '🍝',
    maxPerWeek: 2,
    ingredients: [
      { name: 'Pasta integral', quantity: 75, unit: 'g', section: 'almacen' },
    ],
  },
  {
    id: 'carb8',
    name: 'Quinoa (1/2 taza cocida)',
    emoji: '🌾',
    maxPerWeek: 2,
    ingredients: [
      { name: 'Quinoa', quantity: 75, unit: 'g', section: 'almacen' },
    ],
  },
  {
    id: 'carb9',
    name: 'Lentejas o arvejas (1/2 taza cocidas)',
    emoji: '🫘',
    maxPerWeek: 2,
    ingredients: [
      { name: 'Lentejas/arvejas', quantity: 75, unit: 'g', section: 'almacen' },
    ],
  },
  {
    id: 'carb10',
    name: 'Pan integral Val Maira (2 rebanadas)',
    emoji: '🍞',
    maxPerWeek: 2,
    ingredients: [
      { name: 'Pan integral Val Maira', quantity: 2, unit: 'rebanadas', section: 'panaderia_keto' },
    ],
  },
];
