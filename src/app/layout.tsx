import type { Metadata } from 'next';
import './globals.css';
import BottomNav from '@/components/layout/BottomNav';

export const metadata: Metadata = {
  title: 'Plan Nutricional - Carlos & Johana',
  description: 'Planificador de comidas y entrenamiento',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <main className="max-w-4xl mx-auto px-4 pb-20">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
