import { useState, useEffect, useRef } from 'react';
import { Title, Text, ThemeIcon } from '@mantine/core';
import { IconListCheck, IconDatabase, IconApps } from '@tabler/icons-react';
import { useInView } from 'react-intersection-observer';
import ilsImg from '../../assets/Verbinding.jpg';
import dictImg from '../../assets/Amsterdam-zuidas.jpg';
import appsImg from '../../assets/Amsterdam-zuidas_small.jpg';
import classes from './WorkflowStickyStepper.module.css';

const steps = [
  {
    title: 'ILS maken of koppelen',
    icon: <IconListCheck size={28} />, 
    image: ilsImg,
    content: (
      <>
        <Text>We helpen met het creëren van een goede ILS, heb je die zelf al? Perfect, goed startpunt.</Text>
        <Text c="dimmed" size="sm" mt={8}>
          Daarbij verbinden we altijd aan al bestaande standaarden en ilsen zodat jij niet het wiel helemaal opnieuw hoeft uit te vinden.
        </Text>
      </>
    ),
  },
  {
    title: 'ILS naar dictionary',
    icon: <IconDatabase size={28} />, 
    image: dictImg,
    content: (
      <>
        <Text>We zetten de ILS in een dictionary.</Text>
        <Text c="dimmed" size="sm" mt={8}>
          We helpen bedrijven om hun informatiebehoefte uit Excel of andere ongestructureerde bronnen om te zetten naar een database, klaar voor BIM en het bouwproces.<br />Hiermee genereer je automatisch IDS bestanden en koppel je gemakkelijk met andere standaarden en software.
        </Text>
      </>
    ),
  },
  {
    title: 'Koppelen aan apps & proces',
    icon: <IconApps size={28} />, 
    image: appsImg,
    content: (
      <>
        <Text>We koppelen de ILS via apps aan jouw proces en software.</Text>
        <ul style={{ margin: '8px 0 0 18px', padding: 0 }}>
          <li>Modelleren</li>
          <li>Controleren/Checken</li>
          <li>Gebruiken</li>
        </ul>
      </>
    ),
  },
];

