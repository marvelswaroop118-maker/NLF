import './structure.css';
import { useEffect, useRef, useState } from 'react';
import PageHeading from '../../components/PageHeading.jsx';
import { useAccessibleTabs } from '../../hooks/useAccessibleTabs.js';
import SweepButton from '../shared/SweepButton.jsx';
import LazyAmbientBg from '../shared/LazyAmbientBg.jsx';
import Waves from '../shared/Waves.jsx';
import { structureContent as content } from './structure.content.js';

function ValueIcon({ kind }) {
  switch (kind) {
    case 'unity':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 12h4l3 3 4-6 3 3h4" />
          <path d="M3 18h18" />
        </svg>
      );
    case 'dignity':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />
        </svg>
      );
    case 'transparency':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
        </svg>
      );
    case 'nonpartisan':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3v18M5 7h14M5 7l-3 8a3 3 0 006 0zM19 7l-3 8a3 3 0 006 0z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21c-4-3-7-6-7-10a4 4 0 017-2.5A4 4 0 0119 11c0 4-3 7-7 10z" />
          <path d="M8 11h8" />
        </svg>
      );
  }
}

export default function Structure({ embedded = false }) {
  const { active, setActive, tabProps, panelProps } = useAccessibleTabs('structure', {
    vertical: true,
  });
  const [revealed, setRevealed] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const manualRef = useRef(false);
  const Subheading = embedded ? 'h3' : 'h2';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setRevealed(true);
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Desktop embedded scroll-scrub walks through all 4 pyramid tiers before releasing to the next section.
  useEffect(() => {
    if (!embedded) return undefined;
    const mobileOrReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce), (max-width: 760px)',
    );
    let rafId = 0;

    const paint = () => {
      if (mobileOrReduced.matches || manualRef.current || !sectionRef.current) return;
      const bounds = sectionRef.current.getBoundingClientRect();
      if (bounds.top > 0 || bounds.bottom < window.innerHeight) return;
      const scrollable = bounds.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -bounds.top / scrollable));
      setActive(Math.min(content.tiers.length - 1, Math.floor(progress * content.tiers.length)));
    };

    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(paint);
    };

    const resumeScroll = () => {
      manualRef.current = false;
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('wheel', resumeScroll, { passive: true });
    window.addEventListener('touchstart', resumeScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('wheel', resumeScroll);
      window.removeEventListener('touchstart', resumeScroll);
    };
  }, [embedded, setActive]);

  // On mobile or standalone route (not pinned), cycle cleanly through tiers when in view until tapped.
  useEffect(() => {
    if (!inView || manualRef.current) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopPinned = embedded && window.matchMedia('(min-width: 761px)').matches;
    if (reduced || desktopPinned) return undefined;

    const timer = window.setInterval(() => {
      if (!manualRef.current) {
        setActive((prev) => (prev + 1) % content.tiers.length);
      }
    }, 3400);

    return () => window.clearInterval(timer);
  }, [embedded, inView, setActive]);

  const handleTierInteract = (index, originalHandler) => (event) => {
    manualRef.current = true;
    originalHandler?.(event);
    if (typeof index === 'number') {
      setActive(index);
    }
  };

  const currentTier = content.tiers[active] || content.tiers[0];

  return (
    <section
      ref={sectionRef}
      id="structure"
      className={`structure-section route-section${revealed ? ' is-revealed' : ''}${
        embedded ? '' : ' structure-standalone'
      }`}
    >
      {embedded && (
        <>
          <span className="home-snap-waypoint" style={{ top: '42svh' }} aria-hidden="true" />
          <span className="home-snap-waypoint" style={{ top: '78svh' }} aria-hidden="true" />
          <span className="home-snap-waypoint" style={{ top: '114svh' }} aria-hidden="true" />
        </>
      )}
      <div className="structure-pin">
        <div className="structure-ambient-bg" aria-hidden="true">
          <div className="structure-warm-wash" />
          <LazyAmbientBg>
            <Waves
              lightMode
              backgroundColor="transparent"
              lineColor="#c8892c"
              accentColor="#f09d1c"
              spacing={36}
              lineWidth={0.8}
              amplitude={18}
              speed={0.5}
              twist={0.85}
              rotation={10}
              opacity={0.3}
              fade={0.38}
              mouseRadius={140}
            />
          </LazyAmbientBg>
        </div>

        <div className="wrap structure-inner">
          <div className="structure-header">
            <div className="structure-title-col">
              <PageHeading embedded={embedded}>{content.title}</PageHeading>
              <div className="structure-accent-rule" aria-hidden="true" />
            </div>

            <div className="structure-lead-col">
              <p className="lede">{content.description}</p>
              <SweepButton to={content.cta.to}>{content.cta.label}</SweepButton>
            </div>
          </div>

          <div className="structure-stage">
            <div className="structure-pyramid-wrap">
              <div className="structure-spine" aria-hidden="true">
                <span className="structure-spine-line" />
                <span className="structure-spine-label">Representation flows upward</span>
              </div>

              <div
                className="structure-pyramid"
                role="tablist"
                aria-label="Organisational levels"
                aria-orientation="vertical"
                onKeyDown={handleTierInteract()}
              >
                {content.tiers.map((item, index) => {
                  const props = tabProps(index, 'structure-tier');
                  const isSelected = active === index;
                  return (
                    <button
                      key={item.name}
                      {...props}
                      className={`${props.className}${isSelected ? ' is-active' : ''}`}
                      style={{
                        '--tier-w': item.width,
                        '--tier-delay': `${index * 60}ms`,
                      }}
                      onClick={handleTierInteract(index, props.onClick)}
                    >
                      <span className="structure-tier-top">
                        <small>{item.tier}</small>
                        <span className="structure-tier-num">{item.num}</span>
                      </span>
                      <b>{item.name}</b>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="structure-detail-panel">
              {content.tiers.map((item, index) => {
                const panel = panelProps(index, 'structure-detail-card');
                const isCurrent = active === index;
                return (
                  <div
                    key={item.name}
                    {...panel}
                    className={`${panel.className}${isCurrent ? ' is-current' : ''}`}
                  >
                    <div className="structure-detail-kicker">
                      <span>{item.tier}</span>
                      <span className="structure-detail-dot" aria-hidden="true" />
                      <span>{item.scope}</span>
                    </div>

                    <Subheading>{item.headline}</Subheading>
                    <p className="structure-detail-body">{item.body}</p>

                    <div className="structure-escalation" aria-label="Upward representation flow">
                      <span className="structure-escalation-title">Escalation path</span>
                      <ol className="structure-chain">
                        {content.chainLabel.map((label, chainIdx) => {
                          const isNodeCurrent = currentTier.chainIndex === chainIdx;
                          const isNodePassed = chainIdx <= currentTier.chainIndex;
                          return (
                            <li
                              key={label}
                              className={`${isNodeCurrent ? 'is-current' : ''}${
                                isNodePassed ? ' is-reached' : ''
                              }`.trim()}
                            >
                              <span>{label}</span>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="structure-values" aria-label={content.valuesHeading}>
            {content.values.map((val, i) => (
              <div
                className="structure-value"
                key={val.label}
                style={{ '--val-delay': `${180 + i * 50}ms` }}
              >
                <span className="structure-value-icon">
                  <ValueIcon kind={val.icon} />
                </span>
                <p>{val.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
