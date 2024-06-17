import { Routes, Route, HashRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useRetrieveData from '@data/hooks/useRetrieveData';

import Dashboard from '@components/pages/Dashboard';
import Settings from '@components/pages/Settings';
import Schedule from '@components/pages/Schedule';
import Statistics from '@components/pages/Statistics';
import Layout from '@components/generic/Layout';
import Onboarding from '@components/pages/Onboarding';

function App() {
  const hasOnboarded = useSelector((state) => state.settings.hasOnboarded);
  useRetrieveData();

  if (/*!hasOnboarded*/ true) {
    return <Onboarding />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
