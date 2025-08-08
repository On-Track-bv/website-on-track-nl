
import { Container, SimpleGrid, Title, Text } from '@mantine/core';
import classes from './Services.module.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRole } from '../../contexts/RoleContext';
import { servicesContent } from './servicesContent';
import { Feature, type FeatureProps } from './FeatureSectionUtils';
import { getRoleGroup } from '../../utils/roleUtils';

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
        {t.consultancy.map((feature: FeatureProps, idx: number) => (
          <Feature key={idx} {...feature} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
