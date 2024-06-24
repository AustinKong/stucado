import { Routes, Route, HashRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import useRetrieveData from '@data/hooks/useRetrieveData';

import Dashboard from '@components/pages/Dashboard';
import Settings from '@components/pages/Settings';
import Schedule from '@components/pages/Schedule';
import Statistics from '@components/pages/Statistics';
import Layout from '@components/generic/Layout';
import Pomodoro from '@components/pages/Pomodoro';
import Onboarding from '@components/pages/Onboarding';
import Loading from '@components/pages/Loading';

function App() {
  useRetrieveData();
  const hasOnboarded = useSelector((state) => state.settings.hasOnboarded);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // IM not sure how to do a proper page load, so we just wait 1 seconds
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a 1-second load time
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!hasOnboarded) {
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
          <Route path="/pomodoro" element={<Pomodoro />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
