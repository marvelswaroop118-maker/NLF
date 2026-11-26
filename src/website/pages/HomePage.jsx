import Hero from '../home/hero/Hero.jsx';
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
      <Hero />
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
