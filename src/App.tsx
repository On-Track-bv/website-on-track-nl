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
import { SEO } from './components/seo/SEO';
import CrawlerProtection from './components/crawlerProtection/CrawlerProtection';

function App() {

  return (
    <CrawlerProtection 
      level="moderate"
      onCrawlerDetected={() => {
        // Superbasic benadering: alleen loggen, geen blokkering voor basic website
        console.log('Crawler gedetecteerd - maar geen verdere actie voor basic website');
      }}
    >
          {/* SEO Optimization - alleen voor Google vindbaarheid */}
      <SEO 
        title="On-Track - Building Connections | Professionele Verbindingen"
        description="On-Track helpt bij het bouwen van professionele verbindingen en netwerken. Ontdek onze diensten voor zakelijke connecties en samenwerking."
        keywords="On-Track, building connections, professionele netwerken, zakelijke verbindingen, samenwerking, business networking"
        canonical="https://on-track.nl/"
      />
      
    <AppShell
      header={{ height: 69 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Container size="xl" style={{ textAlign: 'center' }}>
          
          <Box id="top"  my="xl">
            <Home />
          </Box>
          <Box id="why"  my="xl">
            <VisionMission />
          </Box>
          <Box id="what"  my="xl">
            <Services />
          </Box>
          <Box id="who"  my="xl">
            <AboutUs />
          </Box>
          

          {/* <Group align="center" justify="center" gap="xl">
            <Text size="xl" fw={700} span style={{ fontSize: 32, lineHeight: 1 }} role="img" aria-label="construction">🚧</Text>
            <Text size="xl" fw={700}>Welcome to <b>On-Track</b></Text>
            <Text size="xl" fw={700} span style={{ fontSize: 32, lineHeight: 1 }} role="img" aria-label="construction">🚧</Text>
          </Group>
          <Space h="xl" />
          <Text>
            We are working hard to bring you something awesome. Please check back soon!
          </Text> */}

          {/* <Box
            my="xl"
            style={{
              width: 200, // or any size you prefer
              height: 5000,
              backgroundColor: '#ccc', // change to your desired color
              margin: '0 auto', // center horizontally
            }}
          /> */}

          <Box id="contact-us" my="xl">
            <Contact />
          </Box>
        </Container>
        <Footer />
      </AppShell.Main>
    </AppShell>
    </CrawlerProtection>
  )
}

export default App
