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
              <ol className="process-notes">
                <li>
                  <h3>Identify</h3>
                  <p>Start with the concern, the people affected and the relevant facts.</p>
                </li>
                <li>
                  <h3>Represent</h3>
                  <p>Make clear which authority or professional body the issue concerns.</p>
                </li>
                <li>
                  <h3>Follow-up</h3>
                  <p>Keep previous correspondence and the current position together.</p>
                </li>
                <li>
                  <h3>Resolve</h3>
                  <p>Record the outcome and any clarification still needed.</p>
                </li>
              </ol>
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
