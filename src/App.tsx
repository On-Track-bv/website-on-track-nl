import { AppShell, Text, Group, Container, Space } from '@mantine/core';
import { Header } from './components/header/Header';


function App() {

  return (
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
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
