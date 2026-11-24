import { Link } from 'react-router-dom';
import { federation } from '../../shared/config.js';
export default function CommunityCallout({ compact = false }) {
  return (
    <section className={`community-callout ${compact ? 'compact' : ''}`}>
      <div>
        <h2>A collective voice starts with a conversation.</h2>
        <p>
          Connect with fellow advocates. Explore the NLF community, or speak directly with the
          federation.
        </p>
      </div>
      <div className="actions">
        <a
          className="btn btn-solid"
          href={federation.whatsappGroup}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open WhatsApp invitation
        </a>
        <Link className="text-link" to="/community">
          About the community
        </Link>
      </div>
    </section>
  );
}
