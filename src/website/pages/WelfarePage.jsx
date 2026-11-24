import { Link } from 'react-router-dom';
import EnquiryComposer from '../components/EnquiryComposer.jsx';
import RelatedPages from '../components/RelatedPages.jsx';
import Faq from '../components/Faq.jsx';
const priorities = [
  ['Healthcare', 'Health cards and access to healthcare for advocates and their families.'],
  [
    'Social security',
    'Pension, insurance and welfare benefits that support professional and family life.',
  ],
  [
    'Housing support',
    'Practical housing-related welfare measures, subject to applicable rules and eligibility.',
  ],
  [
    'Emergency assistance',
    'Advocacy for support when advocates and their families face urgent hardship.',
  ],
  ['Welfare Fund access', 'Improved access to benefits and fair, transparent welfare schemes.'],
  [
    'Professional facilities',
    'Adequate chambers, libraries, basic amenities and court infrastructure.',
  ],
];
export default function WelfarePage() {
  return (
    <>
      <section className="pad route-section welfare-page">
        <div className="wrap">
          <div className="split-intro rv">
            <div>
              <h1>
                Welfare that respects
                <br />
                <em>the advocate.</em>
              </h1>
              <p className="lede">
                The legal profession deserves dignity at work and support beyond it. NLF’s brochure
                places advocates and their families at the centre of its welfare aims.
              </p>
            </div>
            <aside className="intro-note">
              <h2>Our position</h2>
              <p>
                These are NLF’s stated advocacy priorities. Availability, terms and eligibility for
                any scheme must be confirmed with the relevant authority and the NLF office.
              </p>
            </aside>
          </div>
          <div className="priority-list">
            {priorities.map(([title, description]) => (
              <article key={title}>
                <h2>{title}</h2>
                <p>{description}</p>
                <span>Brochure priority</span>
              </article>
            ))}
          </div>
          <div className="service-columns">
            <div>
              <h2>Start with the right details.</h2>
              <p>
                If you have a welfare enquiry, help the office understand the scheme or issue you
                are asking about.
              </p>
              <ul className="plain-list">
                <li>Your State, District and Bar Unit.</li>
                <li>The name of the scheme or welfare authority, if known.</li>
                <li>The present status and the clarification you need.</li>
                <li>A suitable way for the office to contact you.</li>
              </ul>
              <Link className="text-link" to="/grievances">
                Need to raise a pending issue?
              </Link>
            </div>
            <EnquiryComposer
              subject="NLF welfare enquiry"
              label="Ask about welfare."
              topics={priorities.map(([title]) => title)}
            />
          </div>
          <Faq
            items={[
              [
                'Are these benefits available automatically to members?',
                'No automatic entitlement is offered on this page. The brochure describes NLF’s aims and objects. Individual schemes have their own applicable rules and eligibility.',
              ],
              [
                'Can I submit an insurance or pension claim here?',
                'This website does not process claims. Use the enquiry draft to ask the NLF office about the appropriate next step.',
              ],
              [
                'Where can I read the original priorities?',
                <>
                  The aims and objects are set out in the <Link to="/resources">NLF brochure</Link>.
                </>,
              ],
            ]}
          />
        </div>
      </section>
      <RelatedPages paths={['/grievances', '/resources', '/membership']} />
    </>
  );
}
