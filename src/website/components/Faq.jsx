export default function Faq({ items, title = 'A few things to know.' }) {
  return (
    <section className="faq-section">
      <h2>{title}</h2>
      <div className="faq-list">
        {items.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>
            <div>
              <p>{answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
