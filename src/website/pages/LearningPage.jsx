import { Link } from 'react-router-dom';
import EnquiryComposer from '../components/EnquiryComposer.jsx';
import RelatedPages from '../components/RelatedPages.jsx';
export default function LearningPage() {
  return (
    <>
      <section className="pad route-section learning-page">
        <div className="wrap">
          <div className="split-intro rv">
            <div>
              <h1>
                A profession that
                <br />
                <em>grows together.</em>
              </h1>
              <p className="lede">
                Legal education, continuing professional development and support for young advocates
                form part of NLF’s stated objects.
              </p>
            </div>
            <div className="learning-statement">
              <p>
                Knowledge shared.
                <br />
                Confidence built.
                <br />
                <em>Fraternity strengthened.</em>
              </p>
            </div>
          </div>
          <div className="learning-topics">
            <article>
              <h2>Continuing legal education</h2>
              <p>
                Seminars, workshops and training are part of the federation’s objectives for
                continuing professional development.
              </p>
            </article>
            <article>
              <h2>Young advocates</h2>
              <p>
                Guidance, mentoring and support for young and deserving advocates are among the aims
                described in the brochure.
              </p>
            </article>
            <article>
              <h2>Rights & professional ethics</h2>
              <p>
                NLF’s objects include awareness of advocates’ rights, professional ethics, access to
                justice and the rule of law.
              </p>
            </article>
          </div>
          <section className="publication-state">
            <div>
              <h2>Programme announcements.</h2>
              <p>
                No confirmed programme dates or registrations are published on this website yet.
                Contact the office to express interest in learning opportunities or mentorship.
              </p>
            </div>
            <Link className="btn btn-ghost" to="/community">
              Connect with the community
            </Link>
          </section>
          <div className="service-columns">
            <div>
              <h2>Take part in the conversation.</h2>
              <p>
                You may be looking for guidance at the beginning of practice, interested in
                professional development, or willing to share your experience with others.
              </p>
              <p>
                Let the NLF office know your area of interest. Sending an enquiry does not enrol you
                in a programme or confirm a mentorship placement.
              </p>
              <Link className="text-link" to="/resources">
                Read the federation’s objects
              </Link>
            </div>
            <EnquiryComposer
              subject="NLF learning and mentorship enquiry"
              label="Share your interest."
              topics={[
                'Attend a workshop or seminar',
                'Seek mentorship',
                'Offer mentorship',
                'Suggest a learning topic',
              ]}
            />
          </div>
        </div>
      </section>
      <RelatedPages paths={['/membership', '/community', '/resources']} />
    </>
  );
}
