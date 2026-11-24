import portrait from '../../../assets/founder-president.jpg';
export default function FounderPortrait({ className = '', eager = false }) {
  return (
    <img
      className={`founder-portrait ${className}`}
      src={portrait}
      alt="Chittem Venkata Reddy, Founder President of the National Lawyers Federation"
      width="1000"
      height="1000"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
