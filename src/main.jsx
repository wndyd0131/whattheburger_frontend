import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App";
import { UserProvider } from './contexts/UserContext';
import Layout from './Layout';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App/>
    </UserProvider>
  </StrictMode>,
)
