import PageHeading from '../../components/PageHeading.jsx';
import { useAccessibleTabs } from '../../hooks/useAccessibleTabs.js';
import { charterContent as content } from './about.content.jsx';
import courtPhoto from '../../../../assets/high-court-of-telangana-state-89002.jpg';
import crestImg from '../../../../assets/nlf-crest.webp';
import { Link } from 'react-router-dom';
import './about.css';

export default function About({ embedded = false }) {
  const { tabProps, panelProps } = useAccessibleTabs('charter');

  return (
    <section id="aims" className="charter-section route-section">
      <div className="wrap">
        <div className="axis-row charter-header-row rv">
          <PageHeading embedded={embedded}>{content.title}</PageHeading>
          <p className="lede charter-lead">{content.description}</p>
        </div>

        <div className="charter-mosaic rv">
          <figure className="charter-photo-tile">
            <img
              src={courtPhoto}
              alt="Domes of the High Court of Telangana rising above court trees"
              width="1920"
              height="1440"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="charter-photo-inset">{content.insetNote}</figcaption>
          </figure>

          <div className="charter-dossier-tile">
            <img
              className="charter-dossier-crest"
              src={crestImg}
              alt="National Lawyers Federation emblem"
              width="96"
              height="96"
              loading="lazy"
              decoding="async"
            />
            <dl className="charter-dossier-stats">
              {content.dossierStats.map((stat) => (
                <div key={stat.label} className="charter-stat-cell">
                  <dd>{stat.value}</dd>
                  <dt>{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="charter-tabs-row">
          <div className="charter-tabs-spacer" aria-hidden="true" />
          <div className="charter-tabs" role="tablist" aria-label="Federation charter">
            {content.tabs.map((label, index) => (
              <button key={label} {...tabProps(index, 'charter-tab')}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {[content.aims, content.objects].map((items, index) => (
          <div key={content.tabs[index]} {...panelProps(index, 'charter-ledger')}>
            <ol className="charter-list">
              {items.map((item) => (
                <li key={item.title} className="charter-row">
                  <h3 className="charter-row-title">{item.title}</h3>
                  <p className="charter-row-body">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}

        <div className="axis-row charter-footer-row">
          <div aria-hidden="true" />
          <div className="charter-footer-actions">
            <Link to={content.brochure.to} className="btn btn-solid">
              {content.brochure.label}
            </Link>
            <Link to="/leadership" className="text-link">
              Meet the Founder President
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
