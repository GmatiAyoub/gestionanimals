import { BrowserRouter as Router, Routes, Route } from  'react-router-dom';
import Layout from './components/Layout';

import Dashboard from './components/Dashboard';
import Animals from './components/Animals';
import Calendar from './components/Calendaar';
import Treatments from './components/Treatments';
import Reports from './components/Reports';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <Routes>

        {/* LAYOUT PERSISTANT */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="animals" element={<Animals />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="treatments" element={<Treatments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
