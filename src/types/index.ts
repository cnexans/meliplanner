export type Person = 'carlos' | 'johana' | 'both';

export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner' | 'dessert';

export type StoreSection =
  | 'carniceria'
  | 'pescaderia'
  | 'verduleria'
  | 'lacteos'
  | 'almacen'
  | 'dietetica'
  | 'congelados'
  | 'panaderia_keto';

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  section: StoreSection;
  scaleWithPortion?: boolean;
}

export interface PersonVariant {
  ingredients: Ingredient[];
  notes?: string;
}

export interface Meal {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
  mealTypes: MealType[];
  forPerson: Person;
  carlos?: PersonVariant;
  johana?: PersonVariant;
  ingredients: Ingredient[];
  tags?: string[];
}

export interface ProteinOption {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
  forPerson: Person;
  portionCarlos: string;
  portionJohana: string;
  category: 'regular' | 'semi-fatty';
  maxPerWeekCarlos?: number;
  maxPerWeekJohana?: number;
  ingredients: Ingredient[];
  carlosIngredients?: Ingredient[];
  johanaIngredients?: Ingredient[];
}

export interface VegetableOption {
  id: string;
  name: string;
  emoji: string;
  category: 'free' | 'limited';
  maxGrams?: number;
  ingredients: Ingredient[];
}

export interface SideOption {
  id: string;
  name: string;
  emoji: string;
  ingredients: Ingredient[];
}

export interface CarbOption {
  id: string;
  name: string;
  emoji: string;
  maxPerWeek?: number;
  ingredients: Ingredient[];
}

export interface SnackOption {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
  forPerson: Person;
  category: 'proteic' | 'with-carbs';
  ingredients: Ingredient[];
}

// Selections
export interface MealSelection {
  mealId: string;
  countCarlos: number;
  countJohana: number;
  vegetableIds?: string[];
  carbId?: string;
}

export interface MealTypeSelection {
  mealType: MealType;
  selections: MealSelection[];
}

// Generated Menu
export interface DayMeals {
  breakfast: string | null;
  lunch: string | null;
  lunchVegetables?: string[];
  lunchSide?: string;
  snack: string | null;
  dinner: string | null;
  dinnerVegetables?: string[];
  dinnerSide?: string;
  dinnerCarb?: string;
  dessert?: string | null;
}

export interface DayMenu {
  dayIndex: number;
  dayName: string;
  carlos: DayMeals;
  johana: DayMeals;
}

export interface WeekMenu {
  weekNumber: number;
  days: DayMenu[];
}

export interface SavedPlan {
  id: string;
  name: string;
  type: 'meal' | 'exercise';
  createdAt: string;
  weeks: number;
  data: unknown;
}

export interface GeneratedMenuPlan {
  id: string;
  name: string;
  createdAt: string;
  weeks: number;
  weekMenus: WeekMenu[];
  selections: MealTypeSelection[];
}

// Shopping List
export interface ShoppingItem {
  name: string;
  quantity: number;
  unit: string;
}

export interface ShoppingSection {
  section: StoreSection;
  sectionName: string;
  items: ShoppingItem[];
}

// Exercise
export type ExerciseCategory = 'upper' | 'lower';

export interface Exercise {
  id: string;
  name: string;
  emoji: string;
  category: ExerciseCategory;
  muscleGroup: string;
  equipment: string[];
}

export interface ExerciseSelection {
  exerciseId: string;
  sets: number;
  reps: number;
}

export interface CardioConfig {
  type: 'cinta' | 'escaleras' | 'ninguno';
  duration: number;
  incline?: string;
  speed?: string;
}

export interface TrainingDay {
  dayNumber: number;
  categoryCarlos: ExerciseCategory;
  categoryJohana: ExerciseCategory;
  carlosExercises: ExerciseSelection[];
  johanaExercises: ExerciseSelection[];
  carlosCardio: CardioConfig;
  johanaCardio: CardioConfig;
}

export interface ExercisePlan {
  id: string;
  name: string;
  createdAt: string;
  weeks: number;
  daysPerWeek: number;
  trainingDays: TrainingDay[];
}
