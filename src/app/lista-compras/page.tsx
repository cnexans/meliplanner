'use client';
import { useState, useEffect, useMemo } from 'react';
import { getCurrentMenu } from '@/lib/storage';
import Link from 'next/link';
import { getIngredientsForMeal, getVegetableIngredients, getCarbIngredients } from '@/lib/mealLookup';
import { exportToPdf } from '@/lib/pdfExport';
import { GeneratedMenuPlan, Ingredient, StoreSection } from '@/types';
import { SECTION_NAMES, SECTION_ORDER } from '@/data/constants';
import { supplements } from '@/data/supplements';

interface AggItem {
  name: string;
  quantity: number;
  unit: string;
  section: StoreSection;
}

function aggregateIngredients(menu: GeneratedMenuPlan): Map<StoreSection, AggItem[]> {
  const map = new Map<string, AggItem>();

  function addIngredient(ing: Ingredient) {
    const key = `${ing.name}__${ing.unit}`;
    const existing = map.get(key);
    if (existing) {
      existing.quantity += ing.quantity;
    } else {
      map.set(key, { name: ing.name, quantity: ing.quantity, unit: ing.unit, section: ing.section });
    }
  }

  for (const week of menu.weekMenus) {
    for (const day of week.days) {
      // Carlos meals
      const c = day.carlos;
      const carlosMealIds = [c.breakfast, c.lunch, c.snack, c.dinner, c.dessert];
      for (const mealId of carlosMealIds) {
        if (mealId) {
          getIngredientsForMeal(mealId, 'carlos').forEach(addIngredient);
        }
      }

      // Johana meals
      const j = day.johana;
      const johanaMealIds = [j.breakfast, j.lunch, j.snack, j.dinner];
      for (const mealId of johanaMealIds) {
        if (mealId) {
          getIngredientsForMeal(mealId, 'johana').forEach(addIngredient);
        }
      }

      // Vegetables for lunch/dinner (shared)
      const lunchVeg = c.lunchVegetables;
      const dinnerVeg = c.dinnerVegetables;
      const dinnerCarb = c.dinnerCarb;

      // Count once per day for shared vegetables (for 2 people)
      if (lunchVeg) {
        lunchVeg.forEach(vId => {
          getVegetableIngredients(vId).forEach(ing => {
            addIngredient({ ...ing, quantity: ing.quantity * 2 }); // for both people
          });
        });
      }
      if (dinnerVeg) {
        dinnerVeg.forEach(vId => {
          getVegetableIngredients(vId).forEach(ing => {
            addIngredient({ ...ing, quantity: ing.quantity * 2 });
          });
        });
      }
      if (dinnerCarb) {
        getCarbIngredients(dinnerCarb).forEach(ing => {
          addIngredient({ ...ing, quantity: ing.quantity * 2 });
        });
      }
    }
  }

  // Add common items
  addIngredient({ name: 'Ghee o aceite de coco (para cocinar)', quantity: 1, unit: 'frasco', section: 'almacen' });
  addIngredient({ name: 'Mostaza Heinz (sin azúcar)', quantity: 1, unit: 'frasco', section: 'almacen' });
  addIngredient({ name: 'Vinagre de manzana', quantity: 1, unit: 'botella', section: 'almacen' });
  addIngredient({ name: 'Aceto balsámico', quantity: 1, unit: 'botella', section: 'almacen' });
  addIngredient({ name: 'Salsas Mr Taste 0 calorías', quantity: 1, unit: 'botella', section: 'almacen' });

  // Add supplements
  for (const supp of supplements) {
    for (const ing of supp.ingredients) {
      addIngredient(ing);
    }
  }

  // Group by section
  const sections = new Map<StoreSection, AggItem[]>();
  for (const item of map.values()) {
    if (!sections.has(item.section)) sections.set(item.section, []);
    sections.get(item.section)!.push(item);
  }

  // Sort items within each section
  for (const items of sections.values()) {
    items.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sections;
}

function formatQuantity(qty: number, unit: string): string {
  if (unit === 'g' && qty >= 1000) return `${(qty / 1000).toFixed(1)} kg`;
  if (unit === 'g') return `${Math.round(qty)}g`;
  if (unit === 'ml' && qty >= 1000) return `${(qty / 1000).toFixed(1)} L`;
  if (qty === Math.round(qty)) return `${qty} ${unit}`;
  return `${qty.toFixed(1)} ${unit}`;
}

export default function ListaComprasPage() {
  const [menu, setMenu] = useState<GeneratedMenuPlan | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const m = getCurrentMenu();
    setMenu(m);
    setLoaded(true);
  }, []);

  const sections = useMemo(() => {
    if (!menu) return new Map();
    return aggregateIngredients(menu);
  }, [menu]);

  function toggleItem(name: string) {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function copyList() {
    const lines: string[] = [];
    for (const sec of SECTION_ORDER) {
      const items = sections.get(sec);
      if (!items || items.length === 0) continue;
      lines.push(SECTION_NAMES[sec]);
      for (const item of items) {
        lines.push(`- ${item.name}: ${formatQuantity(item.quantity, item.unit)}`);
      }
      lines.push('');
    }
    navigator.clipboard.writeText(lines.join('\n').trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!loaded) return <div className="py-12 text-center text-gray-400">Cargando...</div>;

  if (!menu) return (
    <div className="py-12 text-center">
      <p className="text-gray-500 mb-4">No hay menú generado todavía.</p>
      <Link href="/comidas" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
        Ir a Comidas para crear uno
      </Link>
    </div>
  );

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Lista de Compras</h1>
          <p className="text-xs text-gray-500">{menu.weeks} semana{menu.weeks > 1 ? 's' : ''} · {menu.name}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyList}
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
                await exportToPdf('shopping-list-content', `lista-compras-${menu.name}.pdf`, 'portrait');
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

      <div id="shopping-list-content" className="space-y-4">
        {SECTION_ORDER.map(sec => {
          const items = sections.get(sec);
          if (!items || items.length === 0) return null;

          return (
            <div key={sec} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                <h3 className="font-semibold text-sm text-gray-700">{SECTION_NAMES[sec]}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {items.map((item: AggItem) => {
                  const checked = checkedItems.has(item.name);
                  return (
                    <button
                      key={item.name}
                      onClick={() => toggleItem(item.name)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        checked ? 'bg-gray-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        checked ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                      }`}>
                        {checked && <span className="text-white text-xs">✓</span>}
                      </span>
                      <span className={`flex-1 text-sm ${checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {item.name}
                      </span>
                      <span className={`text-xs font-medium ${checked ? 'text-gray-300' : 'text-gray-500'}`}>
                        {formatQuantity(item.quantity, item.unit)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
