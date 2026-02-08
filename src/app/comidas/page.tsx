'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { breakfasts } from '@/data/breakfasts';
import { proteins } from '@/data/proteins';
import { snacksJohana } from '@/data/snacks-johana';
import { snacksCarlos } from '@/data/snacks-carlos';
import { dessertsCarlos } from '@/data/desserts-carlos';
import { carbs } from '@/data/carbs';
import { vegetables, sides } from '@/data/vegetables';
import { MEAL_TYPE_LABELS, MEAL_TYPE_EMOJIS, PERSON_COLORS } from '@/data/constants';
import { MealType, MealTypeSelection, MealSelection, Person, Meal, ProteinOption, SnackOption, CarbOption } from '@/types';
import { generateId, saveCurrentMenu, savePlan } from '@/lib/storage';
import { planInfo, PlanInfo } from '@/data/plan-info';

type AnyMealOption = { id: string; name: string; shortName: string; emoji: string; forPerson: Person };

function InfoModal({ meal, info, onClose }: { meal: AnyMealOption; info: PlanInfo; onClose: () => void }) {
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
          {info.carlos && (
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-1">Carlos</p>
              <p className="text-xs text-gray-700 leading-relaxed">{info.carlos}</p>
            </div>
          )}
          {info.johana && (
            <div className="bg-pink-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-pink-600 uppercase tracking-wide mb-1">Johana</p>
              <p className="text-xs text-gray-700 leading-relaxed">{info.johana}</p>
            </div>
          )}
          {info.notes && (
            <div className="bg-amber-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wide mb-1">Nota</p>
              <p className="text-xs text-gray-700 leading-relaxed">{info.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PersonBadge({ person }: { person: Person }) {
  if (person === 'both') return <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">Ambos</span>;
  const c = PERSON_COLORS[person];
  return <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${c.bg} ${c.text} font-medium`}>{person === 'carlos' ? 'Carlos' : 'Johana'}</span>;
}

function Counter({ value, onChange, max, disabled }: { value: number; onChange: (v: number) => void; max: number; disabled?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value === 0 || disabled}
        className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 font-bold text-sm flex items-center justify-center disabled:opacity-30 active:bg-gray-200"
      >-</button>
      <span className="w-5 text-center text-sm font-semibold">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        disabled={value >= max || disabled}
        className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center disabled:opacity-30 active:bg-emerald-200"
      >+</button>
    </div>
  );
}

function ProgressBar({ filled, total, person }: { filled: number; total: number; person: string }) {
  const pct = total > 0 ? Math.min((filled / total) * 100, 100) : 0;
  const complete = filled >= total;
  const color = person === 'carlos' ? 'bg-blue-500' : 'bg-pink-500';
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`font-medium ${person === 'carlos' ? 'text-blue-600' : 'text-pink-600'}`}>
        {person === 'carlos' ? 'C' : 'J'}
      </span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${complete ? 'bg-emerald-500' : color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`font-medium ${complete ? 'text-emerald-600' : 'text-gray-500'}`}>
        {filled}/{total} {complete && '✓'}
      </span>
    </div>
  );
}

interface SelectionState {
  [mealId: string]: { carlos: number; johana: number; vegetables?: string[]; carb?: string };
}

export default function ComidasPage() {
  const router = useRouter();
  const [weeks, setWeeks] = useState(1);
  const totalSlots = weeks * 7;

  // State per meal type
  const [breakfastSel, setBreakfastSel] = useLocalStorage<SelectionState>('plannutri_sel_breakfast', {});
  const [lunchSel, setLunchSel] = useLocalStorage<SelectionState>('plannutri_sel_lunch', {});
  const [snackSel, setSnackSel] = useLocalStorage<SelectionState>('plannutri_sel_snack', {});
  const [dinnerSel, setDinnerSel] = useLocalStorage<SelectionState>('plannutri_sel_dinner', {});
  const [dessertSel, setDessertSel] = useLocalStorage<SelectionState>('plannutri_sel_dessert', {});

  // Vegetable and carb selections for lunch/dinner
  const [lunchVeg, setLunchVeg] = useLocalStorage<Record<string, string[]>>('plannutri_sel_lunchveg', {});
  const [dinnerVeg, setDinnerVeg] = useLocalStorage<Record<string, string[]>>('plannutri_sel_dinnerveg', {});
  const [dinnerCarb, setDinnerCarb] = useLocalStorage<Record<string, string>>('plannutri_sel_dinnercarb', {});

  const [expandedSection, setExpandedSection] = useState<string | null>('breakfast');
  const [infoModal, setInfoModal] = useState<AnyMealOption | null>(null);

  function handleReset() {
    if (!confirm('¿Borrar toda la selección de comidas?')) return;
    setBreakfastSel({});
    setLunchSel({});
    setSnackSel({});
    setDinnerSel({});
    setDessertSel({});
    setLunchVeg({});
    setDinnerVeg({});
    setDinnerCarb({});
  }

  function getTotal(sel: SelectionState, person: 'carlos' | 'johana'): number {
    return Object.values(sel).reduce((sum, v) => sum + (v[person] || 0), 0);
  }

  function updateSel(
    sel: SelectionState,
    setSel: (v: SelectionState | ((prev: SelectionState) => SelectionState)) => void,
    mealId: string,
    person: 'carlos' | 'johana',
    value: number
  ) {
    setSel(prev => ({
      ...prev,
      [mealId]: { ...prev[mealId], carlos: prev[mealId]?.carlos || 0, johana: prev[mealId]?.johana || 0, [person]: value }
    }));
  }

  function remaining(sel: SelectionState, person: 'carlos' | 'johana'): number {
    return totalSlots - getTotal(sel, person);
  }

  // Check which sections are incomplete
  const missingItems = useMemo(() => {
    const missing: string[] = [];
    const checks: [string, number][] = [
      ['Desayuno C', totalSlots - getTotal(breakfastSel, 'carlos')],
      ['Desayuno J', totalSlots - getTotal(breakfastSel, 'johana')],
      ['Almuerzo C', totalSlots - getTotal(lunchSel, 'carlos')],
      ['Almuerzo J', totalSlots - getTotal(lunchSel, 'johana')],
      ['Snack C', totalSlots - getTotal(snackSel, 'carlos')],
      ['Snack J', totalSlots - getTotal(snackSel, 'johana')],
      ['Cena C', totalSlots - getTotal(dinnerSel, 'carlos')],
      ['Cena J', totalSlots - getTotal(dinnerSel, 'johana')],
      ['Postre C', totalSlots - getTotal(dessertSel, 'carlos')],
    ];
    for (const [label, rem] of checks) {
      if (rem > 0) missing.push(`${label}: faltan ${rem}`);
    }
    return missing;
  }, [breakfastSel, lunchSel, snackSel, dinnerSel, dessertSel, totalSlots]);

  const isComplete = missingItems.length === 0;

  function handleGenerate() {
    // Build selections array
    const selections: MealTypeSelection[] = [
      { mealType: 'breakfast', selections: Object.entries(breakfastSel).filter(([,v]) => v.carlos > 0 || v.johana > 0).map(([id, v]) => ({ mealId: id, countCarlos: v.carlos, countJohana: v.johana })) },
      { mealType: 'lunch', selections: Object.entries(lunchSel).filter(([,v]) => v.carlos > 0 || v.johana > 0).map(([id, v]) => ({ mealId: id, countCarlos: v.carlos, countJohana: v.johana, vegetableIds: lunchVeg[id], carbId: undefined })) },
      { mealType: 'snack', selections: Object.entries(snackSel).filter(([,v]) => v.carlos > 0 || v.johana > 0).map(([id, v]) => ({ mealId: id, countCarlos: v.carlos, countJohana: v.johana })) },
      { mealType: 'dinner', selections: Object.entries(dinnerSel).filter(([,v]) => v.carlos > 0 || v.johana > 0).map(([id, v]) => ({ mealId: id, countCarlos: v.carlos, countJohana: v.johana, vegetableIds: dinnerVeg[id], carbId: dinnerCarb[id] })) },
      { mealType: 'dessert', selections: Object.entries(dessertSel).filter(([,v]) => v.carlos > 0).map(([id, v]) => ({ mealId: id, countCarlos: v.carlos, countJohana: 0 })) },
    ];

    // Distribute into weekly menus
    const weekMenus = distributeMenus(selections, weeks, lunchVeg, dinnerVeg, dinnerCarb);

    const menu = {
      id: generateId(),
      name: `Menú ${new Date().toLocaleDateString('es-AR')}`,
      createdAt: new Date().toISOString(),
      weeks,
      weekMenus,
      selections,
    };

    saveCurrentMenu(menu);
    savePlan({
      id: menu.id,
      name: menu.name,
      type: 'meal',
      createdAt: menu.createdAt,
      weeks,
      data: menu,
    });
    router.push('/menu');
  }

  function renderMealSection(
    mealType: MealType,
    options: AnyMealOption[],
    sel: SelectionState,
    setSel: (v: SelectionState | ((prev: SelectionState) => SelectionState)) => void,
    showJohana: boolean = true,
    showCarlos: boolean = true,
  ) {
    const isExpanded = expandedSection === mealType;
    const cTotal = showCarlos ? getTotal(sel, 'carlos') : totalSlots;
    const jTotal = showJohana ? getTotal(sel, 'johana') : totalSlots;
    const cComplete = cTotal >= totalSlots;
    const jComplete = jTotal >= totalSlots;
    const sectionComplete = cComplete && jComplete;

    return (
      <div key={mealType} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          onClick={() => setExpandedSection(isExpanded ? null : mealType)}
          className="w-full flex items-center gap-3 p-4"
        >
          <span className="text-2xl">{MEAL_TYPE_EMOJIS[mealType]}</span>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{MEAL_TYPE_LABELS[mealType]}</span>
              {sectionComplete && <span className="text-emerald-500 text-sm">✓</span>}
            </div>
            <div className="mt-1 space-y-1">
              {showCarlos && <ProgressBar filled={cTotal} total={totalSlots} person="carlos" />}
              {showJohana && <ProgressBar filled={jTotal} total={totalSlots} person="johana" />}
            </div>
          </div>
          <span className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}>›</span>
        </button>

        {isExpanded && (
          <div className="px-4 pb-4">
            <div className="flex overflow-x-auto gap-3 pb-2 -mx-1 px-1 snap-x">
              {options.map(meal => {
                const s = sel[meal.id] || { carlos: 0, johana: 0 };
                const showC = showCarlos && (meal.forPerson === 'both' || meal.forPerson === 'carlos');
                const showJ = showJohana && (meal.forPerson === 'both' || meal.forPerson === 'johana');

                return (
                  <div key={meal.id} className="snap-start shrink-0 w-40 bg-gray-50 rounded-xl p-3 border border-gray-100 relative">
                    {planInfo[meal.id] && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setInfoModal(meal); }}
                        className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors text-[10px] font-bold"
                        title="Ver info del plan"
                      >
                        i
                      </button>
                    )}
                    <div className="text-center mb-2">
                      <span className="text-3xl block">{meal.emoji}</span>
                      <p className="text-xs font-medium text-gray-700 mt-1 line-clamp-2 min-h-[2rem]">{meal.shortName}</p>
                      <PersonBadge person={meal.forPerson} />
                    </div>
                    <div className="space-y-2 mt-2">
                      {showC && (
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-blue-600 font-medium">Carlos</span>
                          <Counter
                            value={s.carlos}
                            onChange={v => updateSel(sel, setSel, meal.id, 'carlos', v)}
                            max={s.carlos + remaining(sel, 'carlos')}
                          />
                        </div>
                      )}
                      {showJ && (
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-pink-600 font-medium">Johana</span>
                          <Counter
                            value={s.johana}
                            onChange={v => updateSel(sel, setSel, meal.id, 'johana', v)}
                            max={s.johana + remaining(sel, 'johana')}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vegetable selection for lunch/dinner */}
            {(mealType === 'lunch' || mealType === 'dinner') && (
              <div className="mt-4 p-3 bg-green-50 rounded-xl">
                <p className="text-xs font-semibold text-green-800 mb-2">🥬 Vegetales y guarniciones para acompañar</p>
                <div className="flex flex-wrap gap-1.5">
                  {[...vegetables, ...sides].map(v => {
                    const vegState = mealType === 'lunch' ? lunchVeg : dinnerVeg;
                    const setVegState = mealType === 'lunch' ? setLunchVeg : setDinnerVeg;
                    const selected = Object.values(vegState).flat().includes(v.id);
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          setVegState(prev => {
                            const key = '__global';
                            const current = prev[key] || [];
                            if (current.includes(v.id)) return { ...prev, [key]: current.filter(x => x !== v.id) };
                            return { ...prev, [key]: [...current, v.id] };
                          });
                        }}
                        className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                          selected ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
                        }`}
                      >
                        {v.emoji} {v.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Carb selection for dinner */}
            {mealType === 'dinner' && (
              <div className="mt-3 p-3 bg-amber-50 rounded-xl">
                <p className="text-xs font-semibold text-amber-800 mb-2">🍠 Carbohidrato para la cena</p>
                <div className="flex flex-wrap gap-1.5">
                  {carbs.map(c => {
                    const selected = Object.values(dinnerCarb).includes(c.id);
                    const carbInfo = planInfo[c.id];
                    return (
                      <span key={c.id} className="inline-flex items-center gap-0.5">
                        <button
                          onClick={() => {
                            setDinnerCarb(prev => {
                              const key = '__global';
                              return { ...prev, [key]: prev[key] === c.id ? '' : c.id };
                            });
                          }}
                          className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                            selected ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-gray-600 border-gray-200 hover:border-amber-400'
                          }`}
                        >
                          {c.emoji} {c.name}
                          {c.maxPerWeek && <span className="text-[9px] opacity-70 ml-1">(máx {c.maxPerWeek}/sem)</span>}
                        </button>
                        {carbInfo && (
                          <button
                            onClick={() => setInfoModal({ id: c.id, name: c.name, shortName: c.name, emoji: c.emoji, forPerson: 'both' })}
                            className="w-4 h-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors text-[9px] font-bold shrink-0"
                            title="Ver info del plan"
                          >i</button>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Build options lists
  const breakfastOptions: AnyMealOption[] = breakfasts.map(b => ({ id: b.id, name: b.name, shortName: b.shortName, emoji: b.emoji, forPerson: b.forPerson }));

  const proteinOptions: AnyMealOption[] = proteins.map(p => ({ id: p.id, name: p.name, shortName: p.shortName, emoji: p.emoji, forPerson: p.forPerson }));

  const allSnacks: AnyMealOption[] = [
    ...snacksCarlos.map(s => ({ id: s.id, name: s.name, shortName: s.shortName, emoji: s.emoji, forPerson: s.forPerson as Person })),
    ...snacksJohana.map(s => ({ id: s.id, name: s.name, shortName: s.shortName, emoji: s.emoji, forPerson: s.forPerson as Person })),
  ];

  // Deduplicate common snacks (same shortName)
  const snackOptions = allSnacks.reduce<AnyMealOption[]>((acc, s) => {
    if (!acc.find(x => x.id === s.id)) acc.push(s);
    return acc;
  }, []);

  const dessertOptions: AnyMealOption[] = dessertsCarlos.map(d => ({ id: d.id, name: d.name, shortName: d.shortName, emoji: d.emoji, forPerson: 'carlos' as Person }));

  return (
    <div className="py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Seleccionar Comidas</h1>
      <p className="text-sm text-gray-500 mb-4">Escogé las comidas para el período</p>

      {/* Period selector + reset */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Período:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(w => (
              <button
                key={w}
                onClick={() => setWeeks(w)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  weeks === w ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {w} sem
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 bg-white border border-red-200 text-red-500 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors"
        >
          Resetear
        </button>
      </div>

      <div className="space-y-3">
        {renderMealSection('breakfast', breakfastOptions, breakfastSel, setBreakfastSel)}
        {renderMealSection('lunch', proteinOptions, lunchSel, setLunchSel)}
        {renderMealSection('snack', snackOptions, snackSel, setSnackSel)}
        {renderMealSection('dinner', proteinOptions, dinnerSel, setDinnerSel)}
        {renderMealSection('dessert', dessertOptions, dessertSel, setDessertSel, false, true)}
      </div>

      {/* Info modal */}
      {infoModal && planInfo[infoModal.id] && (
        <InfoModal meal={infoModal} info={planInfo[infoModal.id]} onClose={() => setInfoModal(null)} />
      )}

      {/* Generate button */}
      <div className="sticky bottom-20 mt-6 z-10">
        <button
          onClick={handleGenerate}
          disabled={!isComplete}
          className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all ${
            isComplete
              ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isComplete ? '✨ Generar Menú' : 'Completar todas las selecciones'}
        </button>
        {!isComplete && missingItems.length > 0 && (
          <p className="text-xs text-center text-gray-400 mt-2">
            {missingItems.join(' · ')}
          </p>
        )}
      </div>
    </div>
  );
}

// Distribution algorithm — prioritizes both people eating the same dish on the same day
function distributeMenus(
  selections: MealTypeSelection[],
  weeks: number,
  lunchVeg: Record<string, string[]>,
  dinnerVeg: Record<string, string[]>,
  dinnerCarb: Record<string, string>,
) {
  const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function expand(sels: MealSelection[], person: 'carlos' | 'johana'): string[] {
    const arr: string[] = [];
    for (const s of sels) {
      const count = person === 'carlos' ? s.countCarlos : s.countJohana;
      for (let i = 0; i < count; i++) arr.push(s.mealId);
    }
    return arr;
  }

  /**
   * Aligns two arrays so that common elements appear at the same index
   * as much as possible, while keeping the total per-item counts intact.
   */
  function alignArrays(carlosRaw: string[], johanaRaw: string[]): [string[], string[]] {
    const cArr = shuffle(carlosRaw);
    const jArr = shuffle(johanaRaw);
    const len = Math.max(cArr.length, jArr.length);
    const cResult: (string | null)[] = new Array(len).fill(null);
    const jResult: (string | null)[] = new Array(len).fill(null);

    // Count available items for each person
    const cPool = new Map<string, number>();
    const jPool = new Map<string, number>();
    for (const id of cArr) cPool.set(id, (cPool.get(id) || 0) + 1);
    for (const id of jArr) jPool.set(id, (jPool.get(id) || 0) + 1);

    // Find common meal IDs and how many can be paired
    const commonIds = [...new Set(cArr)].filter(id => jPool.has(id));
    const pairs: string[] = [];
    for (const id of shuffle(commonIds)) {
      const canPair = Math.min(cPool.get(id) || 0, jPool.get(id) || 0);
      for (let i = 0; i < canPair; i++) pairs.push(id);
    }

    // Place paired items first
    let slot = 0;
    for (const id of shuffle(pairs)) {
      while (slot < len && (cResult[slot] !== null || jResult[slot] !== null)) slot++;
      if (slot >= len) break;
      cResult[slot] = id;
      jResult[slot] = id;
      cPool.set(id, (cPool.get(id) || 1) - 1);
      jPool.set(id, (jPool.get(id) || 1) - 1);
      slot++;
    }

    // Fill remaining Carlos slots
    const cRemaining = shuffle(
      [...cPool.entries()].flatMap(([id, count]) => new Array(count).fill(id))
    );
    let ci = 0;
    for (let i = 0; i < len && ci < cRemaining.length; i++) {
      if (cResult[i] === null) { cResult[i] = cRemaining[ci++]; }
    }

    // Fill remaining Johana slots
    const jRemaining = shuffle(
      [...jPool.entries()].flatMap(([id, count]) => new Array(count).fill(id))
    );
    let ji = 0;
    for (let i = 0; i < len && ji < jRemaining.length; i++) {
      if (jResult[i] === null) { jResult[i] = jRemaining[ji++]; }
    }

    return [cResult.map(x => x ?? ''), jResult.map(x => x ?? '')];
  }

  const globalVegLunch = lunchVeg['__global'] || [];
  const globalVegDinner = dinnerVeg['__global'] || [];
  const globalCarb = dinnerCarb['__global'] || '';

  const weekMenus = [];
  for (let w = 0; w < weeks; w++) {
    const getMealSels = (type: MealType) =>
      selections.find(s => s.mealType === type)?.selections || [];

    const [bfC, bfJ] = alignArrays(expand(getMealSels('breakfast'), 'carlos'), expand(getMealSels('breakfast'), 'johana'));
    const [luC, luJ] = alignArrays(expand(getMealSels('lunch'), 'carlos'), expand(getMealSels('lunch'), 'johana'));
    const [snC, snJ] = alignArrays(expand(getMealSels('snack'), 'carlos'), expand(getMealSels('snack'), 'johana'));
    const [diC, diJ] = alignArrays(expand(getMealSels('dinner'), 'carlos'), expand(getMealSels('dinner'), 'johana'));
    const deC = shuffle(expand(getMealSels('dessert'), 'carlos'));

    const days = [];
    for (let d = 0; d < 7; d++) {
      days.push({
        dayIndex: d,
        dayName: DAY_NAMES[d],
        carlos: {
          breakfast: bfC[d] || null,
          lunch: luC[d] || null,
          lunchVegetables: globalVegLunch,
          snack: snC[d] || null,
          dinner: diC[d] || null,
          dinnerVegetables: globalVegDinner,
          dinnerCarb: globalCarb || undefined,
          dessert: deC[d] || null,
        },
        johana: {
          breakfast: bfJ[d] || null,
          lunch: luJ[d] || null,
          lunchVegetables: globalVegLunch,
          snack: snJ[d] || null,
          dinner: diJ[d] || null,
          dinnerVegetables: globalVegDinner,
          dinnerCarb: globalCarb || undefined,
        },
      });
    }
    weekMenus.push({ weekNumber: w + 1, days });
  }
  return weekMenus;
}
