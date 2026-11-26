import crestImg from '../../../../assets/nlf-crest.webp';
import Silk from './Silk.jsx';
import { Link } from 'react-router-dom';
import { heroContent } from './hero.content.js';
import './hero.css';

export default function Hero() {
  return (
    <header className="hero-masthead" id="home">
      <div className="hero-silk-layer" aria-hidden="true">
        <Silk
          color="#13294b"
          sheenColor="#ee9b1e"
          speed={2.2}
          scale={0.76}
          rotation={-0.4}
          noiseIntensity={0.5}
          sheen={0.52}
          depth={0.68}
          glow={0.2}
          interactionStrength={0.65}
        />
        <div className="hero-readability-scrim" />
      </div>

      <div className="wrap hero-foreground">
        <div className="hero-copy-block">
          <div className="hero-motto-row">
            <span className="hero-motto-text">{heroContent.motto}</span>
            <span className="hero-motto-rule" aria-hidden="true" />
          </div>

          <h1 className="hero-headline">
            {heroContent.headingLine1}
            <br />
            {heroContent.headingLine2}
            <br />
            <em className="hero-headline-accent">{heroContent.headingAccent}</em>
          </h1>

          <p className="hero-statement">{heroContent.description}</p>

          <div className="hero-actions">
            <Link to={heroContent.primaryAction.to} className="hero-btn-pill">
              <span>{heroContent.primaryAction.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link to={heroContent.secondaryAction.to} className="hero-link-subtle">
              {heroContent.secondaryAction.label}
            </Link>
          </div>
        </div>

        <div className="hero-emblem-stage" aria-hidden="true">
          <span className="hero-watermark">NLF</span>
          <svg
            className="hero-gold-ribbon"
            viewBox="0 0 600 260"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M -40 230 C 120 190, 260 110, 460 195 C 520 220, 580 238, 630 245"
              stroke="url(#hero-ribbon-grad)"
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient
                id="hero-ribbon-grad"
                x1="0"
                y1="0"
                x2="600"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#f09d1c" stopOpacity="0" />
                <stop offset="45%" stopColor="#ffb338" stopOpacity="0.72" />
                <stop offset="100%" stopColor="#f09d1c" stopOpacity="0.08" />
              </linearGradient>
            </defs>
          </svg>
          <div className="hero-crest-pedestal" />
          <img
            className="hero-crest-emblem"
            src={crestImg}
            alt="Official Seal of the National Lawyers Federation"
            width="420"
            height="420"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <div className="hero-wave-transition">
        <svg
          className="hero-wave-svg"
          viewBox="0 0 1440 168"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 112 C 260 155, 620 162, 920 120 C 1150 88, 1320 42, 1440 28 L 1440 168 L 0 168 Z"
            fill="rgba(250, 249, 246, 0.14)"
          />
          <path
            d="M0 98 C 320 168, 720 170, 1040 122 C 1230 94, 1365 76, 1440 82 L 1440 168 L 0 168 Z"
            fill="#faf9f6"
          />
          <path
            d="M0 98 C 320 168, 720 170, 1040 122 C 1230 94, 1365 76, 1440 82"
            fill="none"
            stroke="#f09d1c"
            strokeWidth="1.75"
          />
        </svg>

        <a
          href="#aims"
          className="hero-scroll-pill"
          aria-label="Scroll to federation mandate and aims"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById('aims')?.scrollIntoView({
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'instant'
                : 'smooth',
            });
          }}
        >
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M8 2v13M3.5 10.5 8 15l4.5-4.5" />
          </svg>
        </a>
      </div>
    </header>
  );
}
