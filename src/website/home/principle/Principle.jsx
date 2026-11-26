import './principle.css';
import { useEffect, useRef, useState } from 'react';
import PageHeading from '../../components/PageHeading.jsx';
import SweepButton from '../shared/SweepButton.jsx';
import { principleContent as content } from './principle.content.js';

export default function Principle({ embedded = false }) {
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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track leading docked card on mobile so the scroll-stack active highlight
  // moves dynamically with the card in front.
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

  const progressRatio = activeIndex >= 0 ? (activeIndex + 1) / content.steps.length : 0.25;

  return (
    <section
      ref={sectionRef}
      id="principle"
      className={`principle-section route-section${revealed ? ' is-revealed' : ''}${
        embedded ? '' : ' principle-standalone'
      }`}
    >
      <div className="principle-ambient-bg" aria-hidden="true">
        <div className="principle-glow-wash" />
        <svg
          className="principle-silk-arcs principle-silk-arcs-tr"
          viewBox="0 0 600 420"
          fill="none"
          preserveAspectRatio="none"
        >
          <path d="M120 -30C230 110 370 190 620 215" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M230 -40C330 85 450 140 620 155"
            stroke="currentColor"
            strokeWidth="0.9"
            opacity="0.58"
          />
        </svg>
        <svg
          className="principle-silk-arcs principle-silk-arcs-bl"
          viewBox="0 0 540 380"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-50 380C125 320 265 240 365 95"
            stroke="currentColor"
            strokeWidth="1.05"
            opacity="0.5"
          />
          <path
            d="M40 400C180 355 310 285 415 160"
            stroke="currentColor"
            strokeWidth="0.85"
            opacity="0.32"
          />
        </svg>
      </div>

      <div className="wrap principle-layout">
        <div className="principle-intro">
          <PageHeading embedded={embedded}>{content.title}</PageHeading>
          <div className="principle-accent-rule" aria-hidden="true" />
          <p className="lede">{content.ethos}</p>
          <div className="principle-cta-wrap">
            <SweepButton to={content.cta.to} primary>
              {content.cta.label}
            </SweepButton>
          </div>
        </div>

        <div className="principle-reader">
          <div className="principle-bar">
            <div
              className="principle-steps-nav"
              role="tablist"
              aria-label="Working principle steps"
            >
              {content.steps.map((step, index) => (
                <button
                  key={step.label}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                >
                  {step.label}
                </button>
              ))}
            </div>
            <div className="principle-bar-meta" aria-live="polite">
              <span className="principle-meta-divider" aria-hidden="true" />
              <span>
                {activeIndex >= 0
                  ? `${content.steps[activeIndex].num} / 0${content.steps.length}`
                  : content.metaLabel}
              </span>
            </div>
            <div
              className="principle-progress-track"
              aria-hidden="true"
              style={{ '--progress': progressRatio }}
            >
              <span className="principle-progress-fill" />
            </div>
          </div>

          <div className="principle-list">
            {content.steps.map((step, i) => {
              const isActive = activeIndex === i;
              return (
                <article
                  key={step.label}
                  ref={(node) => {
                    cardRefs.current[i] = node;
                  }}
                  className={`principle-entry${isActive ? ' is-active' : ''}`}
                  style={{
                    '--stack-index': i,
                    '--reveal-delay': `${i * 65}ms`,
                  }}
                >
                  <div className="principle-entry-num">{step.num}</div>
                  <span className="principle-entry-sep" aria-hidden="true" />

                  <div className="principle-entry-main">
                    <div className="principle-entry-head">
                      <h3>
                        <button
                          type="button"
                          className="principle-entry-trigger"
                          aria-expanded={isActive}
                          onClick={() => setActiveIndex(isActive ? -1 : i)}
                        >
                          {step.label}
                        </button>
                      </h3>
                      <span className="principle-mobile-count">
                        {step.num} / 0{content.steps.length}
                      </span>
                    </div>

                    <p className="principle-entry-preview">{step.summary}</p>

                    <div className="principle-entry-expand">
                      <div className="principle-entry-expand-inner">
                        <p className="principle-entry-summary">{step.summary}</p>
                        <p className="principle-entry-detail">{step.detail}</p>
                      </div>
                    </div>
                  </div>

                  <span className="principle-entry-icon" aria-hidden="true">
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
    </section>
  );
}
