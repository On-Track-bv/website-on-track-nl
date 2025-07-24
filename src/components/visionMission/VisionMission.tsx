import { Container, Text, Title, Paper } from '@mantine/core';
import classes from './VisionMission.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

const visionImg = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80";
const missionImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80";

const texts = {
  en: {
    visionTitle: 'Our Vision',
    vision: 'We believe in a world where data flows seamlessly, empowering organizations to innovate and connect without barriers. Our vision is to make digital transformation accessible, intuitive, and human-centered.',
    missionTitle: 'Our Mission',
    mission: 'We build bridges between your software and your people. Our mission is to deliver robust, scalable solutions that simplify complexity and unlock new possibilities for your business.',
  },
  nl: {
    visionTitle: 'Onze Visie',
    vision: 'Wij geloven in een wereld waarin data moeiteloos stroomt en organisaties in staat stelt te innoveren en te verbinden zonder grenzen. Onze visie is digitale transformatie toegankelijk, intuïtief en mensgericht maken.',
    missionTitle: 'Onze Missie',
    mission: 'Wij bouwen bruggen tussen jouw software en jouw mensen. Onze missie is om krachtige, schaalbare oplossingen te leveren die complexiteit vereenvoudigen en nieuwe mogelijkheden voor jouw organisatie ontsluiten.',
  },
};

export function VisionMission() {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <div
          className={classes.fullImage}
          style={{ backgroundImage: `url(${visionImg})` }}
        />
        <Container size="md" className={classes.content}>
          <Paper shadow="xl" radius="md" className={classes.card} withBorder>
            <Title order={2} className={classes.title}>{t.visionTitle}</Title>
            <Text className={classes.text}>{t.vision}</Text>
          </Paper>
        </Container>
      </div>
      <div className={classes.section}>
        <div
          className={classes.fullImage}
          style={{ backgroundImage: `url(${missionImg})` }}
        />
        <Container size="md" className={classes.content}>
          <Paper shadow="xl" radius="md" className={classes.card} withBorder>
            <Title order={2} className={classes.title}>{t.missionTitle}</Title>
            <Text className={classes.text}>{t.mission}</Text>
          </Paper>
        </Container>
      </div>
    </div>
  );
}