import { Link } from 'react-router-dom';
export default function NotFoundPage() {
  return (
    <section className="pad route-section">
      <div className="wrap">
        <div className="sec-head">
          <h1>Page not found.</h1>
          <p className="lede">
            The page you’re looking for isn’t available. Explore the federation or contact the NLF
            team.
          </p>
        </div>
        <div className="actions">
          <Link className="btn btn-solid" to="/">
            Return home
          </Link>
          <Link className="btn btn-ghost" to="/contact">
            Contact NLF
          </Link>
        </div>
      </div>
    </section>
  );
}
