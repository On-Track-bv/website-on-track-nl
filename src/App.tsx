import { AppShell, Text, Box, Group, Divider, Container, Space } from '@mantine/core';
import { Header } from './components/header/Header';
import { GetInTouch } from './components/getInTouch/GetInTouch';
import { FeaturesCard } from './components/featuresCard/FeaturesCard';
import { CrawlerProtection } from './components/crawlerProtection/CrawlerProtection';
import { SEO } from './components/seo/SEO';
// Analytics components weggehaald - niet nodig voor basic website


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
      
      {/* GEEN ANALYTICS - basic website heeft dit niet nodig */}
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <Container size="xl" style={{ textAlign: 'center' }}>
            {/* Hero Section */}
            <header>
              <Space h="xl" />
              <Group align="center" justify="center" gap="xl">
                <Text size="xl" fw={700} span style={{ fontSize: 32, lineHeight: 1 }} role="img" aria-label="construction">🚧</Text>
                <Text 
                  size="xl" 
                  fw={700} 
                  component="h1"
                  style={{ fontSize: '2.5rem', lineHeight: 1.2 }}
                >
                  Welcome to <strong>On-Track</strong>
                </Text>
                <Text size="xl" fw={700} span style={{ fontSize: 32, lineHeight: 1 }} role="img" aria-label="construction">🚧</Text>
              </Group>
              <Space h="xl" />
              <Text component="p" size="lg" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                We are working hard to bring you something awesome. Please check back soon!
              </Text>
            </header>
            
            <Divider my="xxl" />
            
            {/* Features Section */}
            <section id="features" aria-label="Features">
              <Text component="h2" size="xl" fw={600} mb="xl" style={{ fontSize: '2rem' }}>
                Our Services
              </Text>
              <Group my="xl" justify="center" gap="xl" wrap="wrap">
                <FeaturesCard />
                <FeaturesCard />
                <FeaturesCard />
              </Group>
            </section>
            
            <Divider my="xl" />
            
            {/* Contact Section */}
            <section id="contact-us" aria-label="Contact Information">
              <Text component="h2" size="xl" fw={600} mb="xl" style={{ fontSize: '2rem' }}>
                Get In Touch
              </Text>
              <Box my="xl">
                <GetInTouch />
              </Box>
            </section>
          </Container>
        </AppShell.Main>
      </AppShell>
    </CrawlerProtection>
  )
}

export default App
