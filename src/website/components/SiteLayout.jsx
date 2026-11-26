import Breadcrumbs from './Breadcrumbs.jsx';
import { sitePages, primaryPaths, getSitePage } from '../data/site.js';
import { federation } from '../../shared/config.js';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import ContactDetails from './ContactDetails.jsx';

export default function SiteLayout() {
  const links = sitePages
    .filter((page) => primaryPaths.includes(page.path))
    .map((page) => [page.path, page.title]);
  const explore = useRef(null);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const main = useRef(null),
    footer = useRef(null),
    burger = useRef(null),
    sheet = useRef(null);
  const location = useLocation();
  const firstRender = useRef(true);
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!firstRender.current) main.current?.focus({ preventScroll: true });
    firstRender.current = false;
    if (explore.current) explore.current.open = false;
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
            target.animate(
              [
                { opacity: 0.35, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'none' },
              ],
              { duration: 650, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
            );
          }
          observer.unobserve(target);
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.rv, .hair, .win').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);
  useEffect(() => {
    let frame;
    const paint = () => {
      const range = document.documentElement.scrollHeight - innerHeight;
      setProgress(range > 0 ? scrollY / range : 0);
      setScrolled(scrollY > 24);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    addEventListener('scroll', schedule, { passive: true });
    paint();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', schedule);
      resize.disconnect();
    };
  }, []);
  useEffect(() => {
    main.current.inert = open;
    if (footer.current) footer.current.inert = open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) sheet.current.querySelector('a')?.focus();
    const onKey = (event) => {
      if (!open) return;
      if (event.key === 'Escape') {
        setOpen(false);
        burger.current.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = [burger.current, ...sheet.current.querySelectorAll('a')];
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault();
        items.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
        event.preventDefault();
        items[0].focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);
  useEffect(() => {
    const desktop = matchMedia('(min-width: 1121px)');
    const close = (event) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener('change', close);
    return () => desktop.removeEventListener('change', close);
  }, []);
  useEffect(() => {
    const dismiss = (event) => {
      if (explore.current?.open && !explore.current.contains(event.target))
        explore.current.open = false;
    };
    const escape = (event) => {
      if (event.key === 'Escape' && explore.current?.open) {
        explore.current.open = false;
        explore.current.querySelector('summary').focus();
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, []);
  const closeMenu = () => {
    setOpen(false);
    burger.current?.focus();
  };
  return (
    <div className={open ? 'site-shell menu-open' : 'site-shell'}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div id="bar" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
      <nav
        id="nav"
        className={[
          scrolled ? 'stuck' : '',
          location.pathname === '/' && !scrolled && !open ? 'hero-top' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="Primary"
      >
        <div className="wrap">
          <Link to="/" className="brand" aria-label="National Lawyers Federation home">
            <div className="crest" aria-hidden="true" />
            <span>
              NATIONAL LAWYERS
              <br />
              FEDERATION
            </span>
          </Link>
          <div className="links">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'on' : '')}>
                {label}
              </NavLink>
            ))}
            <details className="explore-menu" ref={explore}>
              <summary>Explore</summary>
              <div className="explore-popover">
                {sitePages
                  .filter((page) => page.path !== '/')
                  .map((page) => (
                    <Link key={page.path} to={page.path}>
                      {page.title}
                    </Link>
                  ))}
              </div>
            </details>
          </div>
          <div className="cta">
            <Link to="/membership" className="btn btn-solid">
              Join NLF
            </Link>
            <button
              ref={burger}
              type="button"
              className="burger"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              <i />
            </button>
          </div>
        </div>
      </nav>
      <div
        className="sheet"
        id="mobile-navigation"
        ref={sheet}
        inert={!open}
        aria-label="Mobile navigation"
      >
        {sitePages
          .filter((page) => !['/', '/membership'].includes(page.path))
          .map((page) => (
            <Link key={page.path} to={page.path} className="l" onClick={closeMenu}>
              {page.title}
            </Link>
          ))}
        <Link to="/membership" className="btn btn-solid" onClick={closeMenu}>
          Join NLF
        </Link>
      </div>
      <main
        ref={main}
        id="main-content"
        tabIndex={-1}
        className={location.pathname === '/' ? '' : 'inner-page'}
      >
        <Breadcrumbs />
        <Outlet />
      </main>
      {location.pathname !== '/' && (
        <footer ref={footer} id="contact-footer">
          <div className="wrap">
            <div className="big-cta rv">
              <h2>
                For a stronger and <em>united</em> legal fraternity.
              </h2>
              <Link to="/membership" className="btn btn-gold">
                Apply for Membership
              </Link>
            </div>
            {location.pathname !== '/contact' && <ContactDetails />}
            <div className="footer-sitemap">
              <div>
                <Link to="/" className="footer-brand">
                  National Lawyers
                  <br />
                  Federation
                </Link>
                <p>
                  A collective platform for the welfare, dignity, protection and rights of
                  advocates.
                </p>
                <a
                  className="text-link"
                  href={federation.whatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on WhatsApp
                </a>
              </div>
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
              </div>
            </div>
            <div className="fbot">
              <span>
                © {new Date().getFullYear()} National Lawyers Federation (NLF). Unity · Welfare ·
                Dignity · Protection.
              </span>
              <span className="quick">
                <Link to="/charter">Constitutional objects</Link>
                <Link to="/grievances">Grievance &amp; Protection</Link>
                <Link to="/contact">Contact</Link>
              </span>
            </div>
          </div>
        </footer>
      )}
      <button
        type="button"
        className={`back-top ${progress > 0.1 ? 'visible' : ''}`}
        hidden={open}
        tabIndex={progress > 0.1 ? 0 : -1}
        aria-label="Back to top"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          });
          main.current.focus({ preventScroll: true });
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="m6 14 6-6 6 6M12 8v12" />
        </svg>
      </button>
    </div>
  );
}
