import { Link } from 'react-router-dom';

export default function SweepButton({ to, children, primary = false }) {
  return (
    <Link to={to} className={`sweep-button${primary ? ' sweep-primary' : ''}`}>
      <span>{children}</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </Link>
  );
}
