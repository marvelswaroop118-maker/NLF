export default function MembershipCard({ values }) {
  const unit = [values.state, values.district.trim(), values.court.trim()]
    .filter(Boolean)
    .join(' · ')
    .toUpperCase();
  return (
    <aside className="stick rv" aria-label="Illustrative membership card">
      <div className="idcard">
        <div className="idc">
          <div className="top">
            <div className="crest" aria-hidden="true" />
            <p>
              NATIONAL LAWYERS FEDERATION
              <br />
              DIGITAL MEMBERSHIP CARD
            </p>
          </div>
          <div className="mid">
            <div>
              <div className="nm">{values.name.trim() || 'Adv. Your Name'}</div>
              <div className="meta">
                <b>{values.tier.toUpperCase()}</b>
                <br />
                ENROL. NO · {values.enrolment.trim() || '— — —'}
                <br />
                {unit || 'STATE · DISTRICT · BAR UNIT'}
              </div>
            </div>
            <div className="card-mark" aria-label="Sample card, not issued">
              NLF<span>PREVIEW</span>
            </div>
          </div>
        </div>
      </div>
      <p className="cardcap">
        Illustrative card preview · Not a membership credential. Issuance follows verification by
        NLF.
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
