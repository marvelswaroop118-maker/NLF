import { useState } from 'react';
import { federation } from '../../shared/config.js';
export default function EnquiryComposer({
  subject = 'NLF enquiry',
  topics = ['General enquiry'],
  label = 'Prepare an enquiry',
  prompt = 'Tell the NLF office what you would like to discuss.',
}) {
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState('');
  const [review, setReview] = useState(false);
  const [error, setError] = useState('');
  const text = `Dear NLF,\n\n${topic}\n\n${message.trim()}\n\nPlease let me know the next steps.\n`;
  return (
    <div className="enquiry-composer">
      <h2>{label}</h2>
      <p>{prompt}</p>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!message.trim()) {
            setError('Add a brief message so the office knows how to help.');
            return;
          }
          setError('');
          setReview(true);
        }}
      >
        <div className="fld">
          <label htmlFor="enquiry-topic">Enquiry topic</label>
          <select
            id="enquiry-topic"
            value={topic}
            onChange={(event) => {
              setTopic(event.target.value);
              setReview(false);
            }}
          >
            {topics.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label htmlFor="enquiry-message">Your message</label>
          <textarea
            id="enquiry-message"
            value={message}
            rows={5}
            maxLength={3000}
            required
            aria-invalid={Boolean(error)}
            aria-describedby="enquiry-help"
            onChange={(event) => {
              setMessage(event.target.value);
              setError('');
              setReview(false);
            }}
            placeholder="Include your State, District and Bar Unit where relevant."
          />
          <p id="enquiry-help" className="field-help">
            This stays in your browser. Only include details you intend to share by email.
          </p>
        </div>
        {error && (
          <p className="form-status" role="alert">
            {error}
          </p>
        )}
        {!review && (
          <button className="btn btn-solid" type="submit">
            Review email draft
          </button>
        )}
        {review && (
          <div className="enquiry-review" role="status">
            <h3>Your email draft is ready.</h3>
            <pre className="draft-preview">{text}</pre>
            <p>
              Opening your email app does not submit the enquiry. Review the recipient and message
              before sending.
            </p>
            <div className="actions">
              <a
                className="btn btn-solid"
                href={`mailto:${federation.email}?subject=${encodeURIComponent(`${subject} – ${topic}`)}&body=${encodeURIComponent(text)}`}
              >
                Open email draft
              </a>
              <button className="text-link" type="button" onClick={() => setReview(false)}>
                Edit message
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
