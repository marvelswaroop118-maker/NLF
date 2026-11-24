import { useState } from 'react';
export default function PreviewRsvp() {
  const [selected, setSelected] = useState(false);
  return (
    <div className="preview-rsvp">
      <button
        type="button"
        className={`rsvp ${selected ? 'on' : ''}`}
        aria-pressed={selected}
        onClick={() => setSelected(!selected)}
      >
        {selected ? 'Selected' : 'RSVP'}
      </button>
      <span role="status" className="rsvp-status">
        {selected ? 'Preview only; registration is not open.' : ''}
      </span>
    </div>
  );
}
