import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navigation } from '@/components/layout/Navigation';

export const metadata: Metadata = {
  title: 'AI Compass — Learn AI for Business & Study',
  description:
    'A practical AI learning app for small business owners and students. Build real skills, not just hype.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧭</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="nature-bg min-h-screen">
        {/* Ambient background blobs — purely decorative */}
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="nature-blob w-96 h-96 bg-forest-200 -top-24 -left-24"
            style={{ opacity: 0.35 }}
          />
          <div
            className="nature-blob w-80 h-80 bg-teal-200 top-1/3 -right-20"
            style={{ opacity: 0.25 }}
          />
          <div
            className="nature-blob w-64 h-64 bg-amber-200 bottom-1/4 left-1/4"
            style={{ opacity: 0.18 }}
          />
        </div>

        <AppProvider>
          <Navigation />
          <main className="relative z-10">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
