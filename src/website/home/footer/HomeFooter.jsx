import './home-footer.css';
import { Link } from 'react-router-dom';
import { federation } from '../../../shared/config.js';
import SweepButton from '../shared/SweepButton.jsx';

export default function HomeFooter() {
  return (
    <footer id="home-footer" className="home-footer">
      <div className="home-footer-glow" aria-hidden="true" />
      <div className="wrap home-footer-inner">
        <div className="home-footer-top">
          <div className="home-footer-lead">
            <p className="home-footer-eyebrow">Connect &amp; Contact</p>
            <h2>A collective voice starts with a conversation.</h2>
            <p className="home-footer-copy">
              Reach the federation office directly for membership, representations, or advocate
              welfare enquiries, or join fellow advocates in the NLF WhatsApp community.
            </p>
            <div className="home-footer-actions">
              <a
                className="sweep-button sweep-primary"
                href={federation.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Open WhatsApp invitation</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
              <Link className="home-footer-text-link" to="/community">
                About the community
              </Link>
            </div>
          </div>

          <div className="home-footer-contacts" aria-label="Direct contact channels">
            <a className="home-contact-row" href="mailto:nationallawyersfederation@gmail.com">
              <span className="home-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <span className="home-contact-meta">
                <small>Email Office</small>
                <strong>nationallawyersfederation@gmail.com</strong>
              </span>
            </a>

            <a className="home-contact-row" href="tel:+919866606646">
              <span className="home-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                </svg>
              </span>
              <span className="home-contact-meta">
                <small>Telephone</small>
                <strong>+91 98666 06646</strong>
              </span>
            </a>

            <a
              className="home-contact-row"
              href="https://wa.me/919866606646?text=Hello%20NLF%2C%20I%20would%20like%20to%20raise%20a%20grievance."
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="home-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 20l1.3-4A8 8 0 118 19z" />
                </svg>
              </span>
              <span className="home-contact-meta">
                <small>WhatsApp Grievance Desk</small>
                <strong>Message the NLF team</strong>
              </span>
            </a>
          </div>
        </div>

        <div className="home-footer-bar">
          <div className="home-footer-brand">
            <span className="crest home-footer-crest" aria-hidden="true" />
            <div>
              <strong>National Lawyers Federation (NLF)</strong>
              <span>© {new Date().getFullYear()} · Unity · Welfare · Dignity · Protection</span>
            </div>
          </div>

          <div className="home-footer-nav" role="navigation" aria-label="Footer quick links">
            <Link to="/charter">Charter</Link>
            <Link to="/structure">Structure</Link>
            <Link to="/membership">Membership</Link>
            <Link to="/grievances">Grievances</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="home-footer-up">
            <SweepButton to="/membership">Join NLF</SweepButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
