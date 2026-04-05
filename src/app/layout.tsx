import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navigation } from '@/components/layout/Navigation';
import { PWAProvider } from '@/components/PWAProvider';

export const metadata: Metadata = {
  title: 'AI Compass — Learn AI for Business',
  description:
    'Master AI in 7 days. Practical lessons built for small business owners — with the critical thinking to use it wisely.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'AI Compass',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.svg',
    shortcut: '/icon.svg',
  },
  other: {
    // iOS: makes the status bar match the dark nav when installed
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  themeColor: '#111009',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover', // handles iPhone notch / home indicator
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
        <AppProvider>
          <Navigation />
          <main>{children}</main>
          <PWAProvider />
        </AppProvider>
      </body>
    </html>
  );
}
