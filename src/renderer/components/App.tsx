import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { retrieveTasks } from 'Renderer/services/tasks'
import { retrieveTimetable } from 'Renderer/services/timetable'

import Dashboard from 'Components/pages/Dashboard'
import Layout from 'Components/Layout'

function App() {
  useEffect(() => {
    void retrieveTasks();
    void retrieveTimetable();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          {/* TODO: Define 404 page */}
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
