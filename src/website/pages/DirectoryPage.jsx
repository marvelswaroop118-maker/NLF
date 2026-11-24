import { useState } from 'react';
import { Link } from 'react-router-dom';
import { states } from '../data/states.js';
import FounderPortrait from '../components/FounderPortrait.jsx';
import RelatedPages from '../components/RelatedPages.jsx';
import { federation } from '../../shared/config.js';
export default function DirectoryPage() {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [level, setLevel] = useState('State');
  const body = `Dear NLF,\n\nPlease share the current ${level} committee / Bar Unit contact details for:\n\nState / union territory: ${state}\nDistrict / Bar Unit: ${district.trim() || 'Please advise'}\n\nThank you.\n`;
  return (
    <>
      <section className="pad route-section directory-page">
        <div className="wrap">
          <div className="sec-head rv">
            <h1>
              A federation.
              <br />
              <em>Connected at every level.</em>
            </h1>
            <p className="lede">
              Find the published national contact, or ask the office for the current State, District
              and Bar Unit details.
            </p>
          </div>
          <section className="directory-national">
            <div>
              <h2>National office</h2>
              <p>Published in the NLF brochure.</p>
            </div>
            <div className="directory-person">
              <FounderPortrait />
              <div>
                <h3>{federation.founder}</h3>
                <p>
                  Advocate, High Court
                  <br />
                  Founder President, NLF
                </p>
                <a href={`mailto:${federation.email}`} className="text-link">
                  {federation.email}
                </a>
                <a href={`tel:${federation.phone}`} className="text-link">
                  {federation.displayPhone}
                </a>
              </div>
            </div>
          </section>
          <section className="service-columns directory-request">
            <div>
              <h2>Looking for your local unit?</h2>
              <p>
                The brochure sets out four committee levels. A verified State, District or Bar Unit
                contact list has not been published on this website.
              </p>
              <p>
                Select your location to prepare a request to the national office for the current
                contact. This does not create a new unit or assign membership.
              </p>
              <Link className="text-link" to="/structure">
                Understand the structure
              </Link>
            </div>
            <form className="directory-form" onSubmit={(event) => event.preventDefault()}>
              <div className="fld">
                <label htmlFor="directory-state">State / union territory</label>
                <select
                  id="directory-state"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                >
                  <option value="">Select a location</option>
                  {states.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="fld">
                <label htmlFor="directory-level">Committee level</label>
                <select
                  id="directory-level"
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                >
                  {['State', 'District', 'Bar Association / Bar Unit'].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="fld">
                <label htmlFor="directory-district">District / Bar Unit (optional)</label>
                <input
                  id="directory-district"
                  value={district}
                  maxLength={160}
                  onChange={(event) => setDistrict(event.target.value)}
                  placeholder="Your district or Bar Association"
                />
              </div>
              {state ? (
                <a
                  className="btn btn-solid"
                  href={`mailto:${federation.email}?subject=${encodeURIComponent(`NLF ${level} contact enquiry – ${state}`)}&body=${encodeURIComponent(body)}`}
                >
                  Request contact by email
                </a>
              ) : (
                <p className="field-help" role="status">
                  Choose a State or union territory to prepare your request.
                </p>
              )}
            </form>
          </section>
        </div>
      </section>
      <RelatedPages paths={['/structure', '/leadership', '/contact']} />
    </>
  );
}
