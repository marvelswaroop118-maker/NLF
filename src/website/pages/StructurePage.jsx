import { StructureExtras } from '../components/StandaloneExtras.jsx';
import PageHeading from '../components/PageHeading.jsx';
import { useAccessibleTabs } from '../hooks/useAccessibleTabs.js';
export default function StructurePage({ embedded = false }) {
  const Subheading = embedded ? 'h3' : 'h2';
  const { tabProps, panelProps } = useAccessibleTabs('structure', { vertical: true });
  return (
    <>
      <section id="structure" className="pad route-section">
        <div className="wrap">
          <div className="sec-head rv">
            <PageHeading embedded={embedded}>Democratic at every tier.</PageHeading>
            <p className="lede">
              Advocates are organised and represented through committees at four levels. Select a
              tier to explore.
            </p>
          </div>
          <div className="struct">
            <div
              className="tiers rv"
              id="tiers"
              role="tablist"
              aria-label="Organisational levels"
              aria-orientation="vertical"
            >
              <button className="tier" role="tab" style={{ '--w': '52%' }} {...tabProps(0, 'tier')}>
                <small>TIER 1</small>
                <b>National</b>
              </button>
              <button className="tier" role="tab" style={{ '--w': '70%' }} {...tabProps(1, 'tier')}>
                <small>TIER 2</small>
                <b>State</b>
              </button>
              <button className="tier" role="tab" style={{ '--w': '86%' }} {...tabProps(2, 'tier')}>
                <small>TIER 3</small>
                <b>District</b>
              </button>
              <button
                className="tier"
                role="tab"
                style={{ '--w': '100%' }}
                {...tabProps(3, 'tier')}
              >
                <small>TIER 4</small>
                <b>Bar Association / Bar Unit</b>
              </button>
            </div>
            <div className="tdetail rv" style={{ '--d': '1' }} id="tdetail">
              <div {...panelProps(0)}>
                <Subheading>One united voice.</Subheading>
                <p>
                  The national committee carries the collective voice of advocates to Governments,
                  Bar Councils and other authorities, and sets the direction of the federation.
                </p>
              </div>
              <div {...panelProps(1)}>
                <Subheading>Closer to the courts.</Subheading>
                <p>
                  State committees take up service-related and welfare grievances with State
                  Governments and Bar Councils, and support every district below them.
                </p>
              </div>
              <div {...panelProps(2)}>
                <Subheading>Local strength.</Subheading>
                <p>
                  District committees connect advocates across courts in a district and bring
                  regional issues forward to the State level.
                </p>
              </div>
              <div {...panelProps(3)}>
                <Subheading>Where it begins.</Subheading>
                <p>
                  Every issue starts with an advocate at a Bar Unit. Here it is heard first, and
                  representation flows upward from here.
                </p>
              </div>
            </div>
          </div>
          <div className="values rv">
            <div className="val">
              <svg viewBox="0 0 24 24">
                <path d="M3 12h4l3 3 4-6 3 3h4" />
                <path d="M3 18h18" />
              </svg>
              <p>Unity &amp; mutual respect</p>
            </div>
            <div className="val">
              <svg viewBox="0 0 24 24">
                <path d="M12 3l2.500 5.500L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.500-.5z" />
              </svg>
              <p>Dignity &amp; professional independence</p>
            </div>
            <div className="val">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
              </svg>
              <p>Transparency &amp; accountability</p>
            </div>
            <div className="val">
              <svg viewBox="0 0 24 24">
                <path d="M12 3v18M5 7h14M5 7l-3 8a3 3 0 006 0zM19 7l-3 8a3 3 0 006 0z" />
              </svg>
              <p>Non-partisanship &amp; constructive engagement</p>
            </div>
            <div className="val">
              <svg viewBox="0 0 24 24">
                <path d="M12 21c-4-3-7-6-7-10a4 4 0 017-2.500A4 4 0 0119 11c0 4-3 7-7 10z" />
                <path d="M8 11h8" />
              </svg>
              <p>Peaceful, lawful &amp; democratic action</p>
            </div>
          </div>
        </div>
      </section>
      {!embedded && <StructureExtras />}
    </>
  );
}
