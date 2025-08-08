import { Text } from '@mantine/core';
import classes from './Services.module.css';

export interface FeatureProps {
  icon?: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
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

export function getRoleGroup(roleKey: string | undefined): 'basic' | 'bim' | 'data' {
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
