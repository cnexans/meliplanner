'use client';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SavedPlan } from '@/types';

export default function Home() {
  const [savedPlans] = useLocalStorage<SavedPlan[]>('plannutri_saved', []);
  const recentPlans = savedPlans.slice(-5).reverse();

  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Plan Nutricional</h1>
        <p className="text-gray-500 mt-1">Carlos & Johana</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          href="/comidas"
          className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <span className="text-4xl">🍽️</span>
          <div>
            <h2 className="font-semibold text-gray-900">Plan de Comidas</h2>
            <p className="text-sm text-gray-500">Seleccionar comidas y generar menú</p>
          </div>
        </Link>

        <Link
          href="/entrenamiento"
          className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <span className="text-4xl">🏋️</span>
          <div>
            <h2 className="font-semibold text-gray-900">Plan de Entrenamiento</h2>
            <p className="text-sm text-gray-500">Armar rutina de ejercicios</p>
          </div>
        </Link>
      </div>

      {recentPlans.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700">Planes recientes</h3>
            <Link href="/historial" className="text-sm text-emerald-600 hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="space-y-2">
            {recentPlans.map(plan => (
              <Link
                key={plan.id}
                href={plan.type === 'meal' ? `/menu?id=${plan.id}` : `/entrenamiento?id=${plan.id}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow"
              >
                <span className="text-2xl">{plan.type === 'meal' ? '🍽️' : '🏋️'}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{plan.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(plan.createdAt).toLocaleDateString('es-AR')} · {plan.weeks} semana{plan.weeks > 1 ? 's' : ''}
                  </p>
                </div>
                <span className="text-gray-300">›</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {recentPlans.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">🥗</p>
          <p>Aún no hay planes creados</p>
          <p className="text-sm mt-1">Empezá seleccionando tus comidas</p>
        </div>
      )}
    </div>
  );
}
