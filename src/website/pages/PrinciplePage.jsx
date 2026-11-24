import { Link } from 'react-router-dom';
import RelatedPages from '../components/RelatedPages.jsx';
import { useEffect, useRef } from 'react';
import PageHeading from '../components/PageHeading.jsx';
import { useAccessibleTabs } from '../hooks/useAccessibleTabs.js';

const steps = [
  ['IDENTIFY', 'Understand genuine issues faced by advocates.'],
  ['REPRESENT', 'Place those issues before the appropriate authorities.'],
  ['FOLLOW-UP', 'Pursue action until meaningful progress is made.'],
  ['RESOLVE', 'Communicate outcomes transparently to members.'],
];
export default function PrinciplePage({ embedded = false }) {
  const Subheading = embedded ? 'h3' : 'h2';
  const { active, setActive, tabProps, panelProps } = useAccessibleTabs('principle');
  const section = useRef(null);
  const manual = useRef(false);
  useEffect(() => {
    if (!embedded) return;
    const media = matchMedia('(prefers-reduced-motion: reduce), (max-width: 760px)');
    let frame;
    const paint = () => {
      if (media.matches || manual.current) return;
      const bounds = section.current.getBoundingClientRect();
      if (bounds.top > 0 || bounds.bottom < innerHeight) return;
      const progress = Math.max(0, Math.min(1, -bounds.top / (bounds.height - innerHeight)));
      setActive(Math.min(3, Math.floor(progress * 4)));
    };
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    const resume = () => {
      manual.current = false;
    };
    addEventListener('scroll', scroll, { passive: true });
    addEventListener('wheel', resume, { passive: true });
    addEventListener('touchstart', resume, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', scroll);
      removeEventListener('wheel', resume);
      removeEventListener('touchstart', resume);
    };
  }, [embedded, setActive]);
  return (
    <>
      <section
        id="principle"
        className={embedded ? '' : 'principle-page route-section'}
        ref={section}
      >
        <div className="pin">
          <div className="wrap">
            <div className="head">
              <PageHeading embedded={embedded}>Four steps. No noise.</PageHeading>
            </div>
            <div className="stage">
              <div className="big" aria-hidden="true">
                {steps.map((_, index) => (
                  <span key={index} className={active === index ? 'on' : ''}>
                    {index + 1}
                  </span>
                ))}
              </div>
              <div className="copy">
                {steps.map(([title, description], index) => (
                  <div key={title} {...panelProps(index)}>
                    <Subheading>{title}</Subheading>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="track"
              role="tablist"
              aria-label="Working principle"
              onClick={() => {
                manual.current = true;
              }}
              onKeyDown={() => {
                manual.current = true;
              }}
            >
              <div className="fill" style={{ transform: `scaleX(${active / 3})` }} />
              {steps.map(([title], index) => (
                <button key={title} {...tabProps(index, 'tk')}>
                  <i>0{index + 1}</i>
                  {title}
                </button>
              ))}
            </div>
            <p className="ethos">
              NLF stands for constructive representation, collective action and practical solutions
              — not personal criticism or unnecessary disputes.
            </p>
          </div>
        </div>
      </section>
      {!embedded && (
        <>
          <section className="editorial-section">
            <div className="wrap">
              <div className="editorial-grid">
                <h2>
                  Make the issue clear.
                  <br />
                  Keep the purpose constructive.
                </h2>
                <div>
                  <p className="large-copy">
                    The working principle connects a genuine concern to a meaningful outcome.
                  </p>
                  <p>
                    When writing to the office, set out the issue, the authority concerned, any
                    action already taken and the outcome you are seeking. The office can then
                    consider the appropriate representation.
                  </p>
                </div>
              </div>
              <ol className="process-notes">
                <li>
                  <h3>Identify</h3>
                  <p>Start with the concern, the people affected and the relevant facts.</p>
                </li>
                <li>
                  <h3>Represent</h3>
                  <p>Make clear which authority or professional body the issue concerns.</p>
                </li>
                <li>
                  <h3>Follow-up</h3>
                  <p>Keep previous correspondence and the current position together.</p>
                </li>
                <li>
                  <h3>Resolve</h3>
                  <p>Record the outcome and any clarification still needed.</p>
                </li>
              </ol>
              <div className="actions">
                <Link className="btn btn-solid" to="/grievances">
                  Prepare a representation
                </Link>
                <Link className="text-link" to="/contact">
                  Speak with the office
                </Link>
              </div>
            </div>
          </section>
          <RelatedPages paths={['/grievances', '/structure', '/charter']} />
        </>
      )}
    </>
  );
}
