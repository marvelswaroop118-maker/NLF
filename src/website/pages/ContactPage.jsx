import { Link } from 'react-router-dom';
import ContactDetails from '../components/ContactDetails.jsx';
import EnquiryComposer from '../components/EnquiryComposer.jsx';
import RelatedPages from '../components/RelatedPages.jsx';
import { federation } from '../../shared/config.js';
export default function ContactPage() {
  return (
    <>
      <section className="pad contact-page route-section">
        <div className="wrap">
          <div className="sec-head rv">
            <h1>
              Let’s start
              <br />
              <em>a conversation.</em>
            </h1>
            <p className="lede">
              For membership, welfare, professional representation or a local unit enquiry, connect
              with the NLF office.
            </p>
          </div>
          <h2 className="contact-details-heading">NLF leadership &amp; contact desk</h2>
          <ContactDetails />
        </div>
      </section>
      <section className="editorial-section">
        <div className="wrap service-columns">
          <div>
            <h2>
              The right conversation.
              <br />
              The right channel.
            </h2>
            <ul className="contact-channels">
              <li>
                <h3>Membership enquiries</h3>
                <p>Prepare your details and review the application before emailing the office.</p>
                <Link className="text-link" to="/membership">
                  Prepare an application
                </Link>
              </li>
              <li>
                <h3>Professional & welfare issues</h3>
                <p>Set out your concern clearly for the office to consider.</p>
                <Link className="text-link" to="/grievances">
                  Prepare a representation
                </Link>
              </li>
              <li>
                <h3>The NLF community</h3>
                <p>Open the WhatsApp group invitation to connect with fellow advocates.</p>
                <a
                  className="text-link"
                  href={federation.whatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open group invitation
                </a>
              </li>
            </ul>
          </div>
          <EnquiryComposer
            label="Write to the office."
            topics={[
              'General enquiry',
              'Membership',
              'Welfare',
              'Local committee contact',
              'Learning or mentorship',
            ]}
          />
        </div>
      </section>
      <RelatedPages paths={['/membership', '/directory', '/community']} />
    </>
  );
}
