import { Link } from 'react-router-dom';
import { getSitePage } from '../data/site.js';
export default function RelatedPages({ paths, title = 'Continue exploring NLF.' }) {
  return (
    <section className="related-pages" aria-label="Related pages">
      <div className="wrap">
        <h2>{title}</h2>
        <div className="related-links">
          {paths.map((path) => {
            const page = getSitePage(path);
            return (
              <Link key={path} to={path}>
                <h3>{page.title}</h3>
                <p>{page.description}</p>
                <span className="text-link">Explore {page.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
