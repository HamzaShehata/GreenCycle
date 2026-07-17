import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { RequestsProvider } from './context/RequestsContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { UIProvider } from './context/UIContext.jsx';
import './index.css';
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RequestsProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </RequestsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);