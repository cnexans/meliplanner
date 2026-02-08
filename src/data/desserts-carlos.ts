import { SnackOption } from '@/types';

export const dessertsCarlos: SnackOption[] = [
  {
    id: 'dc1',
    name: 'Iced Protein Coffee',
    shortName: 'Protein Coffee',
    emoji: '☕',
    forPerson: 'carlos',
    category: 'proteic',
    ingredients: [
      { name: 'Leche de almendras sin azúcar', quantity: 0.5, unit: 'taza', section: 'almacen' },
      { name: 'Whey protein', quantity: 0.5, unit: 'scoop', section: 'dietetica' },
    ],
  },
  {
    id: 'dc2',
    name: 'Gelatina proteica',
    shortName: 'Gelatina proteica',
    emoji: '🍮',
    forPerson: 'carlos',
    category: 'proteic',
    ingredients: [
      { name: 'Gelatina sin sabor', quantity: 1, unit: 'sobre', section: 'almacen' },
      { name: 'Whey protein', quantity: 1, unit: 'scoop', section: 'dietetica' },
      { name: 'Cacao sin azúcar', quantity: 2, unit: 'cdas', section: 'almacen' },
    ],
  },
  {
    id: 'dc3',
    name: 'Merenguitos Snack Well (1/2 paquete)',
    shortName: 'Merenguitos',
    emoji: '🍬',
    forPerson: 'carlos',
    category: 'proteic',
    ingredients: [
      { name: 'Merenguitos Snack Well', quantity: 0.5, unit: 'paquete', section: 'dietetica' },
    ],
  },
  {
    id: 'dc4',
    name: 'Postre Malabra Egg Protein',
    shortName: 'Malabra',
    emoji: '🍫',
    forPerson: 'carlos',
    category: 'proteic',
    ingredients: [
      { name: 'Postre Malabra Egg Protein', quantity: 1, unit: 'u', section: 'dietetica' },
    ],
  },
  {
    id: 'dc5',
    name: 'Barrita low carb / low sugar',
    shortName: 'Barrita',
    emoji: '🍫',
    forPerson: 'carlos',
    category: 'proteic',
    ingredients: [
      { name: 'Barrita low carb', quantity: 1, unit: 'u', section: 'dietetica' },
    ],
  },
  {
    id: 'dc6',
    name: 'Helado Frosz proteico',
    shortName: 'Helado Frosz',
    emoji: '🍦',
    forPerson: 'carlos',
    category: 'proteic',
    ingredients: [
      { name: 'Helado Frosz proteico', quantity: 1, unit: 'u', section: 'congelados' },
    ],
  },
];
