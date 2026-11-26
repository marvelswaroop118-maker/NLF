import './membership-card.css';

export default function MembershipCard({ values }) {
  const unit = [values.state, values.district.trim(), values.court.trim()]
    .filter(Boolean)
    .join(' · ')
    .toUpperCase();
  const enrol = values.enrolment.trim();
  const year = values.year.trim();

  return (
    <aside className="stick rv" aria-label="Illustrative membership card">
      <div className="idcard nlf-idcard">
        <div className="idc">
          <div className="idc-trim" aria-hidden="true" />

          <svg
            className="idc-guilloche"
            viewBox="0 0 420 260"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M-20 210 C 90 120, 210 240, 440 90" stroke="#f09d1c" strokeWidth="1" />
            <path d="M-20 230 C 110 140, 230 250, 440 115" stroke="#f09d1c" strokeWidth="0.7" />
            <circle cx="345" cy="60" r="95" stroke="#faf9f6" strokeWidth="0.7" />
            <circle cx="345" cy="60" r="70" stroke="#f09d1c" strokeWidth="0.5" />
          </svg>

          <div className="idc-surface">
            <div className="idc-head">
              <div className="idc-brand">
                <div className="crest" aria-hidden="true" />
                <div className="idc-brand-text">
                  <p className="idc-org">National Lawyers Federation</p>
                  <p className="idc-doc">Digital Advocate Credential</p>
                </div>
              </div>
              <span className="idc-tier-pill">{values.tier}</span>
            </div>

            <div className="idc-body">
              <div className="idc-chip-row">
                <svg className="idc-chip" viewBox="0 0 36 26" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="nlfChipGrad" x1="0" y1="0" x2="36" y2="26">
                      <stop offset="0%" stopColor="#ffdfa0" />
                      <stop offset="50%" stopColor="#e8a735" />
                      <stop offset="100%" stopColor="#b97b14" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="0.5"
                    y="0.5"
                    width="35"
                    height="25"
                    rx="4"
                    fill="url(#nlfChipGrad)"
                    stroke="rgba(7,20,38,0.45)"
                  />
                  <path
                    d="M0.5 9.5H12.5M0.5 16.5H12.5M23.5 9.5H35.5M23.5 16.5H35.5M12.5 0.5V25.5M23.5 0.5V25.5"
                    stroke="rgba(7,20,38,0.42)"
                    strokeWidth="0.9"
                  />
                  <rect
                    x="12.5"
                    y="7.5"
                    width="11"
                    height="11"
                    rx="2"
                    fill="none"
                    stroke="rgba(7,20,38,0.45)"
                    strokeWidth="0.9"
                  />
                </svg>
                <span className="idc-serial">NLF · ALL-INDIA SPECIMEN</span>
              </div>

              <div className="nm">{values.name.trim() || 'Adv. Your Name'}</div>

              <div className="idc-specs">
                <div className="idc-spec">
                  <small>Bar Enrolment No.</small>
                  <span>{enrol || 'PENDING INPUT'}</span>
                </div>
                <div className="idc-spec">
                  <small>Enrolment Year</small>
                  <span>{year || 'AWAITING BAR ID'}</span>
                </div>
              </div>
            </div>

            <div className="idc-foot">
              <div className="idc-unit">
                <small>State · District · Bar Unit</small>
                <strong>{unit || 'STATE · DISTRICT · BAR UNIT'}</strong>
              </div>

              <div className="idc-qr-wrap" aria-label="Sample verification QR placeholder">
                <div className="idc-qr-box">
                  <svg viewBox="0 0 24 24" fill="#071426" aria-hidden="true">
                    <path d="M2 2h7v7H2V2zm2 2v3h3V4H4zm11-2h7v7h-7V2zm2 2v3h3V4h-3zM2 15h7v7H2v-7zm2 2v3h3v-3H4zm7-4h2v2h-2v-2zm0 4h2v2h-2v-2zm2-6h2v2h-2v-2zm2 4h3v2h-3v-2zm2 3h2v4h-2v-4zm3-3h2v2h-2v-2zm-5 5h3v2h-3v-2zm-4-11h2v3h-2V8zm2 4h2v2h-2v-2z" />
                  </svg>
                </div>
                <span className="idc-qr-tag">PREVIEW</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="cardcap">
        Illustrative preview only · Credential issued after Bar Council verification.
      </p>

      <div className="perks">
        <div className="perk">
          <b>QR verification</b>Planned for issued membership cards.
        </div>
        <div className="perk">
          <b>Auto unit mapping</b>State → District → Bar Unit committee.
        </div>
      </div>
    </aside>
  );
}
