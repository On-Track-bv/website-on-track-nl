import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RoleProvider } from './contexts/RoleContext';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './styles/colors.css';
import './styles/fonts.css';
import { theme } from './theme';
import { LanguageProvider } from './contexts/LanguageContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <LanguageProvider>
      <RoleProvider>
        <App />
      </RoleProvider>
      </LanguageProvider>
    </MantineProvider>
  </StrictMode>,
)