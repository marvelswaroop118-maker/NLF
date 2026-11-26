import '../home/shared/home-snap.css';
import { useEffect } from 'react';
import Hero from '../home/hero/Hero.jsx';
import Leadership from '../home/leadership/Leadership.jsx';
import HomeContact from '../home/contact/HomeContact.jsx';
import SectionPagination from '../home/shared/SectionPagination.jsx';
import CharterPage from './CharterPage.jsx';
import PrinciplePage from './PrinciplePage.jsx';
import StructurePage from './StructurePage.jsx';
import MembershipPage from './MembershipPage.jsx';
import PortalPage from './PortalPage.jsx';

export default function HomePage() {
  useEffect(() => {
    document.documentElement.classList.add('home-snap-active');
    return () => {
      document.documentElement.classList.remove('home-snap-active');
    };
  }, []);

  return (
    <>
      <SectionPagination />
      <Hero />
      <CharterPage embedded />
      <PrinciplePage embedded />
      <StructurePage embedded />
      <Leadership embedded />
      <PortalPage embedded />
      <MembershipPage embedded />
      <HomeContact />
    </>
  );
}
