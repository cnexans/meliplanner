'use client';
import { useState, useCallback } from 'react';
import { upperBodyExercises, lowerBodyExercises, allExercises } from '@/data/exercises';
import { PERSON_DEFAULTS } from '@/data/constants';
import { ExerciseCategory, ExerciseSelection, TrainingDay, CardioConfig, ExercisePlan } from '@/types';
import { generateId, saveCurrentExercise, savePlan } from '@/lib/storage';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { exportMultiplePagesPdf } from '@/lib/pdfExport';

function defaultCardio(person: 'carlos' | 'johana'): CardioConfig {
  const p = PERSON_DEFAULTS[person];
  return { type: p.cardio.type, duration: p.cardio.duration, incline: p.cardio.incline, speed: p.cardio.speed };
}

function defaultTrainingDays(count: number): TrainingDay[] {
  const days: TrainingDay[] = [];
  // Carlos: 2 upper + 1 lower; Johana: 2 lower + 1 upper
  const carlosPattern: ExerciseCategory[] = ['upper', 'upper', 'lower', 'upper', 'upper', 'lower'];
  const johanaPattern: ExerciseCategory[] = ['lower', 'lower', 'upper', 'lower', 'lower', 'upper'];

  for (let i = 0; i < count; i++) {
    days.push({
      dayNumber: i + 1,
      categoryCarlos: carlosPattern[i % carlosPattern.length],
      categoryJohana: johanaPattern[i % johanaPattern.length],
      carlosExercises: [],
      johanaExercises: [],
      carlosCardio: defaultCardio('carlos'),
      johanaCardio: defaultCardio('johana'),
    });
  }
  return days;
}

