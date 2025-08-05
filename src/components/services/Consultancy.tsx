import { Container, SimpleGrid, Text, Title } from '@mantine/core';
import classes from './Services.module.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRole } from '../../contexts/RoleContext';
import { servicesContent } from './Services';

interface FeatureProps {
  icon?: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div className={classes.feature}>
      {Icon && (
        <span className={classes.icon}><Icon size={22} stroke={1.5} /></span>
      )}
      <Text mt="sm" mb={7} className={classes.featureTitle}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6} className={classes.featureDescription}>
        {description}
      </Text>
    </div>
  );
}

function getRoleGroup(roleKey: string | undefined): 'basic' | 'bim' | 'data' {
  if (!roleKey) return 'basic';
  if ([
    'kringverjaardag',
    'directie',
    'opdrachtgever',
  ].includes(roleKey)) return 'basic';
  if ([
    'bouwinfra',
    'bimconsultant',
    'bimmanager',
    'overheid',
  ].includes(roleKey)) return 'bim';
  if ([
    'linkeddata',
    'developer',
  ].includes(roleKey)) return 'data';
  return 'basic';
}

export function Consultancy() {
  const { lang } = useLanguage();
  const { role } = useRole();
  const group = getRoleGroup(role?.key);
  const t = servicesContent[group][lang];

  return (
    <Container className={classes.wrapper} id="consultancy">
      <Title className={classes.title}>{t.consultancyTitle}</Title>
      <Text className={classes.description}>{t.consultancyDescription}</Text>
      <SimpleGrid
        mt={40}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {t.consultancy.map((feature: any, idx: number) => (
          <Feature key={idx} {...feature} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
