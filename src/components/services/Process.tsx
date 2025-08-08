import { Container, Title, Text, Card, Stack, Group, Badge } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { IconFileCode, IconDatabase, IconApps } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import classes from './Process.module.css';

const processSteps = [
  {
    id: 'ils-creation',
    number: '01',
    title: {
      nl: 'ILS Creëren',
      en: 'Create ILS'
    },
    subtitle: {
      nl: 'Goede basis leggen',
      en: 'Establish foundation'
    },
    icon: IconFileCode,
    description: {
      nl: 'We helpen met het creëren van een goede ILS (InformatieLeveringsSpecificatie). Heb je die zelf al? Perfect, goed startpunt.',
      en: 'We help create a proper ILS (Information Delivery Specification). Do you already have one? Perfect, good starting point.'
    },
    details: {
      nl: 'Daarbij verbinden we altijd aan al bestaande standaarden zoals bSDD en ILSen zodat jij niet het wiel helemaal opnieuw hoeft uit te vinden. We zorgen dat de informatiebehoefte praktisch toepasbaar is in BIM-software en het bouwproces.',
      en: 'We always connect to existing standards like bSDD and ILSs so you don\'t have to reinvent the wheel. We ensure the information requirements are practically applicable in BIM software and the construction process.'
    }
  },
  {
    id: 'dictionary',
    number: '02', 
    title: {
      nl: 'Dictionary Opzetten',
      en: 'Setup Dictionary'
    },
    subtitle: {
      nl: 'Van Excel naar database',
      en: 'From Excel to database'
    },
    icon: IconDatabase,
    description: {
      nl: 'We helpen bedrijven om hun informatiebehoefte uit Excel of andere ongestructureerde bronnen om te zetten naar een gestructureerde database.',
      en: 'We help companies convert their information requirements from Excel or other unstructured sources into a structured database.'
    },
    details: {
      nl: 'Hiermee genereer je automatisch IDS bestanden en koppel je gemakkelijk met andere standaarden zoals bSDD en software. We zorgen voor uniforme informatieverwerking waarbij medewerkers minder zoeken naar de juiste gegevens.',
      en: 'This automatically generates IDS files and easily connects with other standards like bSDD and software. We ensure uniform information processing where employees spend less time searching for the right data.'
    }
  },
  {
    id: 'integration',
    number: '03',
    title: {
      nl: 'Apps Koppelen',
      en: 'Connect Apps'
    }, 
    subtitle: {
      nl: 'Implementatie in proces',
      en: 'Process implementation'
    },
    icon: IconApps,
    description: {
      nl: 'We koppelen de ILS via apps en add-ins aan jouw proces en software zoals Revit, SketchUp, Tekla, ACC en Trimble Connect.',
      en: 'We connect the ILS via apps and add-ins to your process and software like Revit, SketchUp, Tekla, ACC and Trimble Connect.'
    },
    details: {
      nl: 'Hiermee kun je informatie invoeren bij de bron, controleren, verrijken en BIM-modellen bekijken op basis van de informatiebehoefte. Dit levert direct procesverbetering op: efficiënter calculeren, duidelijke inkoop en snellere werkvoorbereiding.',
      en: 'This allows you to input information at the source, check, enrich and view BIM models based on information requirements. This directly improves processes: more efficient calculation, clear procurement and faster work preparation.'
    }
  }
];

