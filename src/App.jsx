import LeadershipPage from './website/pages/LeadershipPage.jsx';
import ResourcesPage from './website/pages/ResourcesPage.jsx';
import CommunityPage from './website/pages/CommunityPage.jsx';
import WelfarePage from './website/pages/WelfarePage.jsx';
import GrievancePage from './website/pages/GrievancePage.jsx';
import LearningPage from './website/pages/LearningPage.jsx';
import DirectoryPage from './website/pages/DirectoryPage.jsx';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './website/components/SiteLayout.jsx';
import HomePage from './website/pages/HomePage.jsx';
import CharterPage from './website/pages/CharterPage.jsx';
import PrinciplePage from './website/pages/PrinciplePage.jsx';
import StructurePage from './website/pages/StructurePage.jsx';
import MembershipPage from './website/pages/MembershipPage.jsx';
import PortalPage from './website/pages/PortalPage.jsx';
import ContactPage from './website/pages/ContactPage.jsx';
import NotFoundPage from './website/pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="charter" element={<CharterPage />} />
        <Route path="working-principle" element={<PrinciplePage />} />
        <Route path="structure" element={<StructurePage />} />
        <Route path="membership" element={<MembershipPage />} />
        <Route path="portal" element={<PortalPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="leadership" element={<LeadershipPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="welfare" element={<WelfarePage />} />
        <Route path="grievances" element={<GrievancePage />} />
        <Route path="learning" element={<LearningPage />} />
        <Route path="directory" element={<DirectoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
