'use client';
import { useState } from 'react';
import { breakfasts } from '@/data/breakfasts';
import { proteins } from '@/data/proteins';
import { snacksCarlos } from '@/data/snacks-carlos';
import { snacksJohana } from '@/data/snacks-johana';
import { dessertsCarlos } from '@/data/desserts-carlos';
import { planInfo, PlanInfo } from '@/data/plan-info';
import { supplements } from '@/data/supplements';
import { Person } from '@/types';

type Category = 'breakfast' | 'protein' | 'snack' | 'dessert' | 'supplements';

interface RecipeItem {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
  forPerson: Person;
  category: Category;
  info: PlanInfo | null;
}

const CATEGORY_LABELS: Record<Category, string> = {
  breakfast: 'Desayunos',
  protein: 'Proteínas (Almuerzo/Cena)',
  snack: 'Meriendas',
  dessert: 'Postres (Carlos)',
  supplements: 'Suplementos',
};

const CATEGORY_EMOJIS: Record<Category, string> = {
  breakfast: '🌅',
  protein: '🥩',
  snack: '🍎',
  dessert: '🍮',
  supplements: '💊',
};

function buildRecipeList(): RecipeItem[] {
  const items: RecipeItem[] = [];

  for (const b of breakfasts) {
    items.push({ id: b.id, name: b.name, shortName: b.shortName, emoji: b.emoji, forPerson: b.forPerson, category: 'breakfast', info: planInfo[b.id] || null });
  }
  for (const p of proteins) {
    items.push({ id: p.id, name: p.name, shortName: p.shortName, emoji: p.emoji, forPerson: p.forPerson, category: 'protein', info: planInfo[p.id] || null });
  }
  const seenSnacks = new Set<string>();
  for (const s of [...snacksCarlos, ...snacksJohana]) {
    if (seenSnacks.has(s.id)) continue;
    seenSnacks.add(s.id);
    items.push({ id: s.id, name: s.name, shortName: s.shortName, emoji: s.emoji, forPerson: s.forPerson, category: 'snack', info: planInfo[s.id] || null });
  }
  for (const d of dessertsCarlos) {
    items.push({ id: d.id, name: d.name, shortName: d.shortName, emoji: d.emoji, forPerson: 'carlos', category: 'dessert', info: planInfo[d.id] || null });
  }

  return items;
}

function PersonBadge({ person }: { person: Person }) {
  if (person === 'both') return <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">Ambos</span>;
  if (person === 'carlos') return <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Carlos</span>;
  return <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-medium">Johana</span>;
}

export default function RecetasPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('breakfast');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const allRecipes = buildRecipeList();
  const categories: Category[] = ['breakfast', 'protein', 'snack', 'dessert', 'supplements'];

  const filteredRecipes = allRecipes.filter(r => {
    if (r.category !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.shortName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Biblioteca de Recetas</h1>
      <p className="text-sm text-gray-500 mb-4">Todas las opciones del plan nutricional con recetas y porciones</p>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar receta..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>

      {/* Category tabs */}
      <div className="flex overflow-x-auto gap-2 mb-4 pb-1 -mx-1 px-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setExpandedId(null); }}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Supplements section */}
      {activeCategory === 'supplements' ? (
        <div className="space-y-3">
          {supplements.map(s => (
            <div key={s.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg mr-2">💊</span>
                  <span className="font-semibold text-sm text-gray-900">{s.name}</span>
                  {s.forPerson !== 'both' && (
                    <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${
                      s.forPerson === 'carlos' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                    } font-medium`}>{s.forPerson === 'carlos' ? 'Carlos' : 'Johana'}</span>
                  )}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p><span className="font-medium">Dosis:</span> {s.dosage}</p>
                <p><span className="font-medium">Cuándo:</span> {s.timing}</p>
              </div>
            </div>
          ))}

          {/* General cooking rules */}
          <div className="bg-emerald-50 rounded-xl p-4 mt-4">
            <h3 className="font-semibold text-sm text-emerald-800 mb-2">Reglas generales de cocina</h3>
            <ul className="text-xs text-emerald-700 space-y-1.5">
              <li>• NO agregar aceites a comidas ni ensaladas. Humedecer servilleta con ghee o aceite de coco.</li>
              <li>• Aderezar con: limón, vinagre de manzana, aceto balsámico, mostaza Heinz, sal, pimienta, hierbas, stevia.</li>
              <li>• Evitar frituras, salsas blancas, mantecas, rebozados, gratinados, crema de leche, margarina.</li>
              <li>• Cocinar al horno, parrilla, en salsa de tomate natural, grill, plancha, hervido, asado.</li>
              <li>• Comer pechuga (no pata, muslo ni alas). Eliminar piel del pollo y grasa visible de carnes.</li>
              <li>• Bebidas libres: limonada con menta y jengibre, mate cocido, té, matcha, infusiones. Endulzar con stevia.</li>
              <li>• Evitar aguas saborizadas, gaseosas light, alcohol, caldos, sopas deshidratadas, jugos exprimidos.</li>
              <li>• Café: solo 100% puro o de especialidad, NO torrado. Cortar con leche Protein 0% o almendras sin azúcar.</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Recipe list */
        <div className="space-y-2">
          {filteredRecipes.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">No se encontraron recetas.</p>
          )}
          {filteredRecipes.map(recipe => {
            const isExpanded = expandedId === recipe.id;
            const hasInfo = recipe.info && (recipe.info.carlos || recipe.info.johana || recipe.info.cooking);

            return (
              <div key={recipe.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : recipe.id)}
                  className="w-full flex items-center gap-3 p-3 text-left"
                >
                  <span className="text-2xl">{recipe.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{recipe.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <PersonBadge person={recipe.forPerson} />
                      {recipe.info?.cooking && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Con receta</span>}
                    </div>
                  </div>
                  <span className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}>›</span>
                </button>

                {isExpanded && hasInfo && (
                  <div className="px-3 pb-3 space-y-2">
                    {recipe.info?.carlos && (
                      <div className="bg-blue-50 rounded-lg p-2.5">
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-0.5">Carlos</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{recipe.info.carlos}</p>
                      </div>
                    )}
                    {recipe.info?.johana && (
                      <div className="bg-pink-50 rounded-lg p-2.5">
                        <p className="text-[10px] font-bold text-pink-600 uppercase tracking-wide mb-0.5">Johana</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{recipe.info.johana}</p>
                      </div>
                    )}
                    {recipe.info?.cooking && (
                      <div className="bg-emerald-50 rounded-lg p-2.5">
                        <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide mb-0.5">Cómo preparar</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{recipe.info.cooking}</p>
                      </div>
                    )}
                    {recipe.info?.notes && (
                      <div className="bg-amber-50 rounded-lg p-2.5">
                        <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wide mb-0.5">Nota</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{recipe.info.notes}</p>
                      </div>
                    )}
                  </div>
                )}
                {isExpanded && !hasInfo && (
                  <div className="px-3 pb-3">
                    <p className="text-xs text-gray-400 italic">Sin información adicional del plan.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
