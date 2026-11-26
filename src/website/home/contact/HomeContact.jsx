import './home-contact.css';
import { Link } from 'react-router-dom';
import { federation } from '../../../shared/config.js';
import LazyAmbientBg from '../shared/LazyAmbientBg.jsx';
import Threads from '../shared/Threads.jsx';

const OFFICE_CHANNELS = [
  {
    index: '01',
    label: 'Official Mail',
    value: federation.email,
    href: `mailto:${federation.email}`,
    external: false,
    className: 'hc-row-value hc-row-email',
  },
  {
    index: '02',
    label: 'Federation Telephone',
    value: federation.displayPhone,
    href: `tel:${federation.phone}`,
    external: false,
    className: 'hc-row-value',
  },
  {
    index: '03',
    label: 'WhatsApp Grievance Desk',
    value: 'Message the NLF office directly',
    href: `${federation.whatsappDesk}?text=Hello%20NLF%2C%20I%20would%20like%20to%20raise%20a%20grievance.`,
    external: true,
    className: 'hc-row-value',
  },
];

const FOOTER_LINKS = [
  { to: '/charter', label: 'Charter' },
  { to: '/working-principle', label: 'Principle' },
  { to: '/structure', label: 'Structure' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/membership', label: 'Membership' },
  { to: '/grievances', label: 'Grievances' },
  { to: '/contact', label: 'Contact' },
];

export default function HomeContact() {
  return (
    <section id="home-contact" className="home-contact">
      <div className="home-contact-glow" aria-hidden="true" />
      <LazyAmbientBg>
        <Threads
          color="#f09d1c"
          accentColor="#ffb338"
          lineCount={40}
          thickness={0.54}
          amplitude={1.08}
          distance={0.28}
          speed={0.4}
          waves={0.92}
          fray={0.38}
          angle={14}
          opacity={0.28}
          fade={0.42}
          brightness={1.1}
          enableMouseInteraction
        />
      </LazyAmbientBg>

      <div className="wrap home-contact-inner">
        <div className="home-contact-main">
          <div className="home-contact-lead">
            <div className="hc-motto-row">
              <span className="hc-motto-text">Connect &amp; Contact</span>
              <span className="hc-motto-rule" aria-hidden="true" />
            </div>

            <h2>
              A collective voice starts with a <em className="hc-headline-accent">conversation.</em>
            </h2>

            <p className="home-contact-copy">
              Reach the federation office directly for membership, formal representations, or
              advocate welfare enquiries — or step straight into the all-India WhatsApp collective.
            </p>

            <div className="home-contact-actions">
              <a
                className="hc-pill-cta"
                href={federation.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Join WhatsApp Community</span>
                <span className="hc-pill-arrow" aria-hidden="true">
                  →
                </span>
              </a>

              <Link className="hc-text-link" to="/community">
                <span>About the community</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <aside className="hc-dossier" aria-label="Direct federation contact desk">
            <div className="hc-dossier-accent" aria-hidden="true" />

            <div className="hc-dossier-head">
              <span className="hc-dossier-kicker">Office &amp; Advocate Desk</span>
              <span className="hc-dossier-badge">All-India Office</span>
            </div>

            <div className="hc-ledger">
              {OFFICE_CHANNELS.map((item) => (
                <a
                  key={item.index}
                  className="hc-ledger-row"
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="hc-row-index" aria-hidden="true">
                    {item.index}
                  </span>
                  <span className="hc-row-body">
                    <small className="hc-row-label">{item.label}</small>
                    <strong className={item.className}>{item.value}</strong>
                  </span>
                  <span className="hc-row-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <div className="hc-dossier-foot">
              <span>Filing a formal welfare or protection case?</span>
              <Link to="/grievances">
                Open Grievance Desk <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </div>

        {/* Clean Two-Line Architectural Footer */}
        <footer className="home-two-line-footer">
          <div className="home-footer-row home-footer-row-nav">
            <div className="home-footer-brand">
              <span className="crest home-footer-crest" aria-hidden="true" />
              <strong>National Lawyers Federation (NLF)</strong>
            </div>

            <div className="home-footer-links" role="navigation" aria-label="Footer quick links">
              {FOOTER_LINKS.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="home-footer-row home-footer-row-meta">
            <p className="home-footer-copyright">
              © {new Date().getFullYear()} National Lawyers Federation (NLF) · Unity · Welfare ·
              Dignity · Protection
            </p>

            <a
              href="https://jsmvalor.in"
              target="_blank"
              rel="noopener noreferrer"
              className="home-valor-badge"
              aria-label="Engineered by JSM VALOR"
              title="Engineered by JSM VALOR (https://jsmvalor.in)"
            >
              <span className="valor-content">
                <span className="valor-prefix">Engineered by</span>
                <span className="valor-mark">
                  VALOR<span className="valor-dot">.</span>
                </span>
              </span>
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
