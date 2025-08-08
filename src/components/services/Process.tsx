import { Container, Title, Text, Card, Stack, Group, Badge } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { IconFileCode, IconDatabase, IconApps } from '@tabler/icons-react';
import classes from './Process.module.css';

const processSteps = [
  {
    id: 'ils-creation',
    number: '01',
    title: 'ILS Creëren',
    subtitle: 'Goede basis leggen',
    icon: IconFileCode,
    description: 'We helpen met het creëren van een goede ILS. Heb je die zelf al? Perfect, goed startpunt.',
    details: 'Daarbij verbinden we altijd aan al bestaande standaarden en ILSen zodat jij niet het wiel helemaal opnieuw hoeft uit te vinden.',
    highlight: 'Startpunt & Standaarden'
  },
  {
    id: 'dictionary',
    number: '02', 
    title: 'Dictionary Opzetten',
    subtitle: 'Structuur aanbrengen',
    icon: IconDatabase,
    description: 'We zetten de ILS in een dictionary. We helpen bedrijven om hun informatiebehoefte uit Excel of andere ongestructureerde bronnen om te zetten naar een database.',
    details: 'Hiermee genereer je automatisch IDS bestanden en koppel je gemakkelijk met andere standaarden en software.',
    highlight: 'Database & IDS Generatie'
  },
  {
    id: 'integration',
    number: '03',
    title: 'Apps Koppelen', 
    subtitle: 'Implementatie in proces',
    icon: IconApps,
    description: 'We koppelen de ILS via apps aan jouw proces en software.',
    details: 'Modelleren • Controleren/Checken • Gebruiken',
    highlight: 'Volledige Integratie'
  }
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [isInScrollZone, setIsInScrollZone] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollCounterRef = useRef(0);
  const exitCooldownRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const programmaticScrollRef = useRef(false);

  useEffect(() => {
    // Initialize scroll position
    lastScrollYRef.current = window.scrollY;
    
    const handleWheel = (e: WheelEvent) => {
      if (!isInScrollZone || !sectionRef.current) return;

      e.preventDefault();
      
      // Accumulate scroll to prevent too fast stepping
      const delta = e.deltaY > 0 ? 1 : -1;
      scrollCounterRef.current += delta;
      
      // Lower threshold for easier exit
      const scrollThreshold = 2;
      
      if (scrollCounterRef.current >= scrollThreshold) {
        // Scroll down - next step
        if (activeStep < processSteps.length - 1) {
          setActiveStep(prev => prev + 1);
          scrollCounterRef.current = 0;
        } else {
          // At last step, exit scroll lock and continue scrolling
          setIsInScrollZone(false);
          scrollCounterRef.current = 0;
          exitCooldownRef.current = true;
          
          // Smooth exit scroll instead of jump
          window.scrollBy({ top: 300, behavior: 'smooth' });
          
          // Longer cooldown for smooth scroll (must be longer than scroll animation)
          setTimeout(() => {
            exitCooldownRef.current = false;
          }, 800);
        }
      } else if (scrollCounterRef.current <= -scrollThreshold) {
        // Scroll up - previous step
        if (activeStep > 0) {
          setActiveStep(prev => prev - 1);
          scrollCounterRef.current = 0;
        } else {
          // At first step, exit scroll lock and continue scrolling up
          setIsInScrollZone(false);
          scrollCounterRef.current = 0;
          exitCooldownRef.current = true;
          
          // Smooth exit scroll instead of jump
          window.scrollBy({ top: -300, behavior: 'smooth' });
          
          // Longer cooldown for smooth scroll (must be longer than scroll animation)
          setTimeout(() => {
            exitCooldownRef.current = false;
          }, 800);
        }
      }
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const headerHeight = 80; // Height of the header
      const windowHeight = window.innerHeight;
      
      // Skip direction detection during cooldown or programmatic scrolls
      if (exitCooldownRef.current || programmaticScrollRef.current) return;
      
      // Detect scroll direction
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = currentScrollY;
      
      // Debug logging in development
      if (import.meta.env.DEV) {
        console.log('Scroll Debug:', {
          scrollDirection,
          rectTop: rect.top,
          rectBottom: rect.bottom,
          headerHeight,
          windowHeight,
          isInScrollZone,
          currentScrollY,
          exitCooldown: exitCooldownRef.current
        });
      }
      
      // Simple and reliable activation logic:
      // Activate when scrolling INTO the section area (but not when exiting away from it)
      const sectionVisible = rect.top < windowHeight && rect.bottom > 0;
      const sectionCentered = rect.top <= headerHeight + 100 && rect.bottom >= windowHeight - 100;
      
      // Smart direction-based activation:
      // - When scrolling DOWN: activate if section top is entering the viewport (coming from above)
      // - When scrolling UP: activate if section bottom is entering the viewport (coming from below)
      const scrollingIntoSectionFromAbove = scrollDirection === 'down' && rect.top <= windowHeight && rect.top > -100;
      const scrollingIntoSectionFromBelow = scrollDirection === 'up' && rect.bottom >= 0 && rect.bottom < windowHeight + 100;
      const scrollingIntoSection = scrollingIntoSectionFromAbove || scrollingIntoSectionFromBelow;
      
      // Debug the activation logic
      if (import.meta.env.DEV && sectionVisible) {
        console.log('Activation Debug:', {
          sectionVisible,
          sectionCentered,
          scrollingIntoSection,
          scrollingIntoSectionFromAbove,
          scrollingIntoSectionFromBelow,
          scrollDirection,
          rectTop: rect.top,
          rectBottom: rect.bottom
        });
      }
      
      if (sectionVisible && !sectionCentered && !isInScrollZone && scrollingIntoSection) {
        // Section is visible but not centered AND we're scrolling into it - fly to it!
        setIsInScrollZone(true);
        scrollCounterRef.current = 0;
        programmaticScrollRef.current = true;
        
        // Always snap to optimal position
        const targetScrollY = section.offsetTop - headerHeight;
        
        console.log('Flying to section!', { targetScrollY, scrollDirection, why: scrollingIntoSectionFromAbove ? 'from above' : 'from below' });
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
        
        // Reset programmatic flag after scroll completes
        setTimeout(() => {
          programmaticScrollRef.current = false;
          lastScrollYRef.current = window.scrollY;
        }, 800);
      } else if (!sectionVisible && isInScrollZone) {
        // Section not visible anymore - deactivate
        setIsInScrollZone(false);
        scrollCounterRef.current = 0;
      }
    };

    // Add wheel listener for scroll hijacking
    document.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    handleScroll(); // Initial check

    return () => {
      document.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeStep, isInScrollZone]);

  return (
    <section className={classes.processSection} ref={sectionRef} id="process">
      {/* Debug indicator - only show in development */}
      {import.meta.env.DEV && isInScrollZone && (
        <div style={{
          position: 'fixed',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(70, 123, 220, 0.9)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.875rem',
          zIndex: 1000,
          fontWeight: 600
        }}>
          🔒 Scroll Lock Active - Step {activeStep + 1}/{processSteps.length}
        </div>
      )}
      
      <Container size="xl" className={classes.processContainer}>
        <div className={classes.processHeader}>
          <Title className={classes.processTitle}>Ons Proces</Title>
          <Text className={classes.processSubtitle}>
            We helpen met het leveren van goede BIM data. Wat is onze workflow:
          </Text>
        </div>

        <div className={classes.processContent}>
          {/* Left Navigation */}
          <div className={classes.processNav}>
            <div className={classes.navSticky}>
              {processSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`${classes.navItem} ${activeStep === index ? classes.navItemActive : ''}`}
                  onClick={() => {
                    cardRefs.current[index]?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center'
                    });
                  }}
                >
                  <div className={classes.navNumber}>{step.number}</div>
                  <div className={classes.navContent}>
                    <Text className={classes.navTitle}>{step.title}</Text>
                    <Text className={classes.navSubtitle}>{step.subtitle}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cards - Scroll Freeze Scene */}
          <div className={classes.processCards}>
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === index;
              const isPrev = index < activeStep;
              const isNext = index > activeStep;
              
              let cardClassName = classes.cardContainer;
              if (isActive) cardClassName += ` ${classes.cardActive}`;
              else if (isPrev) cardClassName += ` ${classes.cardPrev}`;
              else if (isNext) cardClassName += ` ${classes.cardNext}`;
              else cardClassName += ` ${classes.cardInactive}`;
              
              return (
                <div
                  key={step.id}
                  ref={el => { cardRefs.current[index] = el; }}
                  className={cardClassName}
                >
                  <Card className={classes.processCard} padding="xl" radius="md">
                    <Group className={classes.cardHeader} justify="space-between" mb="lg">
                      <Badge 
                        variant="light" 
                        size="lg"
                        className={classes.stepBadge}
                      >
                        Stap {step.number}
                      </Badge>
                      <IconComponent 
                        size={32} 
                        className={classes.stepIcon}
                      />
                    </Group>

                    <Stack gap="md">
                      <Title order={3} className={classes.cardTitle}>
                        {step.title}
                      </Title>
                      
                      <Text className={classes.cardDescription}>
                        {step.description}
                      </Text>

                      <Text className={classes.cardDetails}>
                        {step.details}
                      </Text>

                      <Badge 
                        variant="dot" 
                        className={classes.highlightBadge}
                      >
                        {step.highlight}
                      </Badge>
                    </Stack>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
