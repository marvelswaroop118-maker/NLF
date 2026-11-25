import Breadcrumbs from './Breadcrumbs.jsx';
import Navbar from './Navbar.jsx';
import { sitePages, getSitePage } from '../data/site.js';
import { federation } from '../../shared/config.js';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const showTopRef = useRef(false);
  const main = useRef(null);
  const footer = useRef(null);
  const burger = useRef(null);
  const location = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!firstRender.current) main.current?.focus({ preventScroll: true });
    firstRender.current = false;
    const page = getSitePage(location.pathname);
    document.title = `${page?.title || 'Page not found'} | National Lawyers Federation`;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
      document
        .querySelector(selector)
        ?.setAttribute('content', page?.description || 'Explore the National Lawyers Federation.');
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.classList.add('in');
          if (
            !matchMedia('(prefers-reduced-motion: reduce)').matches &&
            target.classList.contains('rv')
          ) {
            const parts = target.children.length ? [...target.children] : [target];
            parts.slice(0, 6).forEach((part, index) => {
              part.animate(
                [
                  { opacity: 0.78, transform: 'translateY(16px)' },
                  { opacity: 1, transform: 'none' },
                ],
                {
                  duration: 680,
                  delay: index * 70,
                  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  fill: 'both',
                },
              );
            });
          }
          observer.unobserve(target);
        }),
      { threshold: 0.06 },
    );
    document.querySelectorAll('.rv').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (main.current) main.current.inert = open;
    if (footer.current) footer.current.inert = open;
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (event) => {
      if (!open) return;
      if (event.key === 'Escape') {
        setOpen(false);
        burger.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const desktop = matchMedia('(min-width: 1021px)');
    const close = (event) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener('change', close);
    return () => desktop.removeEventListener('change', close);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const isVisible = window.scrollY > 360;
      if (isVisible !== showTopRef.current) {
        showTopRef.current = isVisible;
        setShowTop(isVisible);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [emailLocal, emailDomain] = federation.email.split('@');

  return (
    <div className={open ? 'site-shell menu-open' : 'site-shell'}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar open={open} setOpen={setOpen} burgerRef={burger} />
      <main
        ref={main}
        id="main-content"
        tabIndex={-1}
        className={location.pathname === '/' ? '' : 'inner-page'}
      >
        <Breadcrumbs />
        <Outlet />
      </main>
      <footer ref={footer} id="contact-footer" className="site-footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-notes">
              <div>
                <strong>National Lawyers Federation</strong>
                <p>Founder President: {federation.founder}, Advocate, High Court</p>
              </div>
              <div>
                <strong>Telephone &amp; Grievance Desk</strong>
                <p>
                  <a href={`tel:${federation.phone}`}>{federation.displayPhone}</a>
                </p>
              </div>
              <div>
                <strong>Federation Brochure</strong>
                <p>
                  <a href={federation.brochure} target="_blank" rel="noopener noreferrer">
                    Download PDF prospectus
                  </a>
                </p>
              </div>
            </div>
            <button
              type="button"
              className="footer-top-link"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'instant'
                    : 'smooth',
                });
                main.current?.focus({ preventScroll: true });
              }}
            >
              Back to top ↑
            </button>
          </div>

          <a
            href={`mailto:${federation.email}`}
            className="footer-email-display"
            aria-label={`Email ${federation.email}`}
          >
            {emailLocal}
            <span>@{emailDomain}</span>
          </a>

          <div className="footer-columns">
            <div>
              <h3>The federation</h3>
              {sitePages
                .filter((page) =>
                  [
                    '/charter',
                    '/working-principle',
                    '/structure',
                    '/leadership',
                    '/resources',
                  ].includes(page.path),
                )
                .map((page) => (
                  <Link key={page.path} to={page.path}>
                    {page.title}
                  </Link>
                ))}
            </div>
            <div>
              <h3>For advocates</h3>
              {sitePages
                .filter((page) =>
                  ['/membership', '/welfare', '/grievances', '/learning', '/directory'].includes(
                    page.path,
                  ),
                )
                .map((page) => (
                  <Link key={page.path} to={page.path}>
                    {page.title}
                  </Link>
                ))}
            </div>
            <div>
              <h3>Stay connected</h3>
              {sitePages
                .filter((page) => ['/community', '/portal', '/contact'].includes(page.path))
                .map((page) => (
                  <Link key={page.path} to={page.path}>
                    {page.title}
                  </Link>
                ))}
              <a href={federation.whatsappGroup} target="_blank" rel="noopener noreferrer">
                WhatsApp Community
              </a>
            </div>
          </div>

          <div className="footer-meta">
            <p>
              © {new Date().getFullYear()} National Lawyers Federation (NLF). Unity, Welfare,
              Dignity and Protection across India.
            </p>
            <p>
              Pictures:{' '}
              <a
                href="https://commons.wikimedia.org/wiki/File:Supreme_Court_of_India_01.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                “Supreme Court of India 01”
              </a>{' '}
              by Subhashish Panigrahi (CC BY-SA 4.0);{' '}
              <a
                href="https://commons.wikimedia.org/wiki/File:High_Court_Of_Telangana_State_(89002).jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                “High Court Of Telangana State (89002)”
              </a>{' '}
              and{' '}
              <a
                href="https://commons.wikimedia.org/wiki/File:High_Court_Of_Telangana_State_(73051).jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                “(73051)”
              </a>{' '}
              by Kavali Chandrakanth KCK (CC BY-SA 4.0);{' '}
              <a
                href="https://commons.wikimedia.org/wiki/File:Calcutta_High_Court_-_01.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                “Calcutta High Court - 01”
              </a>{' '}
              by Indrajit Das (CC BY-SA 4.0);{' '}
              <a
                href="https://commons.wikimedia.org/wiki/File:Chennai_High_Court.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                “Chennai High Court”
              </a>{' '}
              by Yoga Balaji (CC BY 3.0);{' '}
              <a
                href="https://commons.wikimedia.org/wiki/File:Indiana_Supreme_Court_Law_Library_rare_books_shelf.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                “Indiana Supreme Court Law Library rare books shelf”
              </a>{' '}
              by Dominic (CC0), via Wikimedia Commons.
            </p>
          </div>
        </div>
      </footer>
      <button
        type="button"
        className={`back-top ${showTop ? 'visible' : ''}`}
        hidden={open}
        tabIndex={showTop ? 0 : -1}
        aria-label="Back to top"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          });
          main.current?.focus({ preventScroll: true });
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <path d="m6 14 6-6 6 6M12 8v12" />
        </svg>
      </button>
    </div>
  );
}
