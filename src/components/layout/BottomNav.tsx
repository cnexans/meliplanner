'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Inicio', emoji: '🏠' },
  { href: '/comidas', label: 'Comidas', emoji: '🍽️' },
  { href: '/recetas', label: 'Recetas', emoji: '📖' },
  { href: '/entrenamiento', label: 'Ejercicio', emoji: '🏋️' },
  { href: '/historial', label: 'Historial', emoji: '📋' },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="no-print fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-lg mx-auto flex">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center py-2 px-1 text-xs transition-colors ${
              isActive(item.href)
                ? 'text-emerald-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-xl mb-0.5">{item.emoji}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
