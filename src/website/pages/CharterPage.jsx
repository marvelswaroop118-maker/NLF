import { CharterExtras } from '../components/StandaloneExtras.jsx';
import PageHeading from '../components/PageHeading.jsx';
import { useAccessibleTabs } from '../hooks/useAccessibleTabs.js';
export default function CharterPage({ embedded = false }) {
  const Subheading = embedded ? 'h3' : 'h2';
  const { tabProps, panelProps } = useAccessibleTabs('charter');
  return (
    <>
      <section id="aims" className="pad route-section">
        <div className="wrap">
          <div className="sec-head rv">
            <PageHeading embedded={embedded}>What we stand for.</PageHeading>
            <p className="lede">
              Seven aims and nine constitutional objects, built around one commitment: the welfare,
              dignity, safety and rights of every advocate.
            </p>
          </div>
          <div className="tabs rv" role="tablist" aria-label="Federation charter">
            <button role="tab" {...tabProps(0)}>
              Our 7 Core Aims
            </button>
            <button role="tab" {...tabProps(1)}>
              Constitutional Objects
            </button>
          </div>
          <div className="panels rv" style={{ '--d': '1' }}>
            <div {...panelProps(0, 'panel')}>
              <div className="aims">
                <article className="aim">
                  <div className="n">
                    01
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3l8 3v6c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V6z" />
                      <path d="M8.5 12l2.5 2.5 4.5-5" />
                    </svg>
                  </div>
                  <Subheading>Safeguard &amp; Rights</Subheading>
                  <p>To safeguard the welfare, dignity and rights of advocates.</p>
                </article>
                <article className="aim">
                  <div className="n">
                    02
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v6M12 16.5v.5" />
                    </svg>
                  </div>
                  <Subheading>Safety &amp; Protection</Subheading>
                  <p>
                    To protect advocates from threats, harassment and unfair treatment, and promote
                    their safety and security.
                  </p>
                </article>
                <article className="aim">
                  <div className="n">
                    03
                    <svg viewBox="0 0 24 24">
                      <circle cx="8" cy="9" r="3" />
                      <circle cx="16" cy="9" r="3" />
                      <path d="M2.5 19c.5-3 2.8-4.5 5.5-4.5s5 1.5 5.500 4.500M13 15c.9-.4 1.900-.5 3-.5 2.700 0 5 1.500 5.500 4.500" />
                    </svg>
                  </div>
                  <Subheading>Fraternity &amp; Unity</Subheading>
                  <p>
                    To promote unity, solidarity and mutual cooperation among members of the legal
                    fraternity.
                  </p>
                </article>
                <article className="aim">
                  <div className="n">
                    04
                    <svg viewBox="0 0 24 24">
                      <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
                    </svg>
                  </div>
                  <Subheading>Courts &amp; Chambers</Subheading>
                  <p>
                    To improve working conditions, chambers, infrastructure and professional
                    facilities for advocates.
                  </p>
                </article>
                <article className="aim">
                  <div className="n">
                    05
                    <svg viewBox="0 0 24 24">
                      <path d="M12 20s-7.500-4.400-7.500-10A4.500 4.500 0 0112 7a4.500 4.500 0 017.500 3c0 5.600-7.500 10-7.500 10z" />
                    </svg>
                  </div>
                  <Subheading>Social Security</Subheading>
                  <p>
                    To advance social security, healthcare, pension and welfare benefits for
                    advocates and their families.
                  </p>
                </article>
                <article className="aim">
                  <div className="n">
                    06
                    <svg viewBox="0 0 24 24">
                      <path d="M12 20V10M12 10c0-3 2-5 5-5 0 3-2 5-5 5zM12 14c0-2.500-1.800-4-4.500-4 0 2.500 1.800 4 4.500 4z" />
                    </svg>
                  </div>
                  <Subheading>Young Advocates</Subheading>
                  <p>To support young and deserving advocates in their professional development.</p>
                </article>
                <article className="aim commit">
                  <div>
                    <Subheading>A strong voice, at every level.</Subheading>
                  </div>
                  <p>
                    To provide a strong, collective and constructive voice for advocates at every
                    level. A united, independent and advocate-centred platform.
                  </p>
                </article>
              </div>
            </div>
            <div {...panelProps(1, 'panel')}>
              <div className="objs">
                <div className="obj">
                  <p>
                    To organise and represent advocates through democratic committees at National,
                    State, District and Bar Unit levels.
                  </p>
                </div>
                <div className="obj">
                  <p>
                    To take up professional, welfare and service-related grievances with
                    Governments, Bar Councils, Bar Associations and other authorities.
                  </p>
                </div>
                <div className="obj">
                  <p>
                    To advocate practical welfare measures, including health cards, pension, housing
                    support, insurance and emergency assistance, subject to applicable rules and
                    eligibility.
                  </p>
                </div>
                <div className="obj">
                  <p>
                    To work for improved access to Welfare Fund benefits and fair, transparent
                    welfare schemes.
                  </p>
                </div>
                <div className="obj">
                  <p>
                    To promote adequate chambers, libraries, basic amenities and infrastructure in
                    court premises.
                  </p>
                </div>
                <div className="obj">
                  <p>
                    To organise legal education, training, seminars, workshops and continuing
                    professional development programmes.
                  </p>
                </div>
                <div className="obj">
                  <p>
                    To provide or facilitate legal aid, guidance, mentoring and support for young
                    advocates.
                  </p>
                </div>
                <div className="obj">
                  <p>
                    To promote awareness of advocates’ rights, professional ethics, access to
                    justice and the rule of law.
                  </p>
                </div>
                <div className="obj">
                  <p>
                    To pursue lawful and peaceful representations, campaigns and reforms for the
                    betterment of the legal profession.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {!embedded && <CharterExtras />}
    </>
  );
}
