import Hero from '../home/hero/Hero.jsx';
import FounderPortrait from '../components/FounderPortrait.jsx';
import CommunityCallout from '../components/CommunityCallout.jsx';
import { Link } from 'react-router-dom';
import CharterPage from './CharterPage.jsx';
import PrinciplePage from './PrinciplePage.jsx';
import StructurePage from './StructurePage.jsx';
import MembershipPage from './MembershipPage.jsx';
import PortalPage from './PortalPage.jsx';
import supremeCourtImg from '../../../assets/supreme-court-of-india-01.jpg';
import telanganaArchImg from '../../../assets/high-court-of-telangana-state-73051.jpg';
import calcuttaColonnadeImg from '../../../assets/calcutta-high-court-01.jpg';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CharterPage embedded />
      <PrinciplePage embedded />
      <StructurePage embedded />

      <section className="home-founder" aria-labelledby="founder-letter-heading">
        <div className="wrap founder-letter-grid rv">
          <div className="founder-portrait-col">
            <FounderPortrait />
          </div>
          <div className="founder-letter-body">
            <h2 id="founder-letter-heading" className="founder-section-title">
              From the Founder President.
            </h2>
            <p className="founder-letter-opening">
              Advocates uphold the constitutional order in court every day; the federation exists so
              no advocate stands without protection or welfare.
            </p>
            <p>
              Across National, State, District, and Bar Unit committees, the National Lawyers
              Federation brings members of the legal fraternity together around practical
              priorities: safer court premises, dedicated chambers, healthcare and social security,
              and mentorship for newly enrolled counsel.
            </p>
            <p>
              Every representation is carried forward through peaceful, lawful, and constructive
              engagement with Bar Councils, Bar Associations, and authorities.
            </p>
            <div className="founder-signoff">
              <strong>Chittem Venkata Reddy</strong>
              <span>Advocate, High Court</span>
              <span>Founder President, National Lawyers Federation</span>
            </div>
            <div className="actions">
              <Link className="btn btn-solid" to="/leadership">
                Meet the Founder President
              </Link>
              <Link className="text-link" to="/resources">
                Read the NLF brochure
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PortalPage embedded />
      <MembershipPage embedded />

      <section aria-label="Courts across India">
        <div className="community-strip">
          <img
            className="community-strip-img"
            src={supremeCourtImg}
            alt="Supreme Court of India facade and central dome"
            width="1920"
            height="1196"
            loading="lazy"
            decoding="async"
          />
          <img
            className="community-strip-img"
            src={telanganaArchImg}
            alt="Stone archway looking toward the High Court of Telangana"
            width="1920"
            height="2707"
            loading="lazy"
            decoding="async"
          />
          <img
            className="community-strip-img"
            src={calcuttaColonnadeImg}
            alt="Verandah pillars inside the Calcutta High Court"
            width="1920"
            height="2575"
            loading="lazy"
            decoding="async"
          />
        </div>
        <CommunityCallout />
      </section>
    </>
  );
}
