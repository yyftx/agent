import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import DashboardPage from './pages/DashboardPage'
import MindMapPage from './pages/MindMapPage'
import DecisionWizardPage from './pages/DecisionWizardPage'
import ChecklistPage from './pages/ChecklistPage'
import TitleWorkshopPage from './pages/TitleWorkshopPage'
import EvidenceChainPage from './pages/EvidenceChainPage'
import FatalErrorsPage from './pages/FatalErrorsPage'
import TemplatesPage from './pages/TemplatesPage'
import TimelinePage from './pages/TimelinePage'
import TeamPage from './pages/TeamPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/mindmap" element={<MindMapPage />} />
        <Route path="/decision" element={<DecisionWizardPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/title-workshop" element={<TitleWorkshopPage />} />
        <Route path="/evidence-chain" element={<EvidenceChainPage />} />
        <Route path="/errors" element={<FatalErrorsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/cases" element={<CaseStudiesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
