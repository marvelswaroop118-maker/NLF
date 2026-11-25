import { Link } from 'react-router-dom';
import { PortalExtras } from '../components/StandaloneExtras.jsx';
import PageHeading from '../components/PageHeading.jsx';
import { useAccessibleTabs } from '../hooks/useAccessibleTabs.js';
import PreviewRsvp from '../components/PreviewRsvp.jsx';
import madrasCourtImg from '../../../assets/chennai-high-court.jpg';
import '../home/portal/portal.css';

export default function PortalPage({ embedded = false }) {
  const Subheading = embedded ? 'h3' : 'h2';
  const { tabProps, panelProps } = useAccessibleTabs('portal');

  return (
    <>
      <section id="portal" className="portal-section route-section">
        <div className="wrap">
          <div className="axis-row portal-header-row rv">
            <PageHeading embedded={embedded}>Welfare &amp; schemes, in one place.</PageHeading>
            <p className="lede">
              Explore the planned member portal for grievances, welfare tracking, learning, and
              committee contacts. Below is an interactive preview with illustrative sample entries.
            </p>
          </div>

          <div className="portal-split rv">
            <figure className="portal-plate">
              <img
                src={madrasCourtImg}
                alt="Historic red sandstone domes of the Madras High Court in Chennai"
                width="1920"
                height="1285"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                Planned advocate portal preview — interface only; live services launch upon
                verification rollout.
              </figcaption>
            </figure>

            <div className="portal-workspace">
              <div className="portal-tabs" role="tablist" aria-label="Member portal preview">
                <button {...tabProps(0, 'portal-tab-btn')}>Grievance &amp; Protection</button>
                <button {...tabProps(1, 'portal-tab-btn')}>Welfare &amp; Schemes</button>
                <button {...tabProps(2, 'portal-tab-btn')}>CLE &amp; Mentorship</button>
                <button {...tabProps(3, 'portal-tab-btn')}>Directory &amp; Circulars</button>
              </div>

              <div {...panelProps(0, 'portal-panel')}>
                <div className="portal-panel-head">
                  <Subheading>Grievance &amp; Protection Desk</Subheading>
                  <Link className="portal-topic-link" to="/grievances">
                    Explore this topic →
                  </Link>
                </div>
                <p className="portal-panel-note">
                  Confidential submission and four-stage tracking: Identified → Represented →
                  Follow-up → Resolved.
                </p>
                <div className="portal-rows">
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">Chamber allocation request</span>
                      <span className="portal-row-sub">Sample entry · Bar Unit</span>
                    </div>
                    <span className="portal-status-text">Follow-up</span>
                  </div>
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">Welfare fund claim delay</span>
                      <span className="portal-row-sub">Sample entry · State Committee</span>
                    </div>
                    <span className="portal-status-text">Represented</span>
                  </div>
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">Courtroom conduct representation</span>
                      <span className="portal-row-sub">Sample entry · District Committee</span>
                    </div>
                    <span className="portal-status-text">Resolved</span>
                  </div>
                </div>
              </div>

              <div {...panelProps(1, 'portal-panel')}>
                <div className="portal-panel-head">
                  <Subheading>Welfare &amp; Schemes Hub</Subheading>
                  <Link className="portal-topic-link" to="/welfare">
                    Explore this topic →
                  </Link>
                </div>
                <p className="portal-panel-note">
                  Eligibility guidance and application trackers, subject to applicable Bar Council
                  and scheme rules.
                </p>
                <div className="portal-rows">
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">Health Card</span>
                      <span className="portal-row-sub">Eligibility checklist</span>
                    </div>
                    <span className="portal-status-text">Review</span>
                  </div>
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">Group Insurance</span>
                      <span className="portal-row-sub">Application tracker</span>
                    </div>
                    <span className="portal-status-text">Review</span>
                  </div>
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">Pension advocacy &amp; housing</span>
                      <span className="portal-row-sub">Policy updates &amp; representations</span>
                    </div>
                    <span className="portal-status-text">Updates</span>
                  </div>
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">Emergency Assistance</span>
                      <span className="portal-row-sub">Priority support request</span>
                    </div>
                    <span className="portal-status-text">Enquire</span>
                  </div>
                </div>
              </div>

              <div {...panelProps(2, 'portal-panel')}>
                <div className="portal-panel-head">
                  <Subheading>CLE &amp; Mentorship Calendar</Subheading>
                  <Link className="portal-topic-link" to="/learning">
                    Explore this topic →
                  </Link>
                </div>
                <p className="portal-panel-note">
                  Sample training schedule preview; toggle RSVP to test the planned interface.
                </p>
                <div className="portal-rows">
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">Continuing Legal Education workshop</span>
                      <span className="portal-row-sub">Sample programme</span>
                    </div>
                    <PreviewRsvp />
                  </div>
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">
                        Advocates’ rights &amp; ethics seminar
                      </span>
                      <span className="portal-row-sub">Sample programme</span>
                    </div>
                    <PreviewRsvp />
                  </div>
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">Senior–junior mentorship pairing</span>
                      <span className="portal-row-sub">Junior Advocate support</span>
                    </div>
                    <PreviewRsvp />
                  </div>
                </div>
              </div>

              <div {...panelProps(3, 'portal-panel')}>
                <div className="portal-panel-head">
                  <Subheading>Unit Directory &amp; Circulars</Subheading>
                  <Link className="portal-topic-link" to="/directory">
                    Explore this topic →
                  </Link>
                </div>
                <p className="portal-panel-note">
                  Published office bearers, State &amp; District committees, and formal circulars.
                </p>
                <div className="portal-rows">
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">National office bearers</span>
                      <span className="portal-row-sub">Published contact desk</span>
                    </div>
                    <span className="portal-status-text">Directory</span>
                  </div>
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">State &amp; District committees</span>
                      <span className="portal-row-sub">Unit enquiry desk</span>
                    </div>
                    <span className="portal-status-text">Directory</span>
                  </div>
                  <div className="portal-row">
                    <div>
                      <span className="portal-row-title">Official representations archive</span>
                      <span className="portal-row-sub">Brochures and circulars</span>
                    </div>
                    <span className="portal-status-text">Archive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {!embedded && <PortalExtras />}
    </>
  );
}
