import './structure.css';
import { useEffect, useRef, useState } from 'react';
import PageHeading from '../../components/PageHeading.jsx';
import SweepButton from '../shared/SweepButton.jsx';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track leading docked card during mobile scroll-stack scrolling so the
  // dark midnight navy + amber gold active state follows the card on top.
  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 760px)');
    let rafId = 0;

    const updateActiveOnScroll = () => {
      if (!mobileQuery.matches) return;
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;

      let chosen = 0;
      for (let i = 0; i < cards.length; i += 1) {
        const rect = cards[i].getBoundingClientRect();
        const stickyTop = 88 + i * 9;
        if (rect.top <= stickyTop + 28) {
          chosen = i;
        }
      }
      setActiveIndex((prev) => (prev === chosen ? prev : chosen));
    };

    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveOnScroll);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    mobileQuery.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      mobileQuery.removeEventListener('change', schedule);
    };
  }, []);

  const progressRatio = activeIndex >= 0 ? (activeIndex + 1) / content.tiers.length : 0.25;

  return (
    <section
      ref={sectionRef}
      id="structure"
      className={`structure-section route-section${revealed ? ' is-revealed' : ''}${
        embedded ? '' : ' structure-standalone'
      }`}
    >
      <div className="structure-ambient-bg" aria-hidden="true">
        <div className="structure-warm-wash" />
        <svg
          className="structure-silk-arcs structure-silk-arcs-bl"
          viewBox="0 0 600 420"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-60 410C120 350 280 270 380 120C430 46 490 -20 580 -40"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M-90 360C110 315 260 220 350 70"
            stroke="currentColor"
            strokeWidth="0.9"
            opacity="0.6"
          />
        </svg>
        <svg
          className="structure-silk-arcs structure-silk-arcs-tr"
          viewBox="0 0 520 380"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M110 -30C210 90 340 165 550 185"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.48"
          />
          <path
            d="M210 -40C295 65 400 120 550 132"
            stroke="currentColor"
            strokeWidth="0.85"
            opacity="0.34"
          />
        </svg>
      </div>

      <div className="wrap">
        <div className="structure-layout">
          <div className="structure-intro">
            <PageHeading embedded={embedded}>{content.title}</PageHeading>
            <div className="structure-accent-rule" aria-hidden="true" />
            <p className="lede">{content.description}</p>
            <div className="structure-cta-wrap">
              <SweepButton to={content.cta.to}>{content.cta.label}</SweepButton>
            </div>
          </div>

          <div className="structure-reader">
            <div className="structure-bar">
              <div className="structure-tabs" role="tablist" aria-label="Organisational levels">
                {content.tiers.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                  >
                    {item.name === 'Bar Association / Bar Unit' ? 'Bar Unit' : item.name}
                  </button>
                ))}
              </div>
              <div className="structure-bar-meta" aria-live="polite">
                <span className="structure-meta-divider" aria-hidden="true" />
                <span>
                  {activeIndex >= 0
                    ? `${content.tiers[activeIndex].num} / 0${content.tiers.length}`
                    : content.metaLabel}
                </span>
              </div>
              <div
                className="structure-progress-track"
                aria-hidden="true"
                style={{ '--progress': progressRatio }}
              >
                <span className="structure-progress-fill" />
              </div>
            </div>

            <div className="structure-list">
              {content.tiers.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <article
                    key={item.name}
                    ref={(node) => {
                      cardRefs.current[i] = node;
                    }}
                    className={`structure-entry${isActive ? ' is-active' : ''}`}
                    style={{
                      '--stack-index': i,
                      '--reveal-delay': `${i * 60}ms`,
                    }}
                  >
                    <div className="structure-entry-num">{item.num}</div>
                    <span className="structure-entry-sep" aria-hidden="true" />

                    <div className="structure-entry-main">
                      <div className="structure-entry-head">
                        <h3>
                          <button
                            type="button"
                            className="structure-entry-trigger"
                            aria-expanded={isActive}
                            onClick={() => setActiveIndex(isActive ? -1 : i)}
                          >
                            {item.name}
                          </button>
                        </h3>
                        <span className="structure-mobile-count">{item.tier}</span>
                      </div>

                      <p className="structure-entry-preview">{item.headline}</p>

                      <div className="structure-entry-expand">
                        <div className="structure-entry-expand-inner">
                          <p className="structure-entry-headline">{item.headline}</p>
                          <p className="structure-entry-full">{item.body}</p>
                        </div>
                      </div>
                    </div>

                    <span className="structure-entry-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        {isActive ? (
                          <path
                            d="M6 15l6-6 6 6"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ) : (
                          <path
                            d="M5 12h14m-6-6 6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                      </svg>
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="structure-values" aria-label={content.valuesHeading}>
          {content.values.map((val, i) => (
            <div
              className="structure-value"
              key={val.label}
              style={{ '--val-delay': `${220 + i * 55}ms` }}
            >
              <span className="structure-value-icon">
                <ValueIcon kind={val.icon} />
              </span>
              <p>{val.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
