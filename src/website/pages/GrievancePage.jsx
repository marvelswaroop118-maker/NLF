import { Link } from 'react-router-dom';
import EnquiryComposer from '../components/EnquiryComposer.jsx';
import RelatedPages from '../components/RelatedPages.jsx';
import { federation } from '../../shared/config.js';
const topics = [
  'Professional safety or protection',
  'Welfare or service-related issue',
  'Chambers or court facilities',
  'Representation follow-up',
  'Other professional issue',
];
export default function GrievancePage() {
  return (
    <>
      <section className="pad route-section grievance-page">
        <div className="wrap">
          <div className="sec-head rv">
            <h1>
              Every genuine issue
              <br />
              <em>deserves to be heard.</em>
            </h1>
            <p className="lede">
              Prepare a clear representation for the NLF office. The federation’s working principle
              is to identify, represent, follow-up and resolve.
            </p>
          </div>
          <div className="service-columns">
            <div>
              <section className="reading-block">
                <h2>Make your representation clear.</h2>
                <ol className="numbered-list">
                  <li>
                    <b>Describe the issue.</b>
                    <span>
                      Summarise what happened, where it arose and the professional or welfare
                      concern involved.
                    </span>
                  </li>
                  <li>
                    <b>Set out the current position.</b>
                    <span>
                      Mention any previous representation and the authority already approached.
                    </span>
                  </li>
                  <li>
                    <b>Explain what you are seeking.</b>
                    <span>
                      State the clarification, support or representation you would like NLF to
                      consider.
                    </span>
                  </li>
                  <li>
                    <b>Share a way to reach you.</b>
                    <span>
                      Add your name, State, District and Bar Unit when you review your email.
                    </span>
                  </li>
                </ol>
              </section>
              <div className="inline-note">
                <h3>Direct contact, when needed.</h3>
                <p>
                  This form prepares a draft; it does not lodge a complaint or issue a tracking
                  number. For time-sensitive concerns, call the office directly.
                </p>
                <a className="text-link" href={`tel:${federation.phone}`}>
                  {federation.displayPhone}
                </a>
              </div>
            </div>
            <EnquiryComposer
              subject="NLF representation"
              label="Prepare your representation."
              topics={topics}
              prompt="Start with a brief summary. You can review and add any supporting documents in your own email app."
            />
          </div>
          <section className="editorial-grid service-bottom">
            <h2>
              Constructive.
              <br />
              Collective. Practical.
            </h2>
            <div>
              <p className="large-copy">
                NLF stands for practical solutions, not personal criticism or unnecessary disputes.
              </p>
              <p>
                The brochure provides for taking up professional, welfare and service-related
                grievances with Governments, Bar Councils, Bar Associations and other authorities.
              </p>
              <Link className="text-link" to="/working-principle">
                Explore the four-step approach
              </Link>
            </div>
          </section>
        </div>
      </section>
      <RelatedPages paths={['/working-principle', '/welfare', '/contact']} />
    </>
  );
}
