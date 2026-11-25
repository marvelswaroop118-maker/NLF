import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supremeCourtImg from '../../../../assets/supreme-court-of-india-01.jpg';
import madrasCourtImg from '../../../../assets/chennai-high-court.jpg';
import telanganaCourtImg from '../../../../assets/high-court-of-telangana-state-89002.jpg';
import brochureCoverImg from '../../../../assets/brochure-cover.jpg';
import founderPortraitImg from '../../../../assets/founder-president.jpg';
import { heroContent } from './hero.content.js';
import './hero.css';

const HERO_SLIDES = [
  {
    src: supremeCourtImg,
    alt: 'Central Wing colonnade and copper dome of the Supreme Court of India',
    width: 1920,
    height: 1196,
    caption: 'Supreme Court of India · National Mandate',
  },
  {
    src: madrasCourtImg,
    alt: 'Indo-Saracenic sandstone towers of the High Court at Chennai',
    width: 1920,
    height: 1285,
    caption: 'High Courts · State Bar Representation',
  },
  {
    src: telanganaCourtImg,
    alt: 'Domes and riverfront facade of the High Court of Telangana',
    width: 1920,
    height: 1440,
    caption: 'District & Bar Units · Local Committees',
  },
];

const PLATE_IMAGES = {
  brochure: { src: brochureCoverImg, width: 600, height: 848, position: 'center top' },
  founder: { src: founderPortraitImg, width: 1000, height: 1000, position: 'center 18%' },
};

export default function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer;
    const start = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        if (!document.hidden) {
          setSlideIndex((current) => (current + 1) % HERO_SLIDES.length);
        }
      }, 6000);
    };
    const onVis = () => {
      if (document.hidden) clearInterval(timer);
      else start();
    };
    start();
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <header className="hero-masthead" id="home">
      <div className="hero-stage" aria-hidden="true">
        {HERO_SLIDES.map((slide, index) => (
          <img
            key={slide.caption}
            src={slide.src}
            alt=""
            width={slide.width}
            height={slide.height}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`hero-backdrop ${index === slideIndex ? 'is-active' : ''}`}
          />
        ))}
        <div className="hero-scrim" />
      </div>

      <div className="wrap hero-foreground">
        <div className="hero-copy-block">
          <h1 className="hero-headline">
            {heroContent.heading}
            <br />
            {heroContent.headingLine2}
          </h1>
          <p className="hero-statement">{heroContent.description}</p>
          <div className="actions hero-actions">
            <Link to={heroContent.primaryAction.to} className="btn btn-gold">
              {heroContent.primaryAction.label}
            </Link>
            <Link to={heroContent.secondaryAction.to} className="text-link hero-secondary-link">
              {heroContent.secondaryAction.label}
            </Link>
          </div>
        </div>

        <div className="hero-corner-plates">
          {heroContent.plates.map((plate) => {
            const media = PLATE_IMAGES[plate.imageKey];
            return (
              <Link key={plate.to} to={plate.to} className="hero-plate">
                <div className="hero-plate-media">
                  <img
                    src={media.src}
                    alt={plate.alt}
                    width={media.width}
                    height={media.height}
                    style={{ objectPosition: media.position }}
                    decoding="async"
                  />
                </div>
                <div className="hero-plate-bar">
                  <span>{plate.title}</span>
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
