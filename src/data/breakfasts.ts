import { Meal } from '@/types';

export const breakfasts: Meal[] = [
  {
    id: 'b1',
    name: 'Omelette de pavita y queso',
    shortName: 'Omelette pavita',
    emoji: '🍳',
    mealTypes: ['breakfast'],
    forPerson: 'both',
    ingredients: [
      { name: 'Huevo', quantity: 1, unit: 'u', section: 'lacteos' },
      { name: 'Claras de huevo (Eggcellence o maple)', quantity: 2, unit: 'u', section: 'lacteos' },
      { name: 'Tregar blanco light', quantity: 2, unit: 'cdas', section: 'lacteos' },
      { name: 'Pavita en fetas', quantity: 2, unit: 'fetas', section: 'carniceria' },
    ],
    carlos: {
      ingredients: [
        { name: 'Port Salut light (Tregar o Serenísima)', quantity: 30, unit: 'g', section: 'lacteos' },
      ],
    },
  },
  {
    id: 'b2',
    name: 'Claras con pavita y palta',
    shortName: 'Claras + palta',
    emoji: '🥑',
    mealTypes: ['breakfast'],
    forPerson: 'johana',
    ingredients: [
      { name: 'Claras de huevo (Eggcellence o maple)', quantity: 4, unit: 'u', section: 'lacteos' },
      { name: 'Tregar blanco light', quantity: 2, unit: 'cdas', section: 'lacteos' },
      { name: 'Pavita en fetas', quantity: 2, unit: 'fetas', section: 'carniceria' },
      { name: 'Palta hass', quantity: 0.25, unit: 'u', section: 'verduleria' },
    ],
  },
  {
    id: 'b3',
    name: 'Claras con jamón, queso y Tregar',
    shortName: 'Claras + jamón',
    emoji: '🧀',
    mealTypes: ['breakfast'],
    forPerson: 'johana',
    ingredients: [
      { name: 'Claras de huevo (Eggcellence o maple)', quantity: 2, unit: 'u', section: 'lacteos' },
      { name: 'Jamón o pavita en fetas', quantity: 2, unit: 'fetas', section: 'carniceria' },
      { name: 'Tregar blanco light', quantity: 2, unit: 'cdas', section: 'lacteos' },
      { name: 'Port Salut light (Tregar o Serenísima)', quantity: 30, unit: 'g', section: 'lacteos' },
    ],
  },
  {
    id: 'b4',
    name: 'Iced Protein Coffee to go',
    shortName: 'Protein Coffee',
    emoji: '☕',
    mealTypes: ['breakfast'],
    forPerson: 'johana',
    ingredients: [
      { name: 'Leche de almendras sin azúcar', quantity: 0.5, unit: 'taza', section: 'almacen' },
      { name: 'Whey protein', quantity: 1, unit: 'scoop', section: 'dietetica' },
    ],
  },
  {
    id: 'b5',
    name: 'Iced protein coffee + barrita low carb',
    shortName: 'Coffee + barrita',
    emoji: '🍫',
    mealTypes: ['breakfast'],
    forPerson: 'johana',
    ingredients: [
      { name: 'Whey protein', quantity: 0.5, unit: 'scoop', section: 'dietetica' },
      { name: 'Barrita low carb', quantity: 1, unit: 'u', section: 'dietetica' },
    ],
  },
  {
    id: 'b6',
    name: 'Yogurt Kay con whey y semillas',
    shortName: 'Yogurt + whey',
    emoji: '🥣',
    mealTypes: ['breakfast'],
    forPerson: 'both',
    ingredients: [
      { name: 'Yogurt Kay griego', quantity: 100, unit: 'g', section: 'lacteos' },
      { name: 'Mix de semillas', quantity: 2, unit: 'cdas', section: 'dietetica' },
      { name: 'Mantequilla de maní 100% (ByourFood/Kefit/SnackEat)', quantity: 1, unit: 'cdita', section: 'dietetica' },
    ],
    carlos: {
      ingredients: [
        { name: 'Whey protein', quantity: 1, unit: 'scoop', section: 'dietetica' },
      ],
    },
    johana: {
      ingredients: [
        { name: 'Whey protein', quantity: 0.75, unit: 'scoop', section: 'dietetica' },
      ],
    },
  },
  {
    id: 'b7',
    name: 'Pancakes proteicos',
    shortName: 'Pancakes',
    emoji: '🥞',
    mealTypes: ['breakfast'],
    forPerson: 'both',
    ingredients: [
      { name: 'Huevo', quantity: 1, unit: 'u', section: 'lacteos' },
      { name: 'Whey protein', quantity: 0.5, unit: 'scoop', section: 'dietetica' },
    ],
    carlos: {
      ingredients: [
        { name: 'Claras de huevo (Eggcellence o maple)', quantity: 2, unit: 'u', section: 'lacteos' },
        { name: 'Tregar blanco light', quantity: 2, unit: 'cdas', section: 'lacteos' },
      ],
    },
    johana: {
      ingredients: [
        { name: 'Claras de huevo (Eggcellence o maple)', quantity: 1, unit: 'u', section: 'lacteos' },
        { name: 'Tregar blanco light', quantity: 1, unit: 'cdas', section: 'lacteos' },
      ],
    },
  },
  {
    id: 'b8',
    name: 'Pan nube casero relleno',
    shortName: 'Pan nube',
    emoji: '🍞',
    mealTypes: ['breakfast'],
    forPerson: 'both',
    ingredients: [
      { name: 'Huevo', quantity: 1, unit: 'u', section: 'lacteos' },
      { name: 'Claras de huevo (Eggcellence o maple)', quantity: 2, unit: 'u', section: 'lacteos' },
      { name: 'Tregar blanco light', quantity: 2, unit: 'cdas', section: 'lacteos' },
      { name: 'Pavita en fetas', quantity: 2, unit: 'fetas', section: 'carniceria' },
      { name: 'Champiñones', quantity: 50, unit: 'g', section: 'verduleria' },
      { name: 'Espinaca', quantity: 30, unit: 'g', section: 'verduleria' },
    ],
    carlos: {
      ingredients: [
        { name: 'Tregar blanco light', quantity: 2, unit: 'cdas', section: 'lacteos' },
      ],
    },
  },
  {
    id: 'b9',
    name: 'Bolillo keto meli con pavita',
    shortName: 'Bolillo keto',
    emoji: '🥖',
    mealTypes: ['breakfast'],
    forPerson: 'both',
    ingredients: [
      { name: 'Bolillo keto meli', quantity: 1, unit: 'u', section: 'panaderia_keto' },
      { name: 'Tregar blanco light', quantity: 1, unit: 'cdas', section: 'lacteos' },
      { name: 'Pavita en fetas', quantity: 2, unit: 'fetas', section: 'carniceria' },
      { name: 'Claras de huevo (Eggcellence o maple)', quantity: 2, unit: 'u', section: 'lacteos' },
    ],
    carlos: {
      ingredients: [
        { name: 'Huevo', quantity: 1, unit: 'u', section: 'lacteos' },
      ],
    },
  },
  {
    id: 'b10',
    name: 'Pan lactal keto con claras y vegetales',
    shortName: 'Pan keto + veg',
    emoji: '🥪',
    mealTypes: ['breakfast'],
    forPerson: 'both',
    ingredients: [
      { name: 'Pan lactal keto meli', quantity: 1, unit: 'rebanada', section: 'panaderia_keto' },
      { name: 'Claras de huevo (Eggcellence o maple)', quantity: 2, unit: 'u', section: 'lacteos' },
      { name: 'Espinaca', quantity: 30, unit: 'g', section: 'verduleria' },
      { name: 'Champiñones', quantity: 50, unit: 'g', section: 'verduleria' },
      { name: 'Pavita en fetas', quantity: 2, unit: 'fetas', section: 'carniceria' },
    ],
    carlos: {
      ingredients: [
        { name: 'Huevo', quantity: 1, unit: 'u', section: 'lacteos' },
        { name: 'Cream cheese', quantity: 30, unit: 'g', section: 'lacteos' },
      ],
    },
    johana: {
      ingredients: [
        { name: 'Port Salut light (Tregar o Serenísima)', quantity: 30, unit: 'g', section: 'lacteos' },
      ],
    },
  },
  {
    id: 'b11',
    name: 'Pan lactal keto con claras y Tregar',
    shortName: 'Pan keto + Tregar',
    emoji: '🍞',
    mealTypes: ['breakfast'],
    forPerson: 'johana',
    ingredients: [
      { name: 'Pan lactal keto meli', quantity: 1, unit: 'rebanada', section: 'panaderia_keto' },
      { name: 'Claras de huevo (Eggcellence o maple)', quantity: 4, unit: 'u', section: 'lacteos' },
      { name: 'Tregar blanco light', quantity: 2, unit: 'cdas', section: 'lacteos' },
    ],
  },
  {
    id: 'bc5',
    name: 'Pan lactal keto con huevo, jamón y cream cheese',
    shortName: 'Pan keto + jamón',
    emoji: '🥪',
    mealTypes: ['breakfast'],
    forPerson: 'carlos',
    ingredients: [
      { name: 'Pan lactal keto meli', quantity: 1, unit: 'rebanada', section: 'panaderia_keto' },
      { name: 'Huevo', quantity: 1, unit: 'u', section: 'lacteos' },
      { name: 'Claras de huevo (Eggcellence o maple)', quantity: 2, unit: 'u', section: 'lacteos' },
      { name: 'Jamón o pavita en fetas', quantity: 2, unit: 'fetas', section: 'carniceria' },
      { name: 'Cream cheese', quantity: 30, unit: 'g', section: 'lacteos' },
    ],
  },
];
