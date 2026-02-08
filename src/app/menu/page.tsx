'use client';
import { useState, useEffect, useMemo } from 'react';
import { getCurrentMenu, saveCurrentMenu } from '@/lib/storage';
import { lookupMeal, lookupCarb, lookupVegetable, getPortionNotes } from '@/lib/mealLookup';
import { exportMultiplePagesPdf } from '@/lib/pdfExport';
import { GeneratedMenuPlan, DayMenu } from '@/types';
import { MEAL_TYPE_LABELS, DAY_NAMES } from '@/data/constants';
import Link from 'next/link';
import { supplements } from '@/data/supplements';
import { planInfo } from '@/data/plan-info';

type MealSlot = 'breakfast' | 'lunch' | 'snack' | 'dinner' | 'dessert';

function MealCell({ mealId, person, showPerson }: { mealId: string | null | undefined; person: string; showPerson: boolean }) {
  const meal = lookupMeal(mealId ?? null);
  if (!meal) return <div className="text-gray-300 text-xs italic">—</div>;
  return (
    <div className="text-xs">
      <span className="mr-0.5">{meal.emoji}</span>
      <span className="text-gray-700">{meal.name}</span>
      {showPerson && <span className={`ml-1 text-[9px] ${person === 'carlos' ? 'text-blue-500' : 'text-pink-500'}`}>({person === 'carlos' ? 'C' : 'J'})</span>}
    </div>
  );
}

