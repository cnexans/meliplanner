import { SavedPlan, GeneratedMenuPlan, ExercisePlan } from '@/types';

const SAVED_KEY = 'plannutri_saved';
const CURRENT_MENU_KEY = 'plannutri_current_menu';
const CURRENT_EXERCISE_KEY = 'plannutri_current_exercise';

export function getSavedPlans(): SavedPlan[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
  } catch { return []; }
}

export function savePlan(plan: SavedPlan) {
  const plans = getSavedPlans();
  const idx = plans.findIndex(p => p.id === plan.id);
  if (idx >= 0) plans[idx] = plan;
  else plans.push(plan);
  localStorage.setItem(SAVED_KEY, JSON.stringify(plans));
}

export function deletePlan(id: string) {
  const plans = getSavedPlans().filter(p => p.id !== id);
  localStorage.setItem(SAVED_KEY, JSON.stringify(plans));
}

export function saveCurrentMenu(menu: GeneratedMenuPlan) {
  localStorage.setItem(CURRENT_MENU_KEY, JSON.stringify(menu));
}

export function getCurrentMenu(): GeneratedMenuPlan | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(CURRENT_MENU_KEY);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

export function saveCurrentExercise(plan: ExercisePlan) {
  localStorage.setItem(CURRENT_EXERCISE_KEY, JSON.stringify(plan));
}

export function getCurrentExercise(): ExercisePlan | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(CURRENT_EXERCISE_KEY);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
