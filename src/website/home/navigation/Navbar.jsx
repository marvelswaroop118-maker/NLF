import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import crestImg from '../../../../assets/nlf-crest.webp';
import { PRIMARY_NAV, EXPLORE_GROUPS } from './navigation.content.js';
import { federation } from '../../../shared/config.js';

export default function Navbar({ open, setOpen, burgerRef }) {
  const exploreRef = useRef(null);
  const sheetRef = useRef(null);
  const { pathname } = useLocation();

  const close = () => {
    setOpen(false);
    if (exploreRef.current) exploreRef.current.open = false;
  };

  useEffect(() => {
    if (exploreRef.current) exploreRef.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const dismiss = (event) => {
      if (event.type === 'pointerdown' && !exploreRef.current?.contains(event.target)) {
        exploreRef.current.open = false;
      }
      if (event.key === 'Escape' && exploreRef.current?.open) {
        exploreRef.current.open = false;
        exploreRef.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', dismiss);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', dismiss);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    sheetRef.current?.querySelector('a')?.focus();
    const trap = (event) => {
      if (event.key !== 'Tab') return;
      const links = [...sheetRef.current.querySelectorAll('a,button')].filter(
        (el) => el.getClientRects().length,
      );
      const first = links[0];
      const last = links.at(-1);
      const focused = document.activeElement;
      if (event.shiftKey && focused === first) {
        event.preventDefault();
        burgerRef.current?.focus();
      } else if (event.shiftKey && focused === burgerRef.current) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && focused === last) {
        event.preventDefault();
        burgerRef.current?.focus();
      } else if (!event.shiftKey && focused === burgerRef.current) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [open, burgerRef]);

  return (
    <>
      <nav id="nav" className="site-nav" aria-label="Primary navigation">
        <div className="wrap site-nav-inner">
          <Link
            to="/"
            className="nav-brand"
            onClick={close}
            aria-label="National Lawyers Federation home"
          >
            <img
              className="nav-crest-img"
              src={crestImg}
              width="40"
              height="40"
              alt="National Lawyers Federation emblem"
            />
            <span className="nav-brand-name">National Lawyers Federation</span>
          </Link>

          <div className="nav-links">
            {PRIMARY_NAV.map((item) => (
              <NavLink key={item.path} to={item.path} className="nav-link" onClick={close}>
                {item.label}
              </NavLink>
            ))}

            <details className="explore-menu" ref={exploreRef}>
              <summary className="explore-trigger">
                Explore
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.75" />
                </svg>
              </summary>
              <div className="explore-popover">
                {EXPLORE_GROUPS.map((group) => (
                  <div className="explore-group" key={group.category}>
                    <p className="explore-group-label">{group.category}</p>
                    {group.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className="explore-item"
                        onClick={close}
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </div>
                ))}
              </div>
            </details>
          </div>

          <div className="nav-actions">
            <Link to="/membership" className="btn btn-solid nav-join" onClick={close}>
              Join NLF
            </Link>
            <button
              ref={burgerRef}
              className="nav-burger"
              type="button"
              aria-controls="mobile-navigation"
              aria-expanded={open}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              onClick={() => {
                if (exploreRef.current) exploreRef.current.open = false;
                setOpen(!open);
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden="true"
              >
                {open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={sheetRef}
        id="mobile-navigation"
        className="mobile-drawer"
        role="navigation"
        aria-label="Mobile navigation"
        hidden={!open}
        inert={!open}
      >
        <div className="mobile-primary">
          {PRIMARY_NAV.map((item) => (
            <NavLink to={item.path} key={item.path} onClick={close}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="mobile-groups">
          {EXPLORE_GROUPS.map((group) => (
            <div key={group.category}>
              <p className="mobile-group-label">{group.category}</p>
              {group.items.map((item) => (
                <NavLink to={item.path} key={item.path} onClick={close}>
                  {item.title}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
        <div className="actions">
          <Link to="/membership" className="btn btn-solid mobile-cta" onClick={close}>
            Apply for membership
          </Link>
          <a
            className="text-link"
            href={federation.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            Connect on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
