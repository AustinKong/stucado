import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { retrieveTasks } from '@services/tasks';
import { retrieveTimetable } from '@services/timetable';

import Dashboard from '@components/pages/Dashboard';
import Layout from '@components/generic/Layout';

function App() {
  useEffect(() => {
    void retrieveTasks();
    void retrieveTimetable();
  }, []);

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
