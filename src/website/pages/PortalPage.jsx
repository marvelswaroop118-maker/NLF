import { Link } from 'react-router-dom';
import { PortalExtras } from '../components/StandaloneExtras.jsx';
import PageHeading from '../components/PageHeading.jsx';
import { useAccessibleTabs } from '../hooks/useAccessibleTabs.js';
import PreviewRsvp from '../components/PreviewRsvp.jsx';
export default function PortalPage({ embedded = false }) {
  const Subheading = embedded ? 'h3' : 'h2';
  const { tabProps, panelProps } = useAccessibleTabs('portal');
  return (
    <>
      <section id="portal" className="pad route-section">
        <div className="wrap">
          <div className="sec-head rv">
            <PageHeading embedded={embedded}>
              Welfare &amp; Schemes,
              <br />
              in one place.
            </PageHeading>
            <p className="lede">
              Explore the planned member dashboard for grievances, welfare, learning and the unit
              directory. This is an interactive preview with sample data.
            </p>
          </div>
          <div className="win rv" id="win">
            <div className="wbar">
              <i></i>
              <i></i>
              <i></i>
              <span>nlf · member portal</span>
            </div>
            <div className="wbody">
              <div className="side" id="side" role="tablist" aria-label="Member portal preview">
                <button {...tabProps(0)}>Grievance &amp; Protection</button>
                <button {...tabProps(1)}>Welfare &amp; Schemes</button>
                <button {...tabProps(2)}>CLE &amp; Mentorship</button>
                <button {...tabProps(3)}>Directory &amp; Circulars</button>
              </div>
              <div className="main">
                <div className="pp" id="pp-g" {...panelProps(0, 'pp')}>
                  <Subheading>Grievance &amp; Protection Desk</Subheading>
                  <Link className="portal-topic-link" to="/grievances">
                    Explore this topic
                  </Link>
                  <p className="s">Submit confidentially. Track every issue through four stages.</p>
                  <div className="stg">
                    <i className="d">IDENTIFIED</i>
                    <i className="d">REPRESENTED</i>
                    <i className="d">FOLLOW-UP</i>
                    <i>RESOLVED</i>
                  </div>
                  <div className="row">
                    <div>
                      Chamber allocation request<small>Sample · Bar Unit</small>
                    </div>
                    <span className="chip">FOLLOW-UP</span>
                  </div>
                  <div className="row">
                    <div>
                      Welfare fund claim delay<small>Sample · State</small>
                    </div>
                    <span className="chip">REPRESENTED</span>
                  </div>
                  <div className="row">
                    <div>
                      Courtroom conduct complaint<small>Sample · District</small>
                    </div>
                    <span className="chip ok">RESOLVED</span>
                  </div>
                </div>
                <div className="pp" id="pp-w" {...panelProps(1, 'pp')}>
                  <Subheading>Welfare &amp; Schemes Hub</Subheading>
                  <Link className="portal-topic-link" to="/welfare">
                    Explore this topic
                  </Link>
                  <p className="s">
                    Eligibility checklists and application trackers. Subject to applicable rules and
                    eligibility.
                  </p>
                  <div className="row">
                    <div>
                      Health Card<small>Eligibility checklist</small>
                    </div>
                    <span className="chip">CHECK</span>
                  </div>
                  <div className="row">
                    <div>
                      Group Insurance<small>Application tracker</small>
                    </div>
                    <span className="chip">CHECK</span>
                  </div>
                  <div className="row">
                    <div>
                      Pension advocacy<small>Updates &amp; representations</small>
                    </div>
                    <span className="chip">FOLLOW</span>
                  </div>
                  <div className="row">
                    <div>
                      Emergency Assistance<small>Priority request</small>
                    </div>
                    <span className="chip">APPLY</span>
                  </div>
                </div>
                <div className="pp" id="pp-c" {...panelProps(2, 'pp')}>
                  <Subheading>CLE &amp; Mentorship Calendar</Subheading>
                  <Link className="portal-topic-link" to="/learning">
                    Explore this topic
                  </Link>
                  <p className="s">
                    Sample sessions showing the planned interface. These are not confirmed events or
                    registrations.
                  </p>
                  <div className="row">
                    <div>
                      Continuing Legal Education workshop<small>Sample session</small>
                    </div>
                    <PreviewRsvp />
                  </div>
                  <div className="row">
                    <div>
                      Advocates’ rights &amp; ethics seminar<small>Sample session</small>
                    </div>
                    <PreviewRsvp />
                  </div>
                  <div className="row">
                    <div>
                      Senior–junior mentorship pairing<small>Open for Young Advocates</small>
                    </div>
                    <PreviewRsvp />
                  </div>
                </div>
                <div className="pp" id="pp-d" {...panelProps(3, 'pp')}>
                  <Subheading>Unit Directory &amp; Circulars</Subheading>
                  <Link className="portal-topic-link" to="/directory">
                    Explore this topic
                  </Link>
                  <p className="s">
                    Representations to Bar Councils and Governments, and your office bearers.
                  </p>
                  <div className="row">
                    <div>
                      National office bearers<small>Contact directory</small>
                    </div>
                    <span className="chip">OPEN</span>
                  </div>
                  <div className="row">
                    <div>
                      State &amp; District committees<small>Contact directory</small>
                    </div>
                    <span className="chip">OPEN</span>
                  </div>
                  <div className="row">
                    <div>
                      Official representations<small>Circulars archive</small>
                    </div>
                    <span className="chip">OPEN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="tag" style={{ textAlign: 'center' }}>
            Interface preview with sample data. Live features arrive with the member portal.
          </p>
        </div>
      </section>
      {!embedded && <PortalExtras />}
    </>
  );
}
