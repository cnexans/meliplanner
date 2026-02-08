import { Ingredient, StoreSection } from '@/types';

export interface Supplement {
  name: string;
  dosage: string;
  timing: string;
  forPerson: 'carlos' | 'johana' | 'both';
  ingredients: Ingredient[];
}

export const supplements: Supplement[] = [
  {
    name: 'ZMA',
    dosage: '2 cápsulas',
    timing: 'Antes de dormir',
    forPerson: 'both',
    ingredients: [
      { name: 'ZMA (suplemento)', quantity: 1, unit: 'frasco', section: 'dietetica' },
    ],
  },
  {
    name: 'Whey Protein',
    dosage: 'Según recetas del plan',
    timing: 'Desayunos, meriendas, postres',
    forPerson: 'both',
    ingredients: [
      { name: 'Whey Protein', quantity: 1, unit: 'pote', section: 'dietetica' },
    ],
  },
  {
    name: 'Creatina',
    dosage: '5g diarios',
    timing: 'A cualquier hora, no cortarla',
    forPerson: 'carlos',
    ingredients: [
      { name: 'Creatina monohidrato', quantity: 1, unit: 'pote', section: 'dietetica' },
    ],
  },
  {
    name: 'Cafeína anhidra',
    dosage: '200mg (1 cápsula)',
    timing: '30 min antes de entrenar',
    forPerson: 'both',
    ingredients: [
      { name: 'Cafeína anhidra 200mg', quantity: 1, unit: 'frasco', section: 'dietetica' },
    ],
  },
  {
    name: 'Stevia Premium Trever',
    dosage: 'A gusto',
    timing: 'Para endulzar bebidas y comidas',
    forPerson: 'both',
    ingredients: [
      { name: 'Stevia Premium Trever', quantity: 1, unit: 'paquete', section: 'dietetica' },
    ],
  },
];
