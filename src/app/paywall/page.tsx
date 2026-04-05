'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

type Plan = 'weekly' | 'annual';

export default function PaywallPage() {
  const router = useRouter();
  const { finishOnboarding } = useApp();
  const [selected, setSelected] = useState<Plan>('annual');
  const [loading, setLoading] = useState(false);

  // TODO: replace with real Stripe Checkout session creation
  function handlePurchase() {
    setLoading(true);
    // Simulate checkout — replace with: router.push(stripeCheckoutUrl)
    setTimeout(() => {
      finishOnboarding();
      router.push('/dashboard');
    }, 1200);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 'var(--space-4)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" style={{ color: 'var(--color-brand)', flexShrink: 0 }}>
            <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
            <line x1="9" y1="1" x2="9" y2="17" stroke="currentColor" strokeWidth="1.2" />
            <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'var(--color-text-2)',
            }}
          >
            AI Compass
          </span>
        </div>
        <button
          onClick={() => router.push('/your-plan')}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-3)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
      </div>

      <div
        style={{
          flex: 1,
          maxWidth: '520px',
          width: '100%',
          margin: '0 auto',
          padding: 'var(--space-12) var(--space-4) var(--space-16)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-8)',
        }}
      >
        {/* Headline */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-brand)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Unlock full access
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--color-text)',
            }}
          >
            Your plan is waiting.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-2)',
              marginTop: 'var(--space-3)',
              lineHeight: 1.6,
            }}
          >
            7 practical lessons. Built around your goals.
            The AI skills your business actually needs.
          </p>
        </div>

        {/* Pricing cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>

          {/* Annual — recommended, pre-selected */}
          <PlanCard
            plan="annual"
            selected={selected === 'annual'}
            onSelect={() => setSelected('annual')}
            badge="Most popular"
            priceMain="$39.99"
            priceSub="per year · $3.33/month"
            savings="Save 67% vs weekly"
          />

          {/* Weekly */}
          <PlanCard
            plan="weekly"
            selected={selected === 'weekly'}
            onSelect={() => setSelected('weekly')}
            badge={null}
            priceMain="$9.99"
            priceSub="per week"
            savings={null}
          />
        </div>

        {/* What's included */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-3)',
              marginBottom: 'var(--space-4)',
            }}
          >
            What you get
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {INCLUDED.map(item => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '16px',
                    height: '16px',
                    marginTop: '1px',
                    background: 'var(--color-invert)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-inv)" strokeWidth={3}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-2)',
                    lineHeight: 1.4,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div>
          <button
            onClick={handlePurchase}
            disabled={loading}
            style={{
              width: '100%',
              height: '52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: loading ? 'var(--color-surface-2)' : 'var(--color-invert)',
              color: loading ? 'var(--color-text-3)' : 'var(--color-text-inv)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background var(--duration-fast) var(--ease)',
            }}
            onMouseEnter={e => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-brand)';
            }}
            onMouseLeave={e => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-invert)';
            }}
          >
            {loading
              ? 'Opening checkout…'
              : selected === 'annual'
              ? 'Start learning — $39.99/year'
              : 'Start learning — $9.99/week'}
          </button>

          {/* Trust line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-4)',
            }}
          >
            {['Secure payment', 'Cancel any time', 'No hidden fees'].map(t => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-3)',
                  letterSpacing: '0.02em',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: 'var(--space-6)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-3)',
              textAlign: 'center',
              letterSpacing: '0.04em',
              lineHeight: 1.5,
            }}
          >
            Built for business owners who are serious about learning this properly —
            not just playing with a chatbot.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Plan card ─────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  selected,
  onSelect,
  badge,
  priceMain,
  priceSub,
  savings,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
  badge: string | null;
  priceMain: string;
  priceSub: string;
  savings: string | null;
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        padding: 'var(--space-4)',
        background: selected ? 'var(--color-surface)' : 'transparent',
        border: `1px solid ${selected ? 'var(--color-invert)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        textAlign: 'left',
        position: 'relative',
        transition: 'border-color var(--duration-fast) var(--ease), background var(--duration-fast) var(--ease)',
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: 'var(--space-4)',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-inv)',
            background: 'var(--color-brand)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          {badge}
        </div>
      )}

      {/* Left: price info */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 400,
            color: 'var(--color-text)',
            lineHeight: 1,
          }}
        >
          {priceMain}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-3)',
            marginTop: '4px',
          }}
        >
          {priceSub}
        </div>
        {savings && (
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-success)',
              marginTop: '2px',
              fontWeight: 500,
            }}
          >
            {savings}
          </div>
        )}
      </div>

      {/* Right: radio */}
      <div
        style={{
          flexShrink: 0,
          width: '20px',
          height: '20px',
          border: `1px solid ${selected ? 'var(--color-invert)' : 'var(--color-border-strong)'}`,
          borderRadius: '50%',
          background: selected ? 'var(--color-invert)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected && (
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--color-text-inv)',
            }}
          />
        )}
      </div>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INCLUDED = [
  'All 7 lessons — full curriculum, no content locked away',
  'Practice sandbox with AI feedback on your prompts',
  'Critical thinking framework for every lesson',
  'Progress tracking and lesson completion',
  'Lifetime access to all future updates',
];
