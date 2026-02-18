import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage/AuthPage';
import DashboardPage from './components/DashboardPage/DashboardPage';
import NavigationPage from './components/NavigationPage/NavigationPage';
import EntryPage from './components/EntryPage/EntryPage';
import WorkshopPage from './components/WorkshopPage/WorkshopPage';
import ExitPage from './components/ExitPage/ExitPage';
import MonitoringPage from './components/MonitoringPage/MonitoringPage';
import CarDetailsPage from "./components/Templates/CarDetailsPage/CarDetailsPage.tsx";
import ProductListPage from "./components/ProductListPage/ProductListPage.tsx";
import DtcNavigationPage from './components/DtcSection/NavigationPage/NavigationPage';
import CheckPage from "./components/DtcSection/CheckPage/CheckPage";
import ErrorPage from './components/ErrorPage/ErrorPage';
const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace />: <Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" replace />} />
          <Route path="/navigate" element={isAuthenticated ? <NavigationPage /> : <Navigate to="/auth" replace />} />
          <Route path="/entry" element={isAuthenticated ? <EntryPage /> : <Navigate to="/auth" replace />} />
          <Route path="/workshop" element={isAuthenticated ? <WorkshopPage /> : <Navigate to="/auth" replace />} />
          <Route path="/exit" element={isAuthenticated ? <ExitPage /> : <Navigate to="/auth" replace />} />
          <Route path="/monitoring" element={isAuthenticated ? <MonitoringPage /> : <Navigate to="/auth" replace />} />
          <Route path="/monitoring/vehicle/:carNumber" element={<CarDetailsPage source="monitoring" />} />
          <Route path="/entry/vehicle/:carNumber" element={<CarDetailsPage source="entry" />} />
          <Route path="/workshop/vehicle/:carNumber" element={<CarDetailsPage source="workshop" />} />
          <Route path="/exit/vehicle/:carNumber" element={<CarDetailsPage source="exit" />} />
          <Route path="/exit/vehicle/scaning/:carNumber" element={<ProductListPage />} />

          <Route path="/dtc/navigate" element={<DtcNavigationPage />} />
          <Route path="/dtc/check" element={<CheckPage />} />

          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;