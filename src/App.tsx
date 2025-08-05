import { AppShell, Container, Box } from '@mantine/core';
import { Header } from './components/header/Header';
import { Contact } from './components/contact/Contact';
import './styles/colors.css';
import './styles/fonts.css';
import { Home } from './components/home/Home';
import { AboutUs } from './components/aboutUs/AboutUs';
import { Footer } from './components/footer/Footer';
import { VisionMission } from './components/visionMission/VisionMission';
import { Services } from './components/services/Services';


function App() {

  return (
    <AppShell
      header={{ height: 69 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Container size="xl" style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box id="top" my="xl">
            <Home />
          </Box>
          <Box id="why" my="xl">
            <VisionMission />
          </Box>
          <Box id="what" my="xl">
            <Services />
          </Box>
          <Box id="who" my="xl">
            <AboutUs />
          </Box>
          <Box id="contact-us" my="xl">
            <Contact />
          </Box>
        </Container>
      </AppShell.Main>
      <Footer />
    </AppShell>
  )
}

export default App
