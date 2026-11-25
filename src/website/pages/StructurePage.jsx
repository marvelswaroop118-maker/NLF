import { StructureExtras } from '../components/StandaloneExtras.jsx';
import PageHeading from '../components/PageHeading.jsx';
import { useAccessibleTabs } from '../hooks/useAccessibleTabs.js';
import libraryImg from '../../../assets/indiana-supreme-court-law-library-rare-books.jpg';
import '../home/structure/structure.css';

const TIERS = [
  {
    name: 'National Committee',
    scope: 'Pan-India',
    heading: 'One united voice.',
    body: 'The national committee carries the collective voice of advocates to Governments, Bar Councils, and national authorities, and sets the direction of the federation.',
  },
  {
    name: 'State Committees',
    scope: 'High Courts & States',
    heading: 'Closer to the High Courts.',
    body: 'State committees take up service-related and welfare grievances with State Governments and State Bar Councils, supporting every district committee.',
  },
  {
    name: 'District Committees',
    scope: 'District Courts',
    heading: 'Regional coordination.',
    body: 'District committees connect advocates across courts within each judicial district and escalate local court-premise concerns upward.',
  },
  {
    name: 'Bar Association / Bar Unit',
    scope: 'Foundation level',
    heading: 'Where representation begins.',
    body: 'Every representation originates with an advocate at a Bar Unit. It is heard locally first, and carried democratically upward through every tier.',
  },
];

const VALUES = [
  'Unity and mutual respect',
  'Dignity and professional independence',
  'Transparency and accountability',
  'Non-partisanship and constructive engagement',
  'Peaceful, lawful, and democratic action',
];

export default function StructurePage({ embedded = false }) {
  const Subheading = embedded ? 'h3' : 'h2';
  const { tabProps, panelProps } = useAccessibleTabs('structure', { vertical: true });

  return (
    <>
      <section id="structure" className="structure-section route-section">
        <div className="wrap">
          <div className="axis-row structure-header-row rv">
            <PageHeading embedded={embedded}>Democratic at every tier.</PageHeading>
            <p className="lede">
              Advocates are organised and represented through committees at four levels. Select a
              level to read its mandate.
            </p>
          </div>

          <div className="structure-layout rv">
            <figure className="structure-photo-frame">
              <img
                src={libraryImg}
                alt="Leather and linen bound law volumes shelved inside a judicial library"
                width="1920"
                height="2560"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                Constitutional representation from local Bar Units to national policy.
              </figcaption>
            </figure>

            <div className="structure-interactive">
              <div
                className="structure-tiers"
                role="tablist"
                aria-label="Organisational levels"
                aria-orientation="vertical"
              >
                {TIERS.map((tier, index) => (
                  <button key={tier.name} {...tabProps(index, 'structure-tier-btn')}>
                    <span>{tier.name}</span>
                    <span className="structure-tier-scope">{tier.scope}</span>
                  </button>
                ))}
              </div>

              {TIERS.map((tier, index) => (
                <div key={tier.name} {...panelProps(index, 'structure-panel')}>
                  <Subheading>{tier.heading}</Subheading>
                  <p>{tier.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="structure-values-band rv">
            <h3 className="structure-values-title">Founding values of the federation</h3>
            <ul className="structure-values-list">
              {VALUES.map((val) => (
                <li key={val}>{val}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {!embedded && <StructureExtras />}
    </>
  );
}
