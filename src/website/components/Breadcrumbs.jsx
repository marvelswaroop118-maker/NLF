import { Link, useLocation } from 'react-router-dom';
import { getSitePage } from '../data/site.js';
export default function Breadcrumbs() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  return (
    <div className="wrap breadcrumb-wrap">
      <div className="breadcrumbs" role="navigation" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{getSitePage(pathname)?.title || 'Page not found'}</span>
      </div>
    </div>
  );
}