export function Process() {
  const { lang } = useLanguage();
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
      
      if (sectionVisible && !sectionCentered && !isInScrollZone && scrollingIntoSection) {
        // Section is visible but not centered AND we're scrolling into it - fly to it!
        setIsInScrollZone(true);
        scrollCounterRef.current = 0;
        programmaticScrollRef.current = true;
        
        // Always snap to optimal position
        const targetScrollY = section.offsetTop - headerHeight;
        
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
      {/* Gradient background with direct SVG logo cutout */}
      <div className={classes.logoMaskedGradientBackground} />
      
      <Container size="xl" className={classes.processContainer}>
        <div className={classes.processHeader}>
          <Title className={classes.processTitle}>
            {lang === 'nl' ? 'Ons Proces' : 'Our Process'}
          </Title>
          <Text className={classes.processSubtitle}>
            {lang === 'nl' 
              ? 'We helpen met het leveren van goede BIM data. Wat is onze workflow:' 
              : 'We help deliver quality BIM data. What is our workflow:'
            }
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
                    setActiveStep(index);
                  }}
                >
                  <div className={classes.navNumber}>{step.number}</div>
                  <div className={classes.navContent}>
                    <Text className={classes.navTitle}>{step.title[lang]}</Text>
                    <Text className={classes.navSubtitle}>{step.subtitle[lang]}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cards - Fancy Rolling Animation */}
          <div className={classes.processCards}>
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === index;
              const isPrev = index < activeStep;
              const isNext = index > activeStep;
              
              // Calculate position and scale based on relationship to active step
              let xOffset = 0;
              let scale = 0.85;
              let zIndex = 1;
              let opacity = 0.6;
              let blurAmount = 20;
              
              if (isActive) {
                xOffset = 0;
                scale = 1;
                zIndex = 3;
                opacity = 1;
                blurAmount = 35; // Veel meer blur voor super glassy effect
              } else if (isPrev) {
                xOffset = -80;
                scale = 0.9;
                zIndex = 2;
                opacity = 0.8;
                blurAmount = 15;
              } else if (isNext) {
                xOffset = 80;
                scale = 0.9;
                zIndex = 2;
                opacity = 0.8;
                blurAmount = 15;
              } else {
                // Cards further away
                xOffset = index < activeStep ? -120 : 120;
                scale = 0.85;
                zIndex = 1;
                opacity = 0.5;
                blurAmount = 8; // Minder blur voor verre kaarten
              }
              
              return (
                <motion.div
                  key={step.id}
                  ref={el => { cardRefs.current[index] = el; }}
                  className={classes.cardContainer}
                  initial={{ x: 0, scale: 0.85, opacity: 0.6 }}
                  animate={{ 
                    x: xOffset,
                    scale: scale,
                    opacity: opacity,
                    rotateY: isActive ? 0 : (isPrev ? 15 : isNext ? -15 : (index < activeStep ? 25 : -25))
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.6
                  }}
                  style={{ 
                    zIndex: zIndex,
                    perspective: "1000px"
                  }}
                >
                  <motion.div
                    animate={{
                      backdropFilter: `blur(${blurAmount}px)`,
                      backgroundColor: isActive 
                        ? 'rgba(255, 255, 255, 0.25)' // Meer transparant maar behoud glassmorphism
                        : isPrev 
                        ? 'rgba(88, 158, 166, 0.25)'
                        : isNext
                        ? 'rgba(242, 143, 56, 0.25)'
                        : 'rgba(255, 255, 255, 0.1)' // Heel transparant voor verre kaarten
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.6
                    }}
                    style={{
                      borderRadius: '20px',
                      minHeight: '450px',
                      maxHeight: '550px',
                      position: 'relative',
                      overflow: 'hidden',
                      border: isActive 
                        ? '2px solid rgba(255, 255, 255, 0.6)'
                        : isPrev
                        ? '1px solid rgba(88, 158, 166, 0.5)'
                        : isNext
                        ? '1px solid rgba(242, 143, 56, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: isActive
                        ? '0 20px 60px rgba(0, 0, 0, 0.2)'
                        : isPrev || isNext
                        ? '0 12px 40px rgba(0, 0, 0, 0.15)'
                        : '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0.1 // Veel minder zichtbaar voor inactieve kaarten
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.6
                      }}
                      style={{
                        position: 'relative',
                        zIndex: isActive ? 10 : isPrev || isNext ? 5 : 1,
                        backdropFilter: isActive ? 'blur(0px)' : 'blur(2px)'
                      }}
                    >
                      <Card 
                        className={classes.processCard} 
                        padding="xl" 
                        radius="md"
                        style={{ 
                          background: 'transparent',
                          border: 'none',
                          boxShadow: 'none'
                        }}
                      >
                      <Group className={classes.cardHeader} justify="space-between" mb="lg">
                        <Badge 
                          variant="filled" 
                          size="lg"
                          className={classes.stepBadge}
                        >
                          {lang === 'nl' ? `Stap ${step.number}` : `Step ${step.number}`}
                        </Badge>
                        <IconComponent 
                          size={32} 
                          className={classes.stepIcon}
                        />
                      </Group>

                      <Stack gap="md">
                        <Title order={3} className={classes.cardTitle}>
                          {step.title[lang]}
                        </Title>
                        
                        <Text className={classes.cardDescription}>
                          {step.description[lang]}
                        </Text>

                        <Text className={classes.cardDetails}>
                          {step.details[lang]}
                        </Text>
                      </Stack>
                      </Card>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
