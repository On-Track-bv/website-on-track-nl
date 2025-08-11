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
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if mobile/tablet
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth sticky scroll effect like WorkflowStickyStepper
  useEffect(() => {
    if (isMobile) return; // Skip sticky effect on mobile
    
    const handleScroll = () => {
      if (!sectionRef.current || !stickyRef.current) return;
      
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const rect = section.getBoundingClientRect();
      const headerHeight = 80;
      const stickyHeight = sticky.offsetHeight;
      const totalSteps = processSteps.length;
      
      // Sticky/freeze logic - same as WorkflowStickyStepper
      if (rect.top <= headerHeight && rect.bottom - stickyHeight >= headerHeight) {
        sticky.style.position = 'fixed';
        sticky.style.top = headerHeight + 'px';
        sticky.style.left = section.getBoundingClientRect().left + 'px';
        sticky.style.width = section.offsetWidth + 'px';
        sticky.style.zIndex = '30';
      } else if (rect.bottom - stickyHeight < headerHeight) {
        // Last step: sticky releases, but container stays at bottom of section
        sticky.style.position = 'absolute';
        sticky.style.top = (section.offsetHeight - stickyHeight) + 'px';
        sticky.style.left = '0';
        sticky.style.width = '100%';
        sticky.style.zIndex = '10';
      } else {
        sticky.style.position = 'relative';
        sticky.style.top = '0';
        sticky.style.left = 'unset';
        sticky.style.width = '100%';
        sticky.style.zIndex = '10';
      }
      
      // Determine active step based on scroll position
      const scrollY = window.scrollY + headerHeight;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const availableScroll = sectionHeight - stickyHeight;
      const stepScroll = availableScroll / (totalSteps - 1);
      
      let stepIdx = 0;
      for (let i = 0; i < totalSteps; i++) {
        if (scrollY >= sectionTop + i * stepScroll) {
          stepIdx = i;
        }
      }
      setActiveStep(stepIdx);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Calculate spacer height for smooth scrolling - same as WorkflowStickyStepper
  const spacerHeight = stickyRef.current ? 
    (processSteps.length - 1) * (stickyRef.current.offsetHeight || 600) : 
    (processSteps.length - 1) * 600;

  return (
    <div ref={sectionRef} style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      <section className={classes.processSection} id="process">
        {/* Gradient background with direct SVG logo cutout */}
        <div className={classes.logoMaskedGradientBackground} />
        
        <div ref={stickyRef} style={{ display: 'flex', width: '100%', height: '100vh', background: 'none', boxSizing: 'border-box' }}>
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
                  // For mobile, adjust animation to make all cards more visible
                  let xOffset = 0;
                  let scale = 0.85;
                  let zIndex = 1;
                  let opacity = 0.6;
                  let blurAmount = 20;
                  
                  // Calculate half card width for proper centering on mobile
                  const halfCardWidth = isMobile ? (window.innerWidth * 0.9) / 2 : 180; // Fallback to 180 for desktop
                  
                  if (isMobile) {
                    // Mobile: more visible background cards with smaller center offset
                    const centerOffset = window.innerWidth * 0.05; // Much smaller offset - just 5% of screen width
                    
                    if (isActive) {
                      xOffset = centerOffset;
                      scale = 1;
                      zIndex = 3;
                      opacity = 1;
                      blurAmount = 35;
                    } else if (isPrev) {
                      xOffset = centerOffset - 120; // 120px to the left of center
                      scale = 0.95; // Larger scale
                      zIndex = 2;
                      opacity = 0.9; // More visible
                      blurAmount = 15;
                    } else if (isNext) {
                      xOffset = centerOffset + 120; // 120px to the right of center
                      scale = 0.95; // Larger scale
                      zIndex = 2;
                      opacity = 0.9; // More visible
                      blurAmount = 15;
                    } else {
                      xOffset = centerOffset + (index < activeStep ? -180 : 180); // Even bigger offset for far cards
                      scale = 0.9; // Larger scale
                      zIndex = 1;
                      opacity = 0.8; // Much more visible
                      blurAmount = 8;
                    }
                  } else {
                    // Desktop: original settings
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
                  }
                  
                  return (
                    <motion.div
                      key={step.id}
                      ref={el => { cardRefs.current[index] = el; }}
                      className={classes.cardContainer}
                      initial={{ x: -200, y: -200, scale: 0.85, opacity: 0.6 }}
                      animate={{ 
                        x: isMobile ? xOffset - halfCardWidth : xOffset, // Use calculated half width for centering on mobile
                        y: isMobile ? -200 : 0, // Subtract half height for centering on mobile  
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
                            ? 'rgba(255, 255, 255, 0.25)'
                            : isPrev 
                            ? 'rgba(88, 158, 166, 0.25)'
                            : isNext
                            ? 'rgba(242, 143, 56, 0.25)'
                            : 'rgba(255, 255, 255, 0.1)'
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          duration: 0.6
                        }}
                        style={{
                          borderRadius: '20px',
                          height: '100%',
                          minHeight: 'min(400px, 55vh)',
                          maxHeight: 'min(500px, 65vh)',
                          position: 'relative',
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
                            opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0.1
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
        </div>
      </section>
      
      {/* Spacer for smooth scrolling - same as WorkflowStickyStepper */}
      <div style={{ height: spacerHeight }} />
    </div>
  );
}