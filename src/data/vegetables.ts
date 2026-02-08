import { VegetableOption, SideOption } from '@/types';

export const vegetables: VegetableOption[] = [
  // Free vegetables
  { id: 'v1', name: 'Lechuga', emoji: '🥬', category: 'free', ingredients: [{ name: 'Lechuga', quantity: 100, unit: 'g', section: 'verduleria' }] },
  { id: 'v2', name: 'Espinaca', emoji: '🥬', category: 'free', ingredients: [{ name: 'Espinaca', quantity: 100, unit: 'g', section: 'verduleria' }] },
  { id: 'v3', name: 'Acelga', emoji: '🥬', category: 'free', ingredients: [{ name: 'Acelga', quantity: 100, unit: 'g', section: 'verduleria' }] },
  { id: 'v4', name: 'Rúcula', emoji: '🥗', category: 'free', ingredients: [{ name: 'Rúcula', quantity: 50, unit: 'g', section: 'verduleria' }] },
  { id: 'v5', name: 'Berro', emoji: '🌿', category: 'free', ingredients: [{ name: 'Berro', quantity: 50, unit: 'g', section: 'verduleria' }] },
  { id: 'v6', name: 'Pepino', emoji: '🥒', category: 'free', ingredients: [{ name: 'Pepino', quantity: 1, unit: 'u', section: 'verduleria' }] },
  { id: 'v7', name: 'Apio', emoji: '🥬', category: 'free', ingredients: [{ name: 'Apio', quantity: 100, unit: 'g', section: 'verduleria' }] },
  { id: 'v8', name: 'Repollo', emoji: '🥬', category: 'free', ingredients: [{ name: 'Repollo', quantity: 100, unit: 'g', section: 'verduleria' }] },
  { id: 'v9', name: 'Calabacín', emoji: '🥒', category: 'free', ingredients: [{ name: 'Calabacín', quantity: 1, unit: 'u', section: 'verduleria' }] },
  { id: 'v10', name: 'Berenjena', emoji: '🍆', category: 'free', ingredients: [{ name: 'Berenjena', quantity: 1, unit: 'u', section: 'verduleria' }] },
  { id: 'v11', name: 'Palmitos', emoji: '🌴', category: 'free', ingredients: [{ name: 'Palmitos', quantity: 1, unit: 'lata', section: 'almacen' }] },
  { id: 'v12', name: 'Chucrut', emoji: '🥬', category: 'free', ingredients: [{ name: 'Chucrut', quantity: 100, unit: 'g', section: 'almacen' }] },
  // Limited vegetables
  { id: 'v13', name: 'Tomate', emoji: '🍅', category: 'limited', maxGrams: 150, ingredients: [{ name: 'Tomate', quantity: 150, unit: 'g', section: 'verduleria' }] },
  { id: 'v14', name: 'Zanahoria', emoji: '🥕', category: 'limited', maxGrams: 65, ingredients: [{ name: 'Zanahoria', quantity: 65, unit: 'g', section: 'verduleria' }] },
  { id: 'v15', name: 'Remolacha cocida', emoji: '🟣', category: 'limited', maxGrams: 60, ingredients: [{ name: 'Remolacha', quantity: 60, unit: 'g', section: 'verduleria' }] },
  { id: 'v16', name: 'Champiñones', emoji: '🍄', category: 'limited', maxGrams: 160, ingredients: [{ name: 'Champiñones', quantity: 160, unit: 'g', section: 'verduleria' }] },
  { id: 'v17', name: 'Morrón', emoji: '🫑', category: 'limited', maxGrams: 110, ingredients: [{ name: 'Morrón', quantity: 110, unit: 'g', section: 'verduleria' }] },
  { id: 'v18', name: 'Brócoli', emoji: '🥦', category: 'limited', maxGrams: 120, ingredients: [{ name: 'Brócoli', quantity: 120, unit: 'g', section: 'verduleria' }] },
  { id: 'v19', name: 'Coliflor', emoji: '🥦', category: 'limited', maxGrams: 160, ingredients: [{ name: 'Coliflor', quantity: 160, unit: 'g', section: 'verduleria' }] },
  { id: 'v20', name: 'Cebolla', emoji: '🧅', category: 'limited', maxGrams: 60, ingredients: [{ name: 'Cebolla', quantity: 60, unit: 'g', section: 'verduleria' }] },
];

export const sides: SideOption[] = [
  {
    id: 'side1',
    name: 'Puré de zanahoria',
    emoji: '🥕',
    ingredients: [
      { name: 'Zanahoria', quantity: 65, unit: 'g', section: 'verduleria' },
      { name: 'Tregar blanco light', quantity: 1, unit: 'cdas', section: 'lacteos' },
    ],
  },
  {
    id: 'side2',
    name: 'Puré de coliflor',
    emoji: '🥦',
    ingredients: [
      { name: 'Coliflor', quantity: 160, unit: 'g', section: 'verduleria' },
      { name: 'Tregar blanco light', quantity: 1, unit: 'cdas', section: 'lacteos' },
    ],
  },
  {
    id: 'side3',
    name: 'Puré de berenjena',
    emoji: '🍆',
    ingredients: [
      { name: 'Berenjena', quantity: 1, unit: 'u', section: 'verduleria' },
      { name: 'Cebolla', quantity: 30, unit: 'g', section: 'verduleria' },
    ],
  },
  {
    id: 'side4',
    name: 'Tomates al air fryer',
    emoji: '🍅',
    ingredients: [
      { name: 'Tomate', quantity: 150, unit: 'g', section: 'verduleria' },
    ],
  },
  {
    id: 'side5',
    name: 'Espinaca con champiñones y Tregar',
    emoji: '🍄',
    ingredients: [
      { name: 'Espinaca', quantity: 100, unit: 'g', section: 'verduleria' },
      { name: 'Champiñones', quantity: 160, unit: 'g', section: 'verduleria' },
      { name: 'Tregar blanco light', quantity: 2, unit: 'cdas', section: 'lacteos' },
    ],
  },
  {
    id: 'side6',
    name: 'Pasta konjac fit',
    emoji: '🍜',
    ingredients: [
      { name: 'Pasta konjac fit', quantity: 1, unit: 'paquete', section: 'dietetica' },
    ],
  },
];
