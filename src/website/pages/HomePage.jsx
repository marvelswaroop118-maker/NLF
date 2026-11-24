import FounderPortrait from '../components/FounderPortrait.jsx';
import CommunityCallout from '../components/CommunityCallout.jsx';
import { Link } from 'react-router-dom';
import CharterPage from './CharterPage.jsx';
import PrinciplePage from './PrinciplePage.jsx';
import StructurePage from './StructurePage.jsx';
import MembershipPage from './MembershipPage.jsx';
import PortalPage from './PortalPage.jsx';
export default function HomePage() {
  return (
    <>
      <header className="hero">
        <div className="wrap">
          <div>
            <p className="hero-intro load" style={{ '--d': '0' }}>
              National Lawyers Federation
            </p>
            <h1 className="load" style={{ '--d': '1' }}>
              Your Leadership Starts Here.<em>Your Time To Lead Is Now.</em>
            </h1>
            <p className="lede load" style={{ '--d': '2' }}>
              A united, independent, and advocate-centred platform working for the welfare, dignity,
              safety, and rights of the legal fraternity.
            </p>
            <div className="actions load" style={{ '--d': '3' }}>
              <Link className="btn btn-solid" to="/membership">
                Apply for Membership{' '}
              </Link>
              <Link className="btn btn-ghost" to="/charter">
                Explore Our Charter
              </Link>
            </div>
          </div>
          <div className="arch settle" id="arch">
            <div
              className="crest"
              id="heroCrest"
              role="img"
              aria-label="National Lawyers Federation emblem"
            ></div>
            <div className="pillars" aria-label="Our values">
              <span>UNITY</span>
              <span>WELFARE</span>
              <span>DIGNITY</span>
              <span>PROTECTION</span>
            </div>
          </div>
        </div>
        <Link className="scroll-label" to="/charter">
          Discover the federation <span aria-hidden="true"></span>
        </Link>
      </header>
      <CharterPage embedded />
      <PrinciplePage embedded />
      <StructurePage embedded />
      <section className="home-founder editorial-section">
        <div className="wrap home-founder-grid">
          <FounderPortrait />
          <div>
            <h2>
              Leadership in service
              <br />
              of the fraternity.
            </h2>
            <p className="lede">Chittem Venkata Reddy</p>
            <p>
              Advocate, High Court
              <br />
              Founder President, National Lawyers Federation (NLF)
            </p>
            <div className="actions">
              <Link className="btn btn-ghost" to="/leadership">
                Meet the Founder President
              </Link>
              <Link className="text-link" to="/resources">
                Read the NLF brochure
              </Link>
            </div>
          </div>
        </div>
      </section>
      <MembershipPage embedded />
      <PortalPage embedded />
      <div className="wrap">
        <CommunityCallout />
      </div>
    </>
  );
}
