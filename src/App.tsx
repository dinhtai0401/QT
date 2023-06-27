import { HashRouter, Route, Routes } from 'react-router-dom';

import NotFound from './pages/notFound';
import Dashboard from './pages/dashboard';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
