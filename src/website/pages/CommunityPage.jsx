import { Link } from 'react-router-dom';
import RelatedPages from '../components/RelatedPages.jsx';
import Faq from '../components/Faq.jsx';
import { federation } from '../../shared/config.js';
export default function CommunityPage() {
  return (
    <>
      <section className="pad community-page route-section">
        <div className="wrap">
          <div className="community-hero rv">
            <div>
              <h1>
                Stronger,
                <br />
                <em>in good company.</em>
              </h1>
              <p className="lede">
                Unity and mutual respect begin with connection. Open the NLF WhatsApp invitation to
                connect with the community.
              </p>
              <div className="actions">
                <a
                  className="btn btn-solid"
                  href={federation.whatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open WhatsApp invitation
                </a>
                <Link className="text-link" to="/membership">
                  Explore membership
                </Link>
              </div>
              <p className="field-help">
                You’ll leave this site to review the group invitation in WhatsApp. Joining a group
                is separate from applying for NLF membership.
              </p>
            </div>
            <div className="community-wordmark" aria-hidden="true">
              <span>Unity.</span>
              <span>Respect.</span>
              <span>Solidarity.</span>
              <div className="crest" />
            </div>
          </div>
          <section className="editorial-grid community-guidance">
            <h2>A constructive place to connect.</h2>
            <div>
              <p className="large-copy">
                NLF stands for constructive representation, collective action and practical
                solutions.
              </p>
              <ul className="plain-list">
                <li>Keep conversations respectful and relevant to the legal fraternity.</li>
                <li>
                  Use the NLF office’s direct contact for individual representations and membership
                  enquiries.
                </li>
                <li>Keep case papers and personal documents out of a group discussion.</li>
                <li>Confirm important information with the office before acting on it.</li>
              </ul>
            </div>
          </section>
          <Faq
            items={[
              [
                'Does joining WhatsApp make me an NLF member?',
                <>
                  No. The group invitation and the{' '}
                  <Link to="/membership">membership application</Link> are separate. The NLF office
                  confirms membership after review.
                </>,
              ],
              [
                'Where should I send a grievance?',
                <>
                  Use the <Link to="/grievances">Grievance & Protection page</Link> to prepare an
                  email to the office. The community group is not a confidential case-management
                  service.
                </>,
              ],
              [
                'What if the invitation does not open?',
                <>
                  WhatsApp may require the app or a browser sign-in. If the invitation is
                  unavailable, <Link to="/contact">contact NLF</Link> for the current joining
                  details.
                </>,
              ],
            ]}
          />
        </div>
      </section>
      <RelatedPages paths={['/membership', '/grievances', '/contact']} />
    </>
  );
}
