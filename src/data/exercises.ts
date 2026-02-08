import { Exercise } from '@/types';

export const upperBodyExercises: Exercise[] = [
  // Pecho
  { id: 'e1', name: 'Press plano', emoji: '🏋️', category: 'upper', muscleGroup: 'Pecho', equipment: ['Barra', 'Mancuerna', 'Máquina'] },
  { id: 'e2', name: 'Peck deck / Mariposa', emoji: '🦋', category: 'upper', muscleGroup: 'Pecho', equipment: ['Máquina'] },
  { id: 'e19', name: 'Press inclinado', emoji: '🏋️', category: 'upper', muscleGroup: 'Pecho', equipment: ['Barra', 'Mancuerna', 'Smith'] },
  { id: 'e20', name: 'Cruces en polea', emoji: '🦋', category: 'upper', muscleGroup: 'Pecho', equipment: ['Polea'] },
  // Hombros
  { id: 'e3', name: 'Press hombro', emoji: '💪', category: 'upper', muscleGroup: 'Hombros', equipment: ['Máquina', 'Mancuerna', 'Barra'] },
  { id: 'e4', name: 'Vuelo lateral', emoji: '🦅', category: 'upper', muscleGroup: 'Hombros', equipment: ['Mancuerna', 'Cable'] },
  { id: 'e5', name: 'Vuelo posterior', emoji: '🔙', category: 'upper', muscleGroup: 'Hombros', equipment: ['Mancuerna', 'Cable'] },
  { id: 'e21', name: 'Elevación frontal', emoji: '🦅', category: 'upper', muscleGroup: 'Hombros', equipment: ['Mancuerna', 'Barra', 'Polea'] },
  // Espalda
  { id: 'e6', name: 'Dorsalera / Pullover', emoji: '🏋️', category: 'upper', muscleGroup: 'Espalda', equipment: ['Máquina', 'Mancuerna'] },
  { id: 'e7', name: 'Remo', emoji: '🚣', category: 'upper', muscleGroup: 'Espalda', equipment: ['Máquina', 'Mancuerna'] },
  { id: 'e22', name: 'Jalón al pecho', emoji: '🏋️', category: 'upper', muscleGroup: 'Espalda', equipment: ['Polea', 'Máquina'] },
  { id: 'e23', name: 'Remo con barra', emoji: '🚣', category: 'upper', muscleGroup: 'Espalda', equipment: ['Barra'] },
  { id: 'e24', name: 'Face pull', emoji: '🔙', category: 'upper', muscleGroup: 'Espalda', equipment: ['Polea'] },
  // Tríceps
  { id: 'e8', name: 'Tríceps con polea', emoji: '💪', category: 'upper', muscleGroup: 'Tríceps', equipment: ['Polea'] },
  { id: 'e25', name: 'Press francés', emoji: '💪', category: 'upper', muscleGroup: 'Tríceps', equipment: ['Barra', 'Mancuerna'] },
  { id: 'e26', name: 'Patada de tríceps', emoji: '💪', category: 'upper', muscleGroup: 'Tríceps', equipment: ['Mancuerna', 'Polea'] },
  // Bíceps
  { id: 'e9', name: 'Curl con mancuerna', emoji: '💪', category: 'upper', muscleGroup: 'Bíceps', equipment: ['Mancuerna'] },
  { id: 'e27', name: 'Curl con barra', emoji: '💪', category: 'upper', muscleGroup: 'Bíceps', equipment: ['Barra', 'Barra Z'] },
  { id: 'e28', name: 'Curl martillo', emoji: '🔨', category: 'upper', muscleGroup: 'Bíceps', equipment: ['Mancuerna'] },
  { id: 'e29', name: 'Curl en banco Scott', emoji: '💪', category: 'upper', muscleGroup: 'Bíceps', equipment: ['Barra', 'Mancuerna', 'Máquina'] },
  { id: 'e30', name: 'Curl con polea', emoji: '💪', category: 'upper', muscleGroup: 'Bíceps', equipment: ['Polea'] },
  { id: 'e31', name: 'Curl concentrado', emoji: '💪', category: 'upper', muscleGroup: 'Bíceps', equipment: ['Mancuerna'] },
  // Abdominales
  { id: 'e32', name: 'Crunch en máquina', emoji: '🔥', category: 'upper', muscleGroup: 'Abdominales', equipment: ['Máquina'] },
  { id: 'e33', name: 'Crunch en polea', emoji: '🔥', category: 'upper', muscleGroup: 'Abdominales', equipment: ['Polea'] },
  { id: 'e34', name: 'Plancha', emoji: '🔥', category: 'upper', muscleGroup: 'Abdominales', equipment: ['Peso corporal'] },
  { id: 'e35', name: 'Elevación de piernas colgado', emoji: '🔥', category: 'upper', muscleGroup: 'Abdominales', equipment: ['Barra fija'] },
  { id: 'e36', name: 'Rueda abdominal', emoji: '🔥', category: 'upper', muscleGroup: 'Abdominales', equipment: ['Rueda ab'] },
  { id: 'e37', name: 'Crunch bicicleta', emoji: '🔥', category: 'upper', muscleGroup: 'Abdominales', equipment: ['Peso corporal'] },
  { id: 'e38', name: 'Leñador en polea', emoji: '🔥', category: 'upper', muscleGroup: 'Abdominales', equipment: ['Polea'] },
];

