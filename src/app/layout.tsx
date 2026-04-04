import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navigation } from '@/components/layout/Navigation';

export const metadata: Metadata = {
  title: 'AI Compass — Learn AI for Business',
  description:
    'A practical AI learning course for small business owners. Build real skills, not just hype.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◎</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
        <AppProvider>
          <Navigation />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
