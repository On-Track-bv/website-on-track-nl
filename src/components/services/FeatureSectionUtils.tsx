import { Text, Collapse, ActionIcon } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import classes from './Services.module.css';

export interface FeatureProps {
  icon?: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  const [opened, setOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className={classes.feature} onClick={() => setOpened(!opened)}>
        {Icon && (
          <span className={classes.icon}><Icon size={22} stroke={1.5} /></span>
        )}
        <ActionIcon
          variant="subtle"
          color="var(--my-accent2)"
          size="sm"
          className={classes.expandButton}
          onClick={(e) => {
            e.stopPropagation(); // Prevent double trigger
            setOpened(!opened);
          }}
        >
          {opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        </ActionIcon>
        <Text mt="sm" mb={7} className={classes.featureTitle}>
          {title}
        </Text>
        <Collapse in={opened}>
          <Text size="sm" c="dimmed" lh={1.6} className={classes.featureDescription}>
            {description}
          </Text>
        </Collapse>
      </div>
    );
  }

  // Desktop version - always expanded
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
