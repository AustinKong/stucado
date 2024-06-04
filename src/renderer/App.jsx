import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { retrieveTasks } from '@services/tasks';
import { retrieveTimetable } from '@services/timetable';
import { retrieveSettings } from '@services/settings';

import Dashboard from '@components/pages/Dashboard';
import Layout from '@components/generic/Layout';
import Onboarding from '@components/pages/Onboarding';
import { useSelector } from 'react-redux';

function App() {
  const requiresOnboarding = useSelector((state) => !state.settings.hasOnboarded);

  useEffect(() => {
    void retrieveTasks();
    void retrieveTimetable();
    void retrieveSettings();
  }, []);

  if (requiresOnboarding) {
    return <Onboarding />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
