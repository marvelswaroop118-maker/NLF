import './about.css';
import { useEffect, useRef, useState } from 'react';
import PageHeading from '../../components/PageHeading.jsx';
import { useAccessibleTabs } from '../../hooks/useAccessibleTabs.js';
import { charterContent as content } from './about.content.js';
import SweepButton from '../shared/SweepButton.jsx';

export default function About({ embedded = false }) {
  const { tabProps, panelProps } = useAccessibleTabs('charter');
  const [selectedTab, setSelectedTab] = useState(0);
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

  // Track the leading docked card during mobile scroll-stack scrolling so the
  // dark navy + amber gold active state follows the front card smoothly.
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
        const stickyTop = 88 + Math.min(i, 7) * 9;
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
  }, [selectedTab]);

  const handleTabClick = (index, originalOnClick) => {
    originalOnClick?.();
    setSelectedTab(index);
    setActiveIndex(0);
    cardRefs.current = [];
  };

  const handleToggleItem = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      ref={sectionRef}
      id="aims"
      className={`charter-section route-section${revealed ? ' is-revealed' : ''}`}
    >
      <div className="charter-ambient-bg" aria-hidden="true">
        <div className="charter-warm-wash" />
        <svg
          className="charter-silk-arcs charter-silk-arcs-bl"
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
          <path
            d="M40 430C180 390 330 315 445 180"
            stroke="currentColor"
            strokeWidth="0.9"
            opacity="0.45"
          />
        </svg>
        <svg
          className="charter-silk-arcs charter-silk-arcs-tr"
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

      <div className="wrap charter-layout">
        <div className="charter-intro">
          <PageHeading embedded={embedded}>{content.title}</PageHeading>
          <div className="charter-accent-rule" aria-hidden="true" />
          <p className="lede">{content.description}</p>
          <div className="charter-cta-wrap">
            <SweepButton to={content.brochure.to}>{content.brochure.label}</SweepButton>
          </div>
        </div>

        <div className="charter-reader">
          <div className="charter-tabs-bar">
            <div className="charter-tabs" role="tablist" aria-label="Federation charter">
              {content.tabs.map((label, index) => {
                const props = tabProps(index);
                return (
                  <button
                    key={label}
                    {...props}
                    onClick={(event) => handleTabClick(index, () => props.onClick(event))}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="charter-tab-meta" aria-live="polite">
              <span className="charter-meta-divider" aria-hidden="true" />
              <span>{content.tabCounts[selectedTab]}</span>
            </div>
          </div>

          {[content.aims, content.objects].map((items, panelIdx) => {
            const panel = panelProps(panelIdx, 'charter-panel');
            const isCurrentPanel = !panel.hidden;
            return (
              <div key={content.tabs[panelIdx]} {...panel}>
                {items.map((item, i) => {
                  const isActive = isCurrentPanel && activeIndex === i;
                  return (
                    <article
                      key={item.title}
                      ref={(node) => {
                        if (isCurrentPanel) cardRefs.current[i] = node;
                      }}
                      className={`charter-entry${isActive ? ' is-active' : ''}`}
                      style={{
                        '--stack-index': i,
                        '--reveal-delay': `${i * 45}ms`,
                      }}
                    >
                      <div className="charter-entry-num">{item.num}</div>
                      <span className="charter-entry-sep" aria-hidden="true" />

                      <div className="charter-entry-main">
                        <div className="charter-entry-head">
                          <h3>
                            <button
                              type="button"
                              className="charter-entry-trigger"
                              aria-expanded={isActive}
                              onClick={() => handleToggleItem(i)}
                            >
                              {item.title}
                            </button>
                          </h3>
                          <span className="charter-mobile-count">
                            {item.num} / {String(items.length).padStart(2, '0')}
                          </span>
                        </div>

                        <p className="charter-entry-preview">{item.body}</p>

                        <div className="charter-entry-expand">
                          <div className="charter-entry-expand-inner">
                            <p className="charter-entry-full">{item.body}</p>
                          </div>
                        </div>
                      </div>

                      <span className="charter-entry-icon" aria-hidden="true">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
