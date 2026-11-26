import './structure.css';
import { useEffect, useRef, useState } from 'react';
import PageHeading from '../../components/PageHeading.jsx';
import { useAccessibleTabs } from '../../hooks/useAccessibleTabs.js';
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
  const { active, tabProps, panelProps } = useAccessibleTabs('structure', { vertical: true });
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);
  const Subheading = embedded ? 'h3' : 'h2';

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

  const currentTier = content.tiers[active] || content.tiers[0];

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
    </section>
  );
}
