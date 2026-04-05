'use client';

import { useEffect, useState } from 'react';

// Captures the browser's beforeinstallprompt event so we can trigger it manually
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAProvider() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [updateReady, setUpdateReady] = useState(false);
  const [showInstall, setShowInstall] = useState(false);

  // ── Register service worker ───────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(registration => {
        // Detect when a new SW is waiting (app updated)
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              setUpdateReady(true);
            }
          });
        });
      })
      .catch(() => {
        // SW failed silently — app still works without it
      });
  }, []);

  // ── Capture install prompt ────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);

      // Show the banner after a short delay — not immediately on page load
      setTimeout(() => setShowInstall(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // ── Trigger install ───────────────────────────────────────────────────────
  async function handleInstall() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
      setShowInstall(false);
    }
  }

  // ── Apply update ──────────────────────────────────────────────────────────
  function handleUpdate() {
    navigator.serviceWorker.getRegistration().then(reg => {
      reg?.waiting?.postMessage({ type: 'SKIP_WAITING' });
    });
    window.location.reload();
  }

  // Neither banner is showing — render nothing
  if (!showInstall && !updateReady) return null;

  return (
    <>
      {/* ── Update banner ──────────────────────────────────────────────── */}
      {updateReady && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: 'var(--color-surface-3)',
            borderTop: '1px solid rgba(245,242,237,0.15)',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(245,242,237,0.7)',
            }}
          >
            A new version is ready.
          </span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => setUpdateReady(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(245,242,237,0.4)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Later
            </button>
            <button
              onClick={handleUpdate}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-inv)',
                background: 'var(--color-brand)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 16px',
                cursor: 'pointer',
              }}
            >
              Update now
            </button>
          </div>
        </div>
      )}

      {/* ── Install banner ─────────────────────────────────────────────── */}
      {showInstall && !updateReady && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: 'var(--color-bg)',
            borderTop: '1px solid var(--color-border-strong)',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--color-text)',
                marginBottom: '2px',
              }}
            >
              Add to Home Screen
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--color-text-3)',
                letterSpacing: '0.02em',
              }}
            >
              Access AI Compass offline, any time.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
            <button
              onClick={() => setShowInstall(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-3)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Not now
            </button>
            <button
              onClick={handleInstall}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-inv)',
                background: 'var(--color-invert)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 18px',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-brand)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-invert)'; }}
            >
              Install
            </button>
          </div>
        </div>
      )}
    </>
  );
}
