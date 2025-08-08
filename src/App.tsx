import { AppShell, Text, Box, Group, Divider, Container, Space } from '@mantine/core';
import { Header } from './components/header/Header';
import { GetInTouch } from './components/getInTouch/GetInTouch';
import { FeaturesCard } from './components/featuresCard/FeaturesCard';
import { CrawlerProtection } from './components/crawlerProtection/CrawlerProtection';


function App() {

  return (
    <CrawlerProtection 
      level="moderate"
      onCrawlerDetected={() => {
        // Vriendelijke benadering: log en waarschuw zonder te blokkeren
        console.log('Ongewenste crawler activiteit gedetecteerd');
        // Optioneel: stuur analytics event of toon discrete waarschuwing
      }}
    >
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <Container size="xl" style={{ textAlign: 'center' }}>
            <Space h="xl" />
            <Group align="center" justify="center" gap="xl">
              <Text size="xl" fw={700} span style={{ fontSize: 32, lineHeight: 1 }} role="img" aria-label="construction">🚧</Text>
              <Text size="xl" fw={700}>Welcome to <b>On-Track</b></Text>
              <Text size="xl" fw={700} span style={{ fontSize: 32, lineHeight: 1 }} role="img" aria-label="construction">🚧</Text>
            </Group>
            <Space h="xl" />
            <Text>
              We are working hard to bring you something awesome. Please check back soon!
            </Text>
            <Divider my="xxl" />
            <Group id="features" my="xl" justify="center" gap="xl" wrap="wrap">
              <FeaturesCard />
              <FeaturesCard />
              <FeaturesCard />
            </Group>
            <Divider my="xl" />
            <Box id="contact-us" my="xl">
              <GetInTouch />
            </Box>
          </Container>
        </AppShell.Main>
      </AppShell>
    </CrawlerProtection>
  )
}

export default App
