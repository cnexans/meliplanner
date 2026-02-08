'use client';
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SavedPlan } from '@/types';
import { deletePlan } from '@/lib/storage';
import Link from 'next/link';

export default function HistorialPage() {
  const [savedPlans, setSavedPlans] = useLocalStorage<SavedPlan[]>('plannutri_saved', []);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const sorted = [...savedPlans].reverse();

  function handleDelete(id: string) {
    deletePlan(id);
    setSavedPlans(prev => prev.filter(p => p.id !== id));
    setConfirmDelete(null);
  }

  return (
    <div className="py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Historial de Planes</h1>

      {sorted.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">📋</p>
          <p>No hay planes guardados</p>
          <div className="flex justify-center gap-3 mt-4">
            <Link href="/comidas" className="text-sm text-emerald-600 hover:underline">Crear plan de comidas</Link>
            <Link href="/entrenamiento" className="text-sm text-emerald-600 hover:underline">Crear plan de ejercicio</Link>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sorted.map(plan => (
          <div key={plan.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 p-4">
              <span className="text-2xl">{plan.type === 'meal' ? '🍽️' : '🏋️'}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{plan.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(plan.createdAt).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                  {' · '}{plan.weeks} semana{plan.weeks > 1 ? 's' : ''}
                  {' · '}{plan.type === 'meal' ? 'Comidas' : 'Entrenamiento'}
                </p>
              </div>

              <div className="flex gap-1">
                <Link
                  href={plan.type === 'meal' ? `/menu?id=${plan.id}` : `/entrenamiento?id=${plan.id}`}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200"
                >
                  Ver
                </Link>
                {confirmDelete === plan.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium"
                    >Sí, borrar</button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
                    >No</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(plan.id)}
                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100"
                  >
                    Borrar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
