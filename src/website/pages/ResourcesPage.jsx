import { Link } from 'react-router-dom';
import cover from '../../../assets/brochure-cover.jpg';
import RelatedPages from '../components/RelatedPages.jsx';
import { federation } from '../../shared/config.js';
const contents = [
  ['The federation', 'Purpose, identity and the invitation to join a collective voice.', '/'],
  ['Our aims', 'Seven commitments to the welfare, safety and rights of advocates.', '/charter'],
  [
    'Objects & working principle',
    'Nine objects and the Identify–Represent–Follow-up–Resolve approach.',
    '/working-principle',
  ],
  [
    'Structure, values & contact',
    'Four committee levels, shared values and the national office.',
    '/structure',
  ],
];
export default function ResourcesPage() {
  return (
    <>
      <section className="pad resources-page route-section">
        <div className="wrap">
          <div className="resource-feature">
            <div className="rv">
              <h1>
                The federation,
                <br />
                <em>in its own words.</em>
              </h1>
              <p className="lede">
                Read the NLF brochure: our aims, objects, working principle, organisational
                structure and values in one document.
              </p>
              <p className="document-meta">NLF brochure · PDF · 4 pages · 9.5 MB</p>
              <div className="actions">
                <a
                  className="btn btn-solid"
                  href={federation.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the brochure
                </a>
                <a className="btn btn-ghost" href={federation.brochure} download="NLF_Brochure.pdf">
                  Download PDF
                </a>
              </div>
              <p className="field-help">
                Opens the supplied brochure in your browser’s PDF viewer. Prefer a web page? Explore
                the topics below.
              </p>
            </div>
            <a
              className="brochure-cover rv"
              href={federation.brochure}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the NLF brochure PDF"
            >
              <img
                src={cover}
                alt="Cover of the National Lawyers Federation brochure"
                width="636"
                height="900"
              />
            </a>
          </div>
          <section className="document-contents">
            <h2>Inside the brochure.</h2>
            <div>
              {contents.map(([title, description, to], index) => (
                <Link key={title} to={to}>
                  <span className="document-page">Page {index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <span className="text-link">Explore online</span>
                </Link>
              ))}
            </div>
          </section>
          <div className="editorial-grid resource-note">
            <h2>A note on published material.</h2>
            <div>
              <p>
                The brochure sets out NLF’s aims and objects. It is not a benefits schedule or a
                guarantee of approval for any scheme.
              </p>
              <p>
                For membership terms, committee details or the status of a representation, contact
                the NLF office directly.
              </p>
              <Link className="text-link" to="/contact">
                Contact NLF
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RelatedPages paths={['/charter', '/leadership', '/membership']} />
    </>
  );
}
