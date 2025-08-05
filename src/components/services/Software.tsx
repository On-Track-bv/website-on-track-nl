
import { Container, SimpleGrid, Title, Text } from '@mantine/core';
import classes from './Services.module.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRole } from '../../contexts/RoleContext';
import { servicesContent } from './Services';
import { Feature, getRoleGroup } from './FeatureSectionUtils';

export function Software() {
  const { lang } = useLanguage();
  const { role } = useRole();
  const group = getRoleGroup(role?.key);
  const t = servicesContent[group][lang];

  return (
    <Container className={classes.wrapper} id="software">
      <Title className={classes.title}>{t.softwareTitle}</Title>
      <Text className={classes.description}>{t.softwareDescription}</Text>
      <SimpleGrid
        mt={40}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {t.software.map((feature: any, idx: number) => (
          <Feature key={idx} {...feature} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
