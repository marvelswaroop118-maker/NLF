import FounderPortrait from './FounderPortrait.jsx';
export default function ContactDetails() {
  return (
    <div className="lead rv">
      <div className="person">
        <FounderPortrait className="contact-portrait" />
        <div>
          <h3>Chittem Venkata Reddy</h3>
          <p className="role">Advocate, High Court</p>
          <p>
            Founder President,
            <br />
            National Lawyers Federation (NLF)
          </p>
        </div>
      </div>
      <div className="contacts">
        <a className="ct" href="mailto:nationallawyersfederation@gmail.com">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          <div>
            <small>Email</small>nationallawyersfederation@gmail.com
          </div>
        </a>
        <a className="ct" href="tel:+919866606646">
          <svg viewBox="0 0 24 24">
            <path d="M5 4h4l2 5-2.500 1.500a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
          </svg>
          <div>
            <small>Call</small>+91 98666 06646
          </div>
        </a>
        <a
          className="ct"
          href="https://wa.me/919866606646?text=Hello%20NLF%2C%20I%20would%20like%20to%20raise%20a%20grievance."
          target="_blank"
          rel="noopener"
        >
          <svg viewBox="0 0 24 24">
            <path d="M4 20l1.300-4A8 8 0 118 19z" />
          </svg>
          <div>
            <small>WhatsApp Grievance Desk</small>Message the NLF team
          </div>
        </a>
      </div>
    </div>
  );
}