export const lowerBodyExercises: Exercise[] = [
  // Cuádriceps
  { id: 'e10', name: 'Extensión de cuádriceps', emoji: '🦵', category: 'lower', muscleGroup: 'Cuádriceps', equipment: ['Máquina'] },
  { id: 'e11', name: 'Sentadilla libre / Smith', emoji: '🏋️', category: 'lower', muscleGroup: 'Cuádriceps', equipment: ['Barra', 'Smith'] },
  { id: 'e12', name: 'Prensa', emoji: '🦿', category: 'lower', muscleGroup: 'Cuádriceps', equipment: ['Máquina'] },
  { id: 'e39', name: 'Zancada / Estocada', emoji: '🦵', category: 'lower', muscleGroup: 'Cuádriceps', equipment: ['Mancuerna', 'Barra', 'Smith'] },
  { id: 'e40', name: 'Sentadilla búlgara', emoji: '🦵', category: 'lower', muscleGroup: 'Cuádriceps', equipment: ['Mancuerna', 'Smith'] },
  { id: 'e41', name: 'Sentadilla hack', emoji: '🏋️', category: 'lower', muscleGroup: 'Cuádriceps', equipment: ['Máquina'] },
  // Aductores
  { id: 'e13', name: 'Aductores', emoji: '🦵', category: 'lower', muscleGroup: 'Aductores', equipment: ['Máquina'] },
  // Isquiotibiales
  { id: 'e14', name: 'Curl femoral acostado', emoji: '🦵', category: 'lower', muscleGroup: 'Isquios', equipment: ['Máquina'] },
  { id: 'e15', name: 'Peso muerto rumano', emoji: '🏋️', category: 'lower', muscleGroup: 'Isquios', equipment: ['Barra', 'Mancuerna'] },
  { id: 'e42', name: 'Curl femoral sentado', emoji: '🦵', category: 'lower', muscleGroup: 'Isquios', equipment: ['Máquina'] },
  { id: 'e43', name: 'Buenos días (good morning)', emoji: '🏋️', category: 'lower', muscleGroup: 'Isquios', equipment: ['Barra'] },
  // Glúteos
  { id: 'e16', name: 'Hip thrust', emoji: '🍑', category: 'lower', muscleGroup: 'Glúteos', equipment: ['Barra', 'Máquina'] },
  { id: 'e18', name: 'Patada de glúteos', emoji: '🍑', category: 'lower', muscleGroup: 'Glúteos', equipment: ['Máquina', 'Polea'] },
  { id: 'e44', name: 'Puente de glúteos', emoji: '🍑', category: 'lower', muscleGroup: 'Glúteos', equipment: ['Peso corporal', 'Barra'] },
  // Abductores
  { id: 'e17', name: 'Abductores', emoji: '🦵', category: 'lower', muscleGroup: 'Abductores', equipment: ['Máquina'] },
  // Gemelos
  { id: 'e45', name: 'Elevación de gemelos de pie', emoji: '🦶', category: 'lower', muscleGroup: 'Gemelos', equipment: ['Máquina', 'Smith'] },
  { id: 'e46', name: 'Elevación de gemelos sentado', emoji: '🦶', category: 'lower', muscleGroup: 'Gemelos', equipment: ['Máquina'] },
];

export const allExercises = [...upperBodyExercises, ...lowerBodyExercises];
