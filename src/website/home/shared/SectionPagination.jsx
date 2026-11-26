import './section-pagination.css';
import { useEffect, useState } from 'react';

const HOME_SECTIONS = [
  { id: 'home', label: 'Overview', dark: true },
  { id: 'aims', label: 'Mandate & Aims', dark: false },
  { id: 'principle', label: 'Working Principle', dark: true },
  { id: 'structure', label: 'Our Structure', dark: false },
  { id: 'leadership', label: 'Leadership', dark: false },
  { id: 'portal', label: 'Member Portal', dark: true },
  { id: 'join', label: 'Membership', dark: false },
  { id: 'home-contact', label: 'Home Contact', dark: true },
];

export default function SectionPagination() {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    let rafId = 0;

    const updateActive = () => {
      const probeY = window.innerHeight * 0.42;
      let current = HOME_SECTIONS[0].id;

      for (const section of HOME_SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY) {
          current = section.id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      if (nearBottom) {
        current = HOME_SECTIONS[HOME_SECTIONS.length - 1].id;
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY);
    window.scrollTo({
      top,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  };

  const activeSection = HOME_SECTIONS.find((s) => s.id === activeId) || HOME_SECTIONS[0];

  return (
    <div
      className={`section-pagination${activeSection.dark ? ' is-on-dark' : ' is-on-light'}`}
      role="navigation"
      aria-label="Home sections"
    >
      {HOME_SECTIONS.map((section, index) => {
        const isActive = activeId === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`section-page-dot${isActive ? ' is-active' : ''}`}
            aria-label={`Jump to ${section.label}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={(event) => scrollToSection(event, section.id)}
          >
            <span className="section-page-pip" aria-hidden="true" />
            <span className="section-page-tooltip" aria-hidden="true">
              <small>0{index + 1}</small>
              {section.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
