import './principle.css';
import { useEffect, useRef, useState } from 'react';
import PageHeading from '../../components/PageHeading.jsx';
import { useAccessibleTabs } from '../../hooks/useAccessibleTabs.js';
import SweepButton from '../shared/SweepButton.jsx';
import LazyAmbientBg from '../shared/LazyAmbientBg.jsx';
import Threads from '../shared/Threads.jsx';
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
      {embedded && (
        <>
          <span className="home-snap-waypoint" style={{ top: '42svh' }} aria-hidden="true" />
          <span className="home-snap-waypoint" style={{ top: '78svh' }} aria-hidden="true" />
          <span className="home-snap-waypoint" style={{ top: '114svh' }} aria-hidden="true" />
        </>
      )}
      <div className="principle-pin">
        <div className="principle-ambient-bg" aria-hidden="true">
          <div className="principle-glow-wash" />
          <LazyAmbientBg>
            <Threads
              color="#f09d1c"
              accentColor="#ffb338"
              lineCount={46}
              thickness={0.62}
              amplitude={1.3}
              distance={0.3}
              speed={0.48}
              waves={1.05}
              fray={0.45}
              angle={18}
              opacity={0.36}
              fade={0.35}
              brightness={1.15}
              enableMouseInteraction
            />
          </LazyAmbientBg>
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
