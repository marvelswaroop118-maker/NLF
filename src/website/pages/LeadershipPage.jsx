import { Link } from 'react-router-dom';
import FounderPortrait from '../components/FounderPortrait.jsx';
import RelatedPages from '../components/RelatedPages.jsx';
import { federation } from '../../shared/config.js';

export default function LeadershipPage() {
  return (
    <>
      <section className="pad leadership-page route-section">
        <div className="wrap founder-profile">
          <div className="founder-profile-copy rv">
            <h1>
              A united voice.
              <br />
              <em>A shared responsibility.</em>
            </h1>
            <p className="lede">
              Leadership in service of advocates’ welfare, professional dignity and protection.
            </p>
            <div className="founder-name">
              <h2>Chittem Venkata Reddy</h2>
              <p>Advocate, High Court</p>
              <p className="founder-role">
                Founder President
                <br />
                National Lawyers Federation (NLF)
              </p>
            </div>
            <div className="actions">
              <a className="btn btn-solid" href={`mailto:${federation.email}`}>
                Contact the NLF office
              </a>
              <Link className="text-link" to="/structure">
                Our organisational structure
              </Link>
            </div>
          </div>
          <figure className="portrait-frame rv">
            <FounderPortrait eager />
            <figcaption>Chittem Venkata Reddy · Founder President</figcaption>
          </figure>
        </div>
      </section>
      <section className="editorial-section navy-section">
        <div className="wrap editorial-grid">
          <h2>Representation with purpose.</h2>
          <div>
            <p className="large-copy">
              A united, independent and advocate-centred platform working for the welfare, dignity,
              safety and rights of the legal fraternity.
            </p>
            <p>
              This commitment, set out in the NLF brochure, guides a federation built around
              collective representation and practical solutions.
            </p>
            <a
              className="text-link"
              href={federation.brochure}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the NLF brochure
            </a>
          </div>
        </div>
      </section>
      <section className="editorial-section">
        <div className="wrap editorial-grid">
          <h2>Democratic at every level.</h2>
          <div>
            <p>
              NLF’s organisational structure connects advocates through National, State, District
              and Bar Association / Bar Unit committees.
            </p>
            <p>
              For the current position of a local committee or a nomination enquiry, contact the
              national office. Published contacts are available in the directory.
            </p>
            <div className="actions">
              <Link className="btn btn-ghost" to="/directory">
                Explore the directory
              </Link>
              <Link className="text-link" to="/membership">
                Apply for membership
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RelatedPages paths={['/charter', '/structure', '/contact']} />
    </>
  );
}
