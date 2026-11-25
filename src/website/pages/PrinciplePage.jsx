import { Link } from 'react-router-dom';
import RelatedPages from '../components/RelatedPages.jsx';
import Principle from '../home/principle/Principle.jsx';
export default function PrinciplePage({ embedded = false }) {
  return (
    <>
      <Principle embedded={embedded} />
      {!embedded && (
        <>
          <section className="editorial-section">
            <div className="wrap">
              <div className="editorial-grid">
                <h2>
                  Make the issue clear.
                  <br />
                  Keep the purpose constructive.
                </h2>
                <div>
                  <p className="large-copy">
                    The working principle connects a genuine concern to a meaningful outcome.
                  </p>
                  <p>
                    When writing to the office, set out the issue, the authority concerned, any
                    action already taken and the outcome you are seeking. The office can then
                    consider the appropriate representation.
                  </p>
                </div>
              </div>

              <div className="actions">
                <Link className="btn btn-solid" to="/grievances">
                  Prepare a representation
                </Link>
                <Link className="text-link" to="/contact">
                  Speak with the office
                </Link>
              </div>
            </div>
          </section>
          <RelatedPages paths={['/grievances', '/structure', '/charter']} />
        </>
      )}
    </>
  );
}
