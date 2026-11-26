import './leadership.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FounderPortrait from '../../components/FounderPortrait.jsx';
import PageHeading from '../../components/PageHeading.jsx';
import SweepButton from '../shared/SweepButton.jsx';
import LazyAmbientBg from '../shared/LazyAmbientBg.jsx';
import Waves from '../shared/Waves.jsx';
import { leadershipContent as content } from './leadership.content.js';

export default function Leadership({ embedded = false }) {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className={`leadership-section route-section${revealed ? ' is-revealed' : ''}`}
    >
      <div className="leadership-ambient-bg" aria-hidden="true">
        <div className="leadership-warm-wash" />
        <LazyAmbientBg>
          <Waves
            lightMode
            backgroundColor="transparent"
            lineColor="#c78b30"
            accentColor="#9e6208"
            spacing={36}
            lineWidth={0.8}
            amplitude={16}
            speed={0.46}
            twist={0.8}
            rotation={-8}
            opacity={0.28}
            fade={0.42}
            mouseRadius={130}
          />
        </LazyAmbientBg>
      </div>

      <div className="wrap leadership-layout">
        <figure className="leadership-portrait-card">
          <div className="leadership-portrait-frame">
            <FounderPortrait className="leadership-portrait-img" />
          </div>
          <figcaption className="leadership-nameplate">
            <strong>{content.name}</strong>
            <span>{content.role}</span>
          </figcaption>
        </figure>

        <div className="leadership-copy">
          <PageHeading embedded={embedded}>{content.title}</PageHeading>
          <div className="leadership-accent-rule" aria-hidden="true" />

          <blockquote className="leadership-quote">{content.quote}</blockquote>

          <div className="leadership-meta-grid">
            {content.highlights.map((item) => (
              <div className="leadership-meta-item" key={item.label}>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="leadership-actions">
            <SweepButton to={content.primaryCta.to}>{content.primaryCta.label}</SweepButton>
            <Link className="leadership-text-link" to={content.secondaryCta.to}>
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
