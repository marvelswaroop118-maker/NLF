import { useAccessibleTabs } from '../../hooks/useAccessibleTabs.js';
import PageHeading from '../../components/PageHeading.jsx';
import colonnadeImg from '../../../../assets/calcutta-high-court-01.jpg';
import { Link } from 'react-router-dom';
import { principleContent as content } from './principle.content.js';
import './principle.css';

// Generate deterministic "Many into One" square matrix without inline layout randomness
const SCATTER_LEFT = [
  [18, 16, 0],
  [54, 42, 1],
  [28, 78, 0],
  [82, 24, 1],
  [96, 68, 0],
  [124, 38, 0],
  [148, 84, 1],
  [170, 22, 0],
  [194, 58, 1],
  [218, 86, 0],
  [64, 96, 1],
  [112, 14, 1],
  [158, 50, 0],
  [234, 34, 1],
  [256, 70, 0],
  [274, 18, 1],
  [292, 54, 0],
  [308, 86, 1],
];

const BAND_CENTER = [];
for (let c = 0; c < 14; c += 1) {
  for (let r = 0; r < 3; r += 1) {
    BAND_CENTER.push([360 + c * 18, 42 + r * 16]);
  }
}

const ORDER_RIGHT = [];
for (let c = 0; c < 14; c += 1) {
  for (let r = 0; r < 3; r += 1) {
    ORDER_RIGHT.push([660 + c * 22, 24 + r * 30]);
  }
}

export default function Principle({ embedded = false }) {
  const { active, setActive, tabProps, panelProps } = useAccessibleTabs('principle');
  const Heading = embedded ? 'h3' : 'h2';

  return (
    <section id="principle" className="principle-section route-section">
      <div className="wrap">
        <div className="axis-row principle-header-row rv">
          <PageHeading embedded={embedded}>{content.title}</PageHeading>
          <div className="principle-lead-block">
            <p className="lede principle-intro-text">{content.introduction}</p>
            <p className="principle-ethos-line">{content.ethos}</p>
          </div>
        </div>

        <figure className="principle-diagram-wrap rv" aria-hidden="true">
          <svg
            className="principle-diagram"
            viewBox="0 0 980 120"
            preserveAspectRatio="xMidYMid meet"
          >
            {SCATTER_LEFT.map(([x, y, tone], idx) => (
              <rect
                key={`s-${idx}`}
                x={x}
                y={y}
                width="10"
                height="10"
                fill={tone ? '#5f738f' : '#354965'}
              />
            ))}
            {BAND_CENTER.map(([x, y], idx) => (
              <rect key={`b-${idx}`} x={x} y={y} width="10" height="10" fill="#faf9f6" />
            ))}
            {ORDER_RIGHT.map(([x, y], idx) => (
              <rect key={`o-${idx}`} x={x} y={y} width="10" height="10" fill="#c59b27" />
            ))}
          </svg>
        </figure>

        <div className="principle-split rv">
          <figure className="principle-photo-col">
            <img
              src={colonnadeImg}
              alt="Carved stone colonnade along the Calcutta High Court verandah"
              width="1920"
              height="2575"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="principle-workspace">
            <div className="principle-steps" role="tablist" aria-label={content.tabsLabel}>
              {content.steps.map((step, index) => (
                <button key={step.title} {...tabProps(index, 'principle-step')}>
                  {step.title}
                </button>
              ))}
            </div>

            {content.steps.map((step, index) => (
              <div key={step.title} {...panelProps(index, 'principle-panel')}>
                <Heading className="principle-stage-title">{step.title}</Heading>
                <p className="principle-stage-desc">{step.description}</p>
                <div className="principle-guidance-box">
                  <strong className="principle-guidance-label">{content.guidanceLabel}</strong>
                  <p>{step.guidance}</p>
                </div>
              </div>
            ))}

            <div className="principle-controls">
              <button
                type="button"
                className="principle-next-btn"
                onClick={() => {
                  const next = (active + 1) % content.steps.length;
                  setActive(next);
                  document.getElementById(tabProps(next).id)?.focus({ preventScroll: true });
                }}
              >
                {active === content.steps.length - 1 ? content.steps[0].title : content.nextLabel} →
              </button>
              <Link to={content.action.to} className="btn btn-gold">
                {content.action.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
