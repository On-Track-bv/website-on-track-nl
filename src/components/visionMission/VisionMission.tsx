import { Container, Text, Title, Paper } from '@mantine/core';
import classes from './VisionMission.module.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRef, useEffect, useState } from 'react';

import visionImg from '../../assets/Amsterdam-zuidas.png';
import missionImg from '../../assets/Verbinding.png';

// const visionImg = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80";
// const missionImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80";

const texts = {
  en: {
    visionTitle: 'Our vision',
    vision: 'We believe in a world where data flows seamlessly, empowering organizations to innovate and connect without barriers. Our vision is to make digital transformation accessible, intuitive, and human-centered.',
    missionTitle: 'Our mission',
    mission: 'We build bridges between your software and your people. Our mission is to deliver robust, scalable solutions that simplify complexity and unlock new possibilities for your business.',
  },
  nl: {
    visionTitle: 'Onze visie',
    vision: 'Wij geloven in een wereld waarin data moeiteloos stroomt en organisaties in staat stelt te innoveren en te verbinden zonder grenzen. Onze visie is digitale transformatie toegankelijk, intuïtief en mensgericht maken.',
    missionTitle: 'Onze missie',
    mission: 'Wij bouwen bruggen tussen jouw software en jouw mensen. Onze missie is om krachtige, schaalbare oplossingen te leveren die complexiteit vereenvoudigen en nieuwe mogelijkheden voor jouw organisatie ontsluiten.',
  },
};

export function VisionMission() {
  const { lang } = useLanguage();
  const t = texts[lang];

  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  // Dummy state to force re-render
  const [, setTick] = useState(0);

  useEffect(() => {
    let running = true;
    const loop = () => {
      setTick(t => t + 1);
      if (running) requestAnimationFrame(loop);
    };
    loop();
    return () => { running = false; };
  }, []);

  const getParallax = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { backgroundPosition: '50% 50%' };
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const boxHeight = rect.height;
    const scrollProgress = Math.min(
      Math.max((windowHeight - rect.top) / (windowHeight + boxHeight), 0),
      1
    );
    const parallaxY = 0 + (100 - 0) * scrollProgress;
    return { backgroundPosition: `50% ${parallaxY}%` };
  };

  return (
    <div className={classes.wrapper}>
      <div className={`${classes.section} ${classes.visionImage}`} ref={visionRef}>
        <div
          className={classes.fullImage}
          style={{
            backgroundImage: `url(${visionImg})`,
            ...getParallax(visionRef),
          }}
        />
      <Container size="xxl" className={classes.content}>
          <div className={`${classes.centeredText} ${classes.visionTextShift}`}>
    <Title order={2} className={classes.plainTitle}>{t.visionTitle}</Title>
    <Text className={classes.plainText}>{t.vision}</Text>
      </div>
  </Container>
      </div>
      <div className={`${classes.section} ${classes.missionImage}`} ref={missionRef}>
        <div
          className={classes.fullImage}
          style={{
            backgroundImage: `url(${missionImg})`,
            ...getParallax(missionRef),
          }}
        />
        <Container size="xxl" className={classes.content}>
          <div className={`${classes.centeredText} ${classes.missionTextShift}`}>
          <Title order={2} className={classes.plainTitle}>{t.missionTitle}</Title>
          <Text className={classes.plainText}>{t.mission}</Text>
      </div>
        </Container>
      </div>
    </div>
  );
}