export function WorkflowStickyStepper() {
  // Ref voor de hele sectie en sticky container
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  // Scroll detection for each step (anchors in content)
  // Gebruik rootMargin zodat activatie gebeurt als anchor in het midden van de viewport komt
  const { ref: ref0, inView: inView0 } = useInView({ threshold: 0.4, rootMargin: '-40% 0px -40% 0px' });
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.4, rootMargin: '-40% 0px -40% 0px' });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.4, rootMargin: '-40% 0px -40% 0px' });
  const [activeStep, setActiveStep] = useState(0);


  // Scroll-through/freeze effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !stickyRef.current) return;
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const rect = section.getBoundingClientRect();
      const headerHeight = 80; // pas aan indien je header hoger/lager is
      const stepHeight = sticky.offsetHeight;
      const totalSteps = steps.length;
      // Sticky/freeze logica
      if (rect.top <= headerHeight && rect.bottom - stepHeight >= headerHeight) {
        sticky.style.position = 'fixed';
        sticky.style.top = headerHeight + 'px';
        sticky.style.left = section.getBoundingClientRect().left + 'px';
        sticky.style.width = section.offsetWidth + 'px';
        sticky.style.zIndex = '30';
      } else if (rect.bottom - stepHeight < headerHeight) {
        // Laatste stap: sticky los, maar sticky container blijft onderaan de sectie
        sticky.style.position = 'absolute';
        sticky.style.top = (section.offsetHeight - stepHeight) + 'px';
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
      // Actieve stap bepalen
      const scrollY = window.scrollY + headerHeight;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const stickyHeight = stepHeight;
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spacer exact zo groot dat sticky pas loskomt als laatste stap in beeld is
  const spacerHeight = stickyRef.current ? (steps.length - 1) * (stickyRef.current.offsetHeight || 400) : (steps.length - 1) * 400;

  return (
    <div ref={sectionRef} style={{ position: 'relative', width: '92vw', maxWidth: '1600px', margin: '0 auto' }}>
      <div ref={stickyRef} style={{ display: 'flex', width: '100%', height: '100vh', background: 'none', boxSizing: 'border-box', top: 0, left: 0 }}>
        {/* Stepper links */}
        <div style={{ minWidth: 220, maxWidth: 260, width: '18%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 24 }}>
          <div className={classes.stepsList}>
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className={classes.stepIndicator + (activeStep === idx ? ' ' + classes.active : '')}
                style={{
                  marginBottom: 18,
                  background: activeStep === idx ? 'var(--my-bg)' : 'var(--my-bgheader)',
                  boxShadow: activeStep === idx ? '0 8px 32px 0 rgba(0,0,0,0.13)' : '0 1px 6px 0 rgba(0,0,0,0.04)',
                  opacity: activeStep === idx ? 1 : 0.6,
                  fontWeight: activeStep === idx ? 800 : 500,
                  fontSize: '1.05rem',
                  minHeight: 48,
                  padding: '0.7rem 1.1rem',
                  transition: 'all 0.22s cubic-bezier(.4,1.2,.4,1)',
                  cursor: 'pointer',
                  border: activeStep === idx ? '2.5px solid var(--my-primary)' : '1.5px solid var(--my-bgheader)',
                  color: activeStep === idx ? 'var(--my-primary)' : 'inherit',
                }}
                onClick={() => {
                  setActiveStep(idx);
                  const anchor = document.getElementById(`workflow-step-anchor-${idx}`);
                  if (anchor) {
                    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
              >
                <ThemeIcon size={32} radius="xl" color={activeStep === idx ? 'blue' : 'gray'}>{step.icon}</ThemeIcon>
                <span>{step.title}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Content rechts: alle 3 vensters altijd zichtbaar, onder elkaar */}
        <div style={{ flex: 1, marginLeft: 0, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: 12, paddingRight: 0 }}>
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div key={step.title} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: isActive ? '0 0 60%' : '0 0 20%', transition: 'flex 0.5s cubic-bezier(.4,1.2,.4,1)' }}>
                <div id={`workflow-step-anchor-${idx}`} ref={idx === 0 ? ref0 : idx === 1 ? ref1 : ref2} className={classes.stepAnchor} />
                <div
                  className={classes.stepContent}
                  style={{
                    margin: '0 auto',
                    marginBottom: 24,
                    opacity: isActive ? 1 : 0.55,
                    transform: isActive ? 'scale(1.04)' : 'scale(0.96)',
                    transition: 'all 0.45s cubic-bezier(.4,1.2,.4,1)',
                    boxShadow: isActive ? '0 8px 32px 0 rgba(0,0,0,0.13)' : '0 1px 6px 0 rgba(0,0,0,0.04)',
                    background: isActive ? 'var(--my-bg)' : 'var(--my-bgheader)',
                    border: isActive ? '2.5px solid var(--my-primary)' : '1.5px solid var(--my-bgheader)',
                    borderRadius: 18,
                    padding: isActive ? '2.2rem 2.5rem' : '1.1rem 1.3rem',
                    minHeight: isActive ? 220 : 80,
                    maxHeight: isActive ? '60vh' : '20vh',
                    maxWidth: 600,
                    filter: 'none',
                    zIndex: isActive ? 2 : 1,
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Title order={isActive ? 3 : 5} style={{ marginBottom: isActive ? 16 : 6, fontSize: isActive ? '2rem' : '1.1rem', fontWeight: isActive ? 800 : 500, color: isActive ? 'var(--my-primary)' : 'inherit', transition: 'all 0.22s cubic-bezier(.4,1.2,.4,1)' }}>{step.title}</Title>
                  {step.content}
                  <img src={step.image} alt={step.title} className={classes.stepImage} style={{ maxWidth: isActive ? 320 : 120, marginTop: isActive ? 24 : 8, borderRadius: 12, transition: 'all 0.22s cubic-bezier(.4,1.2,.4,1)' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Spacer zodat je na de sectie weer verder kunt scrollen */}
      <div style={{ height: spacerHeight }} />
    </div>
  );
}
