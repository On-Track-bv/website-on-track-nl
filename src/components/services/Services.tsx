import {
  IconDatabase,
  IconBuildingBridge,
  IconSettingsAutomation,
  IconRepeat,
  IconCheckupList,
  IconApi,
  IconShieldCheck,
  IconMap,
} from '@tabler/icons-react';
import { Container, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './Services.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

const texts = {
  en: {
    consultancyTitle: 'Consultancy',
    consultancyDescription:
      'We help you structure, connect and optimize your information needs for seamless collaboration and process improvement.',
    softwareTitle: 'Software',
    softwareDescription:
      'Our software connects, validates and enriches your data from any source, making your information reliable and actionable.',
    consultancy: [
      {
        icon: IconDatabase,
        title: 'From Excel to database',
        description:
          'We help companies translate unstructured information needs (like Excel) into structured databases, ready for BIM and the construction process.',
      },
      {
        icon: IconBuildingBridge,
        title: 'Connecting with partners',
        description:
          'We ensure your information needs align with those of partners such as governments, manufacturers, contractors, and developers.',
      },
      {
        icon: IconSettingsAutomation,
        title: 'Process improvement',
        description:
          'We make sure data is delivered correctly and employees know how to use it, resulting in immediate process improvements.',
      },
      {
        icon: IconRepeat,
        title: 'Uniform information processing',
        description:
          'We ensure your company always sends and receives information in a consistent way, reducing time spent searching for the right data.',
      },
      {
        icon: IconCheckupList,
        title: 'Enrich, check, correct BIM models',
        description:
          'We ensure your BIM models meet your information needs exactly. We can do this for you or train your team, supported by our software.',
      },
    ],
    software: [
      {
        icon: IconApi,
        title: 'Connect data sources',
        description:
          'Add and correct information from various sources, such as APIs, databases, and files.',
      },
      {
        icon: IconShieldCheck,
        title: 'Information accuracy',
        description:
          'Use your data source to control the completeness and correctness of your information.',
      },
      {
        icon: IconMap,
        title: '3D environment data',
        description:
          'Start your project with a scan of your area. Know the boundaries and the situation before you begin.',
      },
    ],
  },
  nl: {
    consultancyTitle: 'Consultancy',
    consultancyDescription:
      'Wij helpen je om je informatiebehoefte te structureren, verbinden en optimaliseren voor soepele samenwerking en procesverbetering.',
    softwareTitle: 'Software',
    softwareDescription:
      'Onze software verbindt, valideert en verrijkt je data uit elke bron, zodat je informatie betrouwbaar en direct toepasbaar is.',
    consultancy: [
      {
        icon: IconDatabase,
        title: 'Van Excel naar database',
        description:
          'We helpen bedrijven om hun informatiebehoefte uit Excel of andere ongestructureerde bronnen om te zetten naar een database, klaar voor BIM en het bouwproces.',
      },
      {
        icon: IconBuildingBridge,
        title: 'Aansluiting met samenwerkingspartners',
        description:
          'We zorgen dat de informatiebehoefte van onze klanten aansluit bij die van samenwerkingspartners zoals overheden, fabrikanten, aannemers en ontwikkelaars.',
      },
      {
        icon: IconSettingsAutomation,
        title: 'Procesverbetering',
        description:
          'We zorgen dat data correct wordt aangeleverd en medewerkers weten wat ze ermee kunnen, wat direct procesverbetering oplevert.',
      },
      {
        icon: IconRepeat,
        title: 'Uniforme informatieverwerking',
        description:
          'We zorgen dat bedrijven hun informatie altijd op dezelfde manier ontvangen of versturen, zodat medewerkers minder hoeven te zoeken.',
      },
      {
        icon: IconCheckupList,
        title: 'Verrijken, controleren, corrigeren van BIM modellen',
        description:
          'Wij zorgen dat BIM modellen exact voldoen aan de informatiebehoefte. We kunnen dit voor je doen of je trainen, ondersteund door onze software.',
      },
    ],
    software: [
      {
        icon: IconApi,
        title: 'Databronnen verbinden',
        description:
          'Vul informatie toe en corrigeer zelf, met data uit verschillende bronnen zoals API’s, databases en bestanden.',
      },
      {
        icon: IconShieldCheck,
        title: 'Informatie juistheid',
        description:
          'Gebruik je databron om de volledigheid en juistheid van je informatie te beheersen.',
      },
      {
        icon: IconMap,
        title: '3D omgevingsdata',
        description:
          'Begin je project altijd met een scan van je gebied. Weet waar grenzen liggen en wat de situatie is.',
      },
    ],
  },
};

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div className={classes.feature}>
      <ThemeIcon
        variant="light"
        size={40}
        radius={40}
        className={classes.icon}
      >
        <Icon size={22} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7} className={classes.featureTitle}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6} className={classes.featureDescription}>
        {description}
      </Text>
    </div>
  );
}

export function Services() {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <Container className={classes.wrapper}>
      {/* Consultancy Section */}
      <Title className={classes.title}>{t.consultancyTitle}</Title>
      <Text className={classes.description}>{t.consultancyDescription}</Text>
      <SimpleGrid
        mt={40}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {t.consultancy.map((feature, idx) => (
          <Feature key={idx} {...feature} />
        ))}
      </SimpleGrid>

      {/* Software Section */}
      <Title className={classes.title} mt={80}>
        {t.softwareTitle}
      </Title>
      <Text className={classes.description}>{t.softwareDescription}</Text>
      <SimpleGrid
        mt={40}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {t.software.map((feature, idx) => (
          <Feature key={idx} {...feature} />
        ))}
      </SimpleGrid>
    </Container>
  );
}