function MealInfoModal({ mealId, onClose }: { mealId: string; onClose: () => void }) {
  const meal = lookupMeal(mealId);
  const info = planInfo[mealId];
  if (!meal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{meal.emoji}</span>
            <h3 className="font-semibold text-gray-900 text-sm">{meal.name}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none p-1">✕</button>
        </div>
        <div className="p-4 space-y-3">
          {info?.carlos && (
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-1">Carlos</p>
              <p className="text-xs text-gray-700 leading-relaxed">{info.carlos}</p>
            </div>
          )}
          {info?.johana && (
            <div className="bg-pink-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-pink-600 uppercase tracking-wide mb-1">Johana</p>
              <p className="text-xs text-gray-700 leading-relaxed">{info.johana}</p>
            </div>
          )}
          {info?.cooking && (
            <div className="bg-emerald-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide mb-1">Cómo preparar</p>
              <p className="text-xs text-gray-700 leading-relaxed">{info.cooking}</p>
            </div>
          )}
          {info?.notes && (
            <div className="bg-amber-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wide mb-1">Nota</p>
              <p className="text-xs text-gray-700 leading-relaxed">{info.notes}</p>
            </div>
          )}
          {!info && (
            <p className="text-xs text-gray-400 italic text-center py-2">Sin información adicional del plan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [menu, setMenu] = useState<GeneratedMenuPlan | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [swapMode, setSwapMode] = useState<{ week: number; day: number; slot: MealSlot; person: 'carlos' | 'johana' } | null>(null);
  const [swapEnabled, setSwapEnabled] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const m = getCurrentMenu();
    setMenu(m);
    setLoaded(true);
  }, []);

  const week = menu?.weekMenus?.[currentWeek] ?? null;

  // Collect portion notes (must be called before any early return to respect Rules of Hooks)
  const portionNotes = useMemo(() => {
    if (!week) return [];
    const notes = new Set<string>();
    week.days.forEach(day => {
      const mealIds = [day.carlos.lunch, day.carlos.dinner, day.johana.lunch, day.johana.dinner];
      mealIds.forEach(id => {
        if (id) {
          const note = getPortionNotes(id);
          if (note) notes.add(note);
        }
      });
    });
    return Array.from(notes);
  }, [week]);

  if (!loaded) return <div className="py-12 text-center text-gray-400">Cargando...</div>;

  if (!menu) return (
    <div className="py-12 text-center">
      <p className="text-gray-500 mb-4">No hay menú generado todavía.</p>
      <Link href="/comidas" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
        Ir a Comidas para crear uno
      </Link>
    </div>
  );

  if (!week) return null;

  function handleCellClick(dayIdx: number, slot: MealSlot, person: 'carlos' | 'johana', mealId: string | null) {
    // If swap mode is NOT enabled, show info modal
    if (!swapEnabled) {
      if (mealId) setSelectedMealId(mealId);
      return;
    }

    // Swap logic
    if (!swapMode) {
      setSwapMode({ week: currentWeek, day: dayIdx, slot, person });
      return;
    }

    if (swapMode.week === currentWeek && swapMode.slot === slot && swapMode.person === person && swapMode.day !== dayIdx) {
      // Perform swap
      const updated = { ...menu! };
      const weekData = updated.weekMenus![currentWeek];
      const srcDay = weekData.days[swapMode.day];
      const dstDay = weekData.days[dayIdx];
      const srcMeals = person === 'carlos' ? srcDay.carlos : srcDay.johana;
      const dstMeals = person === 'carlos' ? dstDay.carlos : dstDay.johana;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const src = srcMeals as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dst = dstMeals as any;
      const temp = src[slot];
      src[slot] = dst[slot];
      dst[slot] = temp;

      setMenu({ ...updated });
      saveCurrentMenu(updated);
    }
    setSwapMode(null);
  }

  async function handleExportPdf() {
    setExporting(true);
    try {
      const ids = menu!.weekMenus.map((_, i) => `menu-week-${i}`);
      await exportMultiplePagesPdf(ids, `menu-${menu!.name}.pdf`, 'landscape');
    } catch (e) {
      alert('Error al exportar PDF: ' + (e instanceof Error ? e.message : 'Error desconocido'));
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Menú Semanal</h1>
          <p className="text-xs text-gray-500">{swapEnabled ? 'Tocá una comida y luego otra del mismo tipo para intercambiarlas' : 'Tocá una comida para ver su info y receta'}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setSwapEnabled(!swapEnabled); setSwapMode(null); }}
            className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors ${
              swapEnabled ? 'bg-yellow-100 border-yellow-400 text-yellow-800' : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            {swapEnabled ? '🔄 Swap ON' : '🔄 Swap'}
          </button>
          <button onClick={handleExportPdf} disabled={exporting} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 disabled:opacity-50">
            {exporting ? '⏳' : '📄 PDF'}
          </button>
          <Link href="/lista-compras" className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700">
            🛒 Compras
          </Link>
        </div>
      </div>

      {/* Week navigation */}
      {menu.weekMenus.length > 1 && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
            disabled={currentWeek === 0}
            className="px-2 py-1 text-sm text-gray-500 disabled:opacity-30"
          >‹ Anterior</button>
          {menu.weekMenus.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentWeek(i)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                i === currentWeek ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >Semana {i + 1}</button>
          ))}
          <button
            onClick={() => setCurrentWeek(Math.min(menu.weekMenus.length - 1, currentWeek + 1))}
            disabled={currentWeek === menu.weekMenus.length - 1}
            className="px-2 py-1 text-sm text-gray-500 disabled:opacity-30"
          >Siguiente ›</button>
        </div>
      )}

      {/* For each week, render a printable grid */}
      {menu.weekMenus.map((wk, wIdx) => (
        <div key={wIdx} id={`menu-week-${wIdx}`} className={wIdx !== currentWeek ? 'hidden' : ''}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-xs font-semibold text-gray-500 w-20"></th>
                  {wk.days.map((day, dIdx) => (
                    <th key={dIdx} className="p-2 text-xs font-semibold text-gray-700 text-center">
                      {day.dayName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(['breakfast', 'lunch', 'snack', 'dinner', 'dessert'] as MealSlot[]).map(slot => {
                  const isDessert = slot === 'dessert';
                  return (
                    <tr key={slot} className="border-t border-gray-50">
                      <td className="p-2 text-xs font-medium text-gray-500 align-top">
                        {MEAL_TYPE_LABELS[slot]}
                        {isDessert && <span className="block text-[9px] text-blue-400">(Carlos)</span>}
                      </td>
                      {wk.days.map((day, dIdx) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const cMealId = (day.carlos as any)[slot] as string | null;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const jMealId = isDessert ? null : (day.johana as any)[slot] as string | null;
                        const sameFood = !isDessert && cMealId && jMealId && cMealId === jMealId;
                        const isSwapSrc = swapMode && swapMode.week === wIdx && swapMode.day === dIdx && swapMode.slot === slot;

                        return (
                          <td key={dIdx} className={`p-1.5 align-top text-center ${isSwapSrc ? 'bg-yellow-50 ring-2 ring-yellow-400 rounded' : ''}`}>
                            {sameFood ? (
                              <div
                                className="cursor-pointer hover:bg-gray-50 rounded p-0.5"
                                onClick={() => handleCellClick(dIdx, slot, 'carlos', cMealId)}
                              >
                                <MealCell mealId={cMealId} person="both" showPerson={false} />
                              </div>
                            ) : (
                              <div className="space-y-0.5">
                                {cMealId && (
                                  <div
                                    className="cursor-pointer hover:bg-blue-50 rounded p-0.5"
                                    onClick={() => handleCellClick(dIdx, slot, 'carlos', cMealId)}
                                  >
                                    <MealCell mealId={cMealId} person="carlos" showPerson={!isDessert} />
                                  </div>
                                )}
                                {!isDessert && jMealId && (
                                  <div
                                    className="cursor-pointer hover:bg-pink-50 rounded p-0.5"
                                    onClick={() => handleCellClick(dIdx, slot, 'johana', jMealId)}
                                  >
                                    <MealCell mealId={jMealId} person="johana" showPerson={true} />
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Portion notes */}
          {portionNotes.length > 0 && (
            <div className="mt-3 p-3 bg-amber-50 rounded-xl text-xs text-amber-800">
              <p className="font-semibold mb-1">📏 Porciones</p>
              {portionNotes.map((note, i) => (
                <p key={i}>• {note}</p>
              ))}
            </div>
          )}

          {/* Supplements */}
          <div className="mt-3 p-3 bg-purple-50 rounded-xl text-xs text-purple-800">
            <p className="font-semibold mb-1">💊 Suplementos diarios</p>
            <div className="grid grid-cols-2 gap-1.5">
              {supplements.map(s => (
                <div key={s.name} className="flex items-start gap-1.5">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-purple-600">{s.dosage}</span>
                  {s.forPerson !== 'both' && (
                    <span className={`text-[9px] px-1 rounded-full ${s.forPerson === 'carlos' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                      {s.forPerson === 'carlos' ? 'C' : 'J'}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-purple-500 mt-1.5">⏰ ZMA: antes de dormir · Cafeína: 30min pre-entreno · Creatina: a cualquier hora (Carlos)</p>
          </div>
        </div>
      ))}

      {swapMode && (
        <div className="fixed bottom-20 left-0 right-0 text-center z-20">
          <div className="inline-block bg-yellow-100 text-yellow-800 text-xs px-4 py-2 rounded-full shadow-lg">
            Seleccioná otra celda de <strong>{MEAL_TYPE_LABELS[swapMode.slot]}</strong> para intercambiar
            <button onClick={() => setSwapMode(null)} className="ml-2 text-yellow-600 underline">Cancelar</button>
          </div>
        </div>
      )}

      {selectedMealId && (
        <MealInfoModal mealId={selectedMealId} onClose={() => setSelectedMealId(null)} />
      )}
    </div>
  );
}
