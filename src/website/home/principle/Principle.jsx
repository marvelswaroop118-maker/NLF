import './principle.css';
import { useEffect, useRef, useState } from 'react';
import PageHeading from '../../components/PageHeading.jsx';
import { useAccessibleTabs } from '../../hooks/useAccessibleTabs.js';
import SweepButton from '../shared/SweepButton.jsx';
import { principleContent as content } from './principle.content.js';

export default function Principle({ embedded = false }) {
  const { active, setActive, tabProps, panelProps } = useAccessibleTabs('principle');
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
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Desktop embedded scroll-scrub drives 1 -> 2 -> 3 -> 4 cleanly as the user scrolls.
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
      setActive(Math.min(content.steps.length - 1, Math.floor(progress * content.steps.length)));
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

  // On mobile or standalone route (where section is not pinned), gently cycle numerals when visible.
  useEffect(() => {
    if (!inView || manualRef.current) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopPinned = embedded && window.matchMedia('(min-width: 761px)').matches;
    if (reduced || desktopPinned) return undefined;

    const timer = window.setInterval(() => {
      if (!manualRef.current) {
        setActive((prev) => (prev + 1) % content.steps.length);
      }
    }, 3400);

    return () => window.clearInterval(timer);
  }, [embedded, inView, setActive]);

  const handleTrackInteract = (index, originalHandler) => (event) => {
    manualRef.current = true;
    originalHandler?.(event);
    if (typeof index === 'number') {
      setActive(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="principle"
      className={`principle-section route-section${revealed ? ' is-revealed' : ''}${
        embedded ? '' : ' principle-standalone'
      }`}
    >
      <div className="principle-pin">
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

        <div className="wrap principle-inner">
          <div className="principle-header">
            <div className="principle-title-col">
              <PageHeading embedded={embedded}>{content.title}</PageHeading>
              <div className="principle-accent-rule" aria-hidden="true" />
            </div>

            <div className="principle-ethos-col">
              <p className="principle-ethos-copy">{content.ethos}</p>
              <SweepButton to={content.cta.to} primary>
                {content.cta.label}
              </SweepButton>
            </div>
          </div>

          <div className="principle-stage">
            <div className="principle-numeral" aria-hidden="true">
              {content.steps.map((step, index) => (
                <span
                  key={step.num}
                  className={
                    active === index ? 'is-current' : index < active ? 'is-past' : 'is-upcoming'
                  }
                >
                  {step.num}
                </span>
              ))}
            </div>

            <div className="principle-copy">
              {content.steps.map((step, index) => {
                const panel = panelProps(index, 'principle-panel');
                const isCurrent = active === index;
                return (
                  <div
                    key={step.label}
                    {...panel}
                    className={`${panel.className}${isCurrent ? ' is-current' : ''}`}
                  >
                    <p className="principle-step-kicker">
                      Step {step.num} of 0{content.steps.length}
                    </p>
                    <Subheading>{step.label}</Subheading>
                    <p className="principle-step-summary">{step.summary}</p>
                    <p className="principle-step-detail">{step.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="principle-track"
            role="tablist"
            aria-label="Working principle"
            onKeyDown={handleTrackInteract()}
          >
            <div className="principle-track-rail" aria-hidden="true">
              <div
                className="principle-track-fill"
                style={{ transform: `scaleX(${active / (content.steps.length - 1)})` }}
              />
            </div>

            {content.steps.map((step, index) => {
              const props = tabProps(index, 'principle-node');
              const isReached = index <= active;
              const isCurrent = index === active;
              return (
                <button
                  key={step.label}
                  {...props}
                  className={`${props.className}${isReached ? ' is-reached' : ''}${
                    isCurrent ? ' is-current' : ''
                  }`}
                  onClick={handleTrackInteract(index, props.onClick)}
                >
                  <span className="principle-node-badge" aria-hidden="true">
                    {step.num}
                  </span>
                  <span className="principle-node-label">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
