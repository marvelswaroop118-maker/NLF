import { Link } from 'react-router-dom';
import RelatedPages from './RelatedPages.jsx';
import Faq from './Faq.jsx';
import CommunityCallout from './CommunityCallout.jsx';
import { federation } from '../../shared/config.js';

export function CharterExtras() {
  return (
    <>
      <section className="editorial-section">
        <div className="wrap editorial-grid">
          <h2>A shared commitment.</h2>
          <div>
            <p className="large-copy">A united, independent and advocate-centred platform.</p>
            <p>
              The seven aims and nine objects work together: professional safety, welfare and
              infrastructure, opportunities for young advocates, and a constructive collective
              voice.
            </p>
            <div className="actions">
              <a
                className="btn btn-ghost"
                href={federation.brochure}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the original brochure
              </a>
              <Link className="text-link" to="/working-principle">
                How representation works
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RelatedPages paths={['/working-principle', '/welfare', '/membership']} />
    </>
  );
}
export function StructureExtras() {
  return (
    <>
      <section className="editorial-section soft-section">
        <div className="wrap editorial-grid">
          <h2>
            Local issues.
            <br />A collective voice.
          </h2>
          <div>
            <p className="large-copy">
              Representation begins with an advocate and connects through the federation.
            </p>
            <p>
              The four levels provide the organisational framework. To find the current office
              bearer for your location, request details from the national office.
            </p>
            <div className="actions">
              <Link className="btn btn-solid" to="/directory">
                Find your unit contact
              </Link>
              <Link className="text-link" to="/leadership">
                Meet the Founder President
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RelatedPages paths={['/directory', '/leadership', '/community']} />
    </>
  );
}
export function MembershipExtras() {
  return (
    <>
      <section className="editorial-section">
        <div className="wrap">
          <div className="editorial-grid membership-guidance">
            <h2>Before you apply.</h2>
            <div>
              <ul className="plain-list">
                <li>Keep your Bar Council enrolment number and year of enrolment ready.</li>
                <li>Provide your current State, District and primary court or Bar Unit.</li>
                <li>
                  Attach your Bar Council ID or Certificate of Practice when sending your email.
                </li>
                <li>
                  Confirm membership category, applicable terms and any fee directly with the NLF
                  office.
                </li>
              </ul>
            </div>
          </div>
          <Faq
            items={[
              [
                'Is completing this form a confirmed membership?',
                'No. The form prepares an application for your review. The NLF office must confirm acceptance and any applicable terms.',
              ],
              [
                'Does the website store my personal details?',
                'No. The form holds your entries in memory while you stay on this page. Downloading a copy saves it to your device. Opening an email draft moves the selected details into your own email app.',
              ],
              [
                'Can I edit the application before sending?',
                'Yes. Use Edit details on the review step. You can also review the complete message in your email app before sending it.',
              ],
              [
                'Can I join the WhatsApp group instead?',
                <>
                  The <Link to="/community">community invitation</Link> is available separately.
                  Joining the group does not confirm membership.
                </>,
              ],
            ]}
          />
          <CommunityCallout compact />
        </div>
      </section>
      <RelatedPages paths={['/charter', '/resources', '/contact']} />
    </>
  );
}
export function PortalExtras() {
  return (
    <>
      <section className="editorial-section">
        <div className="wrap">
          <div className="editorial-grid">
            <h2>
              Useful today.
              <br />
              Built for tomorrow.
            </h2>
            <div>
              <p className="large-copy">
                Explore NLF’s priorities and contact the office without waiting for a member login.
              </p>
              <p>
                The dashboard above is a sample interface. The public pages below let you prepare an
                enquiry, understand the federation’s aims and find the published office contact.
              </p>
            </div>
          </div>
        </div>
      </section>
      <RelatedPages
        title="Explore member service topics."
        paths={['/grievances', '/welfare', '/learning', '/directory']}
      />
    </>
  );
}