export default function EntrenamientoPage() {
  const [weeks, setWeeks] = useState(1);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [trainingDays, setTrainingDays] = useLocalStorage<TrainingDay[]>('plannutri_exercise_days', defaultTrainingDays(3));
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleDaysChange = useCallback((count: number) => {
    setDaysPerWeek(count);
    setTrainingDays(prev => {
      if (count > prev.length) {
        const extra = defaultTrainingDays(count).slice(prev.length);
        return [...prev, ...extra];
      }
      return prev.slice(0, count);
    });
  }, [setTrainingDays]);

  function toggleExercise(dayIdx: number, person: 'carlos' | 'johana', exerciseId: string) {
    setTrainingDays(prev => {
      const updated = [...prev];
      const day = { ...updated[dayIdx] };
      const key = person === 'carlos' ? 'carlosExercises' : 'johanaExercises';
      const exercises = [...day[key]];
      const idx = exercises.findIndex(e => e.exerciseId === exerciseId);

      if (idx >= 0) {
        exercises.splice(idx, 1);
      } else {
        exercises.push({ exerciseId, sets: 4, reps: 10 });
      }

      day[key] = exercises;
      updated[dayIdx] = day;
      return updated;
    });
  }

  function updateCategory(dayIdx: number, person: 'carlos' | 'johana', category: ExerciseCategory) {
    setTrainingDays(prev => {
      const updated = [...prev];
      const day = { ...updated[dayIdx] };
      if (person === 'carlos') day.categoryCarlos = category;
      else day.categoryJohana = category;
      // Clear exercises when category changes
      const key = person === 'carlos' ? 'carlosExercises' : 'johanaExercises';
      day[key] = [];
      updated[dayIdx] = day;
      return updated;
    });
  }

  function updateCardio(dayIdx: number, person: 'carlos' | 'johana', field: keyof CardioConfig, value: string | number) {
    setTrainingDays(prev => {
      const updated = [...prev];
      const day = { ...updated[dayIdx] };
      const key = person === 'carlos' ? 'carlosCardio' : 'johanaCardio';
      day[key] = { ...day[key], [field]: value };
      updated[dayIdx] = day;
      return updated;
    });
  }

  function handleSave() {
    const plan: ExercisePlan = {
      id: generateId(),
      name: `Entrenamiento ${new Date().toLocaleDateString('es-AR')}`,
      createdAt: new Date().toISOString(),
      weeks,
      daysPerWeek,
      trainingDays,
    };
    saveCurrentExercise(plan);
    savePlan({
      id: plan.id,
      name: plan.name,
      type: 'exercise',
      createdAt: plan.createdAt,
      weeks,
      data: plan,
    });
  }

  function copyPlan() {
    const lines: string[] = [];
    for (let w = 0; w < weeks; w++) {
      if (weeks > 1) lines.push(`**Semana ${w + 1}**`);
      for (const day of trainingDays) {
        lines.push(`Dia ${day.dayNumber}`);
        const cExercises = day.carlosExercises.map(e => {
          const ex = allExercises.find(x => x.id === e.exerciseId);
          return ex ? ex.name : '';
        }).filter(Boolean);
        const cCardio = day.carlosCardio.type !== 'ninguno' ? ` + ${day.carlosCardio.duration}min ${day.carlosCardio.type}` : '';
        lines.push(`Carlos: ${cExercises.join(', ')}${cCardio}`);

        const jExercises = day.johanaExercises.map(e => {
          const ex = allExercises.find(x => x.id === e.exerciseId);
          return ex ? ex.name : '';
        }).filter(Boolean);
        const jCardio = day.johanaCardio.type !== 'ninguno' ? ` + ${day.johanaCardio.duration}min ${day.johanaCardio.type}` : '';
        lines.push(`Johana: ${jExercises.join(', ')}${jCardio}`);
        lines.push('');
      }
    }
    navigator.clipboard.writeText(lines.join('\n').trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">Plan de Entrenamiento</h1>
        <div className="flex gap-2">
          <button
            onClick={copyPlan}
            className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors ${
              copied ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            {copied ? '✓ Copiado' : '📋 Copiar'}
          </button>
          <button
            onClick={async () => {
              setExporting(true);
              try {
                await exportMultiplePagesPdf(['exercise-plan-content'], `entrenamiento.pdf`, 'portrait');
              } catch (e) {
                alert('Error al exportar PDF: ' + (e instanceof Error ? e.message : 'Error desconocido'));
              } finally {
                setExporting(false);
              }
            }}
            disabled={exporting}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            {exporting ? '⏳ Exportando...' : '📄 PDF'}
          </button>
        </div>
      </div>

      {/* Config */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Período:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(w => (
              <button key={w} onClick={() => setWeeks(w)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${weeks === w ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              >{w} sem</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Días/semana:</span>
          <div className="flex gap-1">
            {[2, 3, 4, 5, 6].map(d => (
              <button key={d} onClick={() => handleDaysChange(d)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${daysPerWeek === d ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              >{d}</button>
            ))}
          </div>
        </div>
      </div>

      <div id="exercise-plan-content" className="space-y-4">
        {trainingDays.map((day, dIdx) => (
          <div key={dIdx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Día {day.dayNumber}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Carlos */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-blue-600">Carlos</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => updateCategory(dIdx, 'carlos', 'upper')}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${day.categoryCarlos === 'upper' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}
                    >Tren Superior</button>
                    <button
                      onClick={() => updateCategory(dIdx, 'carlos', 'lower')}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${day.categoryCarlos === 'lower' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}
                    >Tren Inferior</button>
                  </div>
                </div>

                <div className="space-y-1">
                  {(day.categoryCarlos === 'upper' ? upperBodyExercises : lowerBodyExercises).map(ex => {
                    const selected = day.carlosExercises.some(e => e.exerciseId === ex.id);
                    return (
                      <button
                        key={ex.id}
                        onClick={() => toggleExercise(dIdx, 'carlos', ex.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                          selected ? 'bg-blue-50 text-blue-800 font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                          selected ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'
                        }`}>{selected && '✓'}</span>
                        <span>{ex.emoji} {ex.name}</span>
                        <span className="text-[10px] text-gray-400 ml-auto">{ex.muscleGroup}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Cardio */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-2">🏃 Cardio</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={day.carlosCardio.type}
                      onChange={e => updateCardio(dIdx, 'carlos', 'type', e.target.value)}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1"
                    >
                      <option value="cinta">Cinta</option>
                      <option value="escaleras">Escaleras</option>
                      <option value="ninguno">Ninguno</option>
                    </select>
                    {day.carlosCardio.type !== 'ninguno' && (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={day.carlosCardio.duration}
                          onChange={e => updateCardio(dIdx, 'carlos', 'duration', parseInt(e.target.value) || 0)}
                          className="w-12 text-xs border border-gray-200 rounded-lg px-2 py-1 text-center"
                        />
                        <span className="text-xs text-gray-500">min</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Johana */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-pink-600">Johana</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => updateCategory(dIdx, 'johana', 'upper')}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${day.categoryJohana === 'upper' ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-500'}`}
                    >Tren Superior</button>
                    <button
                      onClick={() => updateCategory(dIdx, 'johana', 'lower')}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${day.categoryJohana === 'lower' ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-500'}`}
                    >Tren Inferior</button>
                  </div>
                </div>

                <div className="space-y-1">
                  {(day.categoryJohana === 'upper' ? upperBodyExercises : lowerBodyExercises).map(ex => {
                    const selected = day.johanaExercises.some(e => e.exerciseId === ex.id);
                    return (
                      <button
                        key={ex.id}
                        onClick={() => toggleExercise(dIdx, 'johana', ex.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                          selected ? 'bg-pink-50 text-pink-800 font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                          selected ? 'border-pink-500 bg-pink-500 text-white' : 'border-gray-300'
                        }`}>{selected && '✓'}</span>
                        <span>{ex.emoji} {ex.name}</span>
                        <span className="text-[10px] text-gray-400 ml-auto">{ex.muscleGroup}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Cardio */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-2">🏃 Cardio</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={day.johanaCardio.type}
                      onChange={e => updateCardio(dIdx, 'johana', 'type', e.target.value)}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1"
                    >
                      <option value="cinta">Cinta</option>
                      <option value="escaleras">Escaleras</option>
                      <option value="ninguno">Ninguno</option>
                    </select>
                    {day.johanaCardio.type !== 'ninguno' && (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={day.johanaCardio.duration}
                          onChange={e => updateCardio(dIdx, 'johana', 'duration', parseInt(e.target.value) || 0)}
                          className="w-12 text-xs border border-gray-200 rounded-lg px-2 py-1 text-center"
                        />
                        <span className="text-xs text-gray-500">min</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save button */}
      <div className="sticky bottom-20 mt-6 z-10">
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-xl font-semibold text-white shadow-lg bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all"
        >
          💾 Guardar Plan de Entrenamiento
        </button>
      </div>
    </div>
  );
}
