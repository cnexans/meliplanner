import { breakfasts } from '@/data/breakfasts';
import { proteins } from '@/data/proteins';
import { snacksJohana } from '@/data/snacks-johana';
import { snacksCarlos } from '@/data/snacks-carlos';
import { dessertsCarlos } from '@/data/desserts-carlos';
import { carbs } from '@/data/carbs';
import { vegetables, sides } from '@/data/vegetables';
import { Ingredient, Person } from '@/types';

const allMeals = [
  ...breakfasts.map(b => ({ id: b.id, name: b.shortName, emoji: b.emoji, forPerson: b.forPerson, ingredients: b.ingredients, carlos: b.carlos, johana: b.johana })),
  ...proteins.map(p => ({ id: p.id, name: p.shortName, emoji: p.emoji, forPerson: p.forPerson, ingredients: p.ingredients, carlosIngredients: p.carlosIngredients, johanaIngredients: p.johanaIngredients, portionCarlos: p.portionCarlos, portionJohana: p.portionJohana })),
  ...snacksJohana.map(s => ({ id: s.id, name: s.shortName, emoji: s.emoji, forPerson: s.forPerson, ingredients: s.ingredients })),
  ...snacksCarlos.map(s => ({ id: s.id, name: s.shortName, emoji: s.emoji, forPerson: s.forPerson, ingredients: s.ingredients })),
  ...dessertsCarlos.map(d => ({ id: d.id, name: d.shortName, emoji: d.emoji, forPerson: d.forPerson, ingredients: d.ingredients })),
];

export function lookupMeal(id: string | null): { name: string; emoji: string; forPerson: Person } | null {
  if (!id) return null;
  const found = allMeals.find(m => m.id === id);
  if (!found) return null;
  return { name: found.name, emoji: found.emoji, forPerson: found.forPerson as Person };
}

export function lookupVegetable(id: string): { name: string; emoji: string } | null {
  const v = [...vegetables, ...sides].find(x => x.id === id);
  return v ? { name: v.name, emoji: v.emoji } : null;
}

export function lookupCarb(id: string): { name: string; emoji: string } | null {
  const c = carbs.find(x => x.id === id);
  return c ? { name: c.name, emoji: c.emoji } : null;
}

export function lookupProtein(id: string) {
  return proteins.find(p => p.id === id) || null;
}

export function getIngredientsForMeal(mealId: string, person: 'carlos' | 'johana'): Ingredient[] {
  // Check breakfasts
  const bf = breakfasts.find(b => b.id === mealId);
  if (bf) {
    const base = [...bf.ingredients];
    const personExtra = person === 'carlos' ? bf.carlos?.ingredients : bf.johana?.ingredients;
    if (personExtra) base.push(...personExtra);
    return base;
  }

  // Check proteins
  const pr = proteins.find(p => p.id === mealId);
  if (pr) {
    if (person === 'carlos' && pr.carlosIngredients) return pr.carlosIngredients;
    if (person === 'johana' && pr.johanaIngredients) return pr.johanaIngredients;
    // Use base ingredients, adjust portion
    return pr.ingredients.map(ing => {
      if (ing.scaleWithPortion && person === 'johana' && pr.johanaIngredients) {
        const ji = pr.johanaIngredients.find(j => j.name === ing.name);
        if (ji) return ji;
      }
      return ing;
    });
  }

  // Check snacks
  const snack = [...snacksCarlos, ...snacksJohana, ...dessertsCarlos].find(s => s.id === mealId);
  if (snack) return snack.ingredients;

  return [];
}

export function getVegetableIngredients(vegId: string): Ingredient[] {
  const v = vegetables.find(x => x.id === vegId);
  if (v) return v.ingredients;
  const s = sides.find(x => x.id === vegId);
  if (s) return s.ingredients;
  return [];
}

export function getCarbIngredients(carbId: string): Ingredient[] {
  const c = carbs.find(x => x.id === carbId);
  return c ? c.ingredients : [];
}

export function getPortionNotes(mealId: string): string | null {
  const pr = proteins.find(p => p.id === mealId);
  if (!pr || pr.forPerson !== 'both') return null;
  if (pr.portionCarlos === pr.portionJohana) return null;
  return `${pr.shortName}: Carlos ${pr.portionCarlos}, Johana ${pr.portionJohana}`;
}
