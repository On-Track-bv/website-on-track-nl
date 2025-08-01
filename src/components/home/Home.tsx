



import { Button, Container, Group, Modal, Stack, Text, Title, ActionIcon } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import { IconSun, IconMoon } from '@tabler/icons-react';
import ReactCountryFlag from 'react-country-flag';
import { useMantineColorScheme } from '@mantine/core';
import onTrackLogoLight from '../../assets/on-track/on-track-logo.svg';
import onTrackLogoDark from '../../assets/on-track/on-track-logo_semi-wit.svg';
import classes from './Home.module.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState, useEffect } from 'react';


const roles = [
  {
    key: 'kringverjaardag',
    label: {
      nl: 'De kringverjaardag',
      en: 'The family birthday circle',
    },
    desc: {
      nl: 'Wij helpen bedrijven in de bouw en infra om alle projectinformatie overzichtelijk en centraal op te slaan, in plaats van in losse Excel-bestanden. Met onze software en advies zorgen we dat iedereen met dezelfde, goed gestructureerde informatie werkt en die makkelijk kan aanvullen of corrigeren. Zo kun je beter en sneller bestellen, plannen, uitvoeren én opleveren. De informatie is bruikbaar, ook na de bouw.',
      en: 'We help construction and infrastructure companies store all project information centrally and clearly, instead of in scattered Excel files. With our software and advice, everyone works with the same, well-structured information that can be easily updated or corrected. This enables better and faster ordering, planning, execution, and delivery. The information remains useful, even after construction.'
    }
  },
  {
    key: 'bouwinfra',
    label: {
      nl: 'Ik werk in de bouw en infra',
      en: 'I work in construction and infrastructure',
    },
    desc: {
      nl: 'On-Track helpt de bouwsector meer uit het BIM-proces te halen met slimme software en consultancy. We maken LinkedData toepasbaar, verbeteren BIM-data consistentie en ondersteunen de overgang naar database-gedreven BIM.',
      en: 'On-Track helps the construction sector get more out of the BIM process with smart software and consultancy. We make LinkedData practical, improve BIM data consistency, and support the transition to database-driven BIM.'
    }
  },
  {
    key: 'directie',
    label: {
      nl: 'Ik ben directie of management',
      en: 'I am management or director',
    },
    desc: {
      nl: 'Wij helpen met meer uit je BIM modellen halen. Zodat je calculatie, planning en materialenpaspoorten sneller en beter kunt maken. Wij zorgen ervoor dat je met BIM modellen automatisch kunt plannen, calculeren en materialenpaspoorten kunt maken. Door onze hulp gaat je BIM proces in één keer goed, je hebt minder iteraties.',
      en: 'We help you get more out of your BIM models, so you can calculate, plan, and create material passports faster and better. We ensure you can automatically plan, calculate, and create material passports with BIM models. With our help, your BIM process is right the first time, with fewer iterations.'
    }
  },
  {
    key: 'bimconsultant',
    label: {
      nl: 'Ik ben een BIM-consultant',
      en: 'I am a BIM consultant',
    },
    desc: {
      nl: 'Wij maken software waarmee jij je klanten kan helpen de data in de BIM modellen beter te organiseren. Wij maken software die jij of je klant kan gebruiken om de data in de BIM modellen beter te krijgen.',
      en: 'We create software that helps you assist your clients in organizing BIM model data better. Our software can be used by you or your client to improve the data in BIM models.'
    }
  },
  {
    key: 'bimmanager',
    label: {
      nl: 'Ik ben een BIM manager',
      en: 'I am a BIM manager',
    },
    desc: {
      nl: 'Wij helpen met de transitie van Excel gedreven BIM naar database gedreven BIM. Waardoor de informatie in je BIM modellen veel constanter en voorspelbaarder wordt. Wij helpen BIM modellen altijd dezelfde informatie te bevatten. Wij helpen iedere domeinspecialist zonder modelleerkennis met het verrijken van BIM modellen.',
      en: 'We help with the transition from Excel-driven BIM to database-driven BIM, making the information in your BIM models much more consistent and predictable. We help BIM models always contain the same information. We help every domain specialist, even without modeling knowledge, enrich BIM models.'
    }
  },
  {
    key: 'linkeddata',
    label: {
      nl: 'Ik ben LinkedData consultant of bedrijf',
      en: 'I am a LinkedData consultant or company',
    },
    desc: {
      nl: 'Wij helpen bedrijven om LinkedData simpel en praktisch toepasbaar maken in BIM software. Dit doen we door Software te bouwen en Consultancy te leveren.',
      en: 'We help companies make LinkedData simple and practical in BIM software. We do this by building software and providing consultancy.'
    }
  },
  {
    key: 'opdrachtgever',
    label: {
      nl: 'Ik ben een opdrachtgever of gebouwbeheerder',
      en: 'I am a client or building manager',
    },
    desc: {
      nl: 'Wij zorgen ervoor dat de BIM-data die jij opgeleverd krijgt bruikbaar zijn in de gebouwbeheersfase. Wij zorgen ervoor dat de mutaties die jij doet in jouw gebouwbeheer software ook veranderen in de BIM-data.',
      en: 'We ensure that the BIM data you receive is usable in the building management phase. We also ensure that changes you make in your building management software are reflected in the BIM data.'
    }
  },
  {
    key: 'overheid',
    label: {
      nl: 'Ik werk bij (Semi-)overheden',
      en: 'I work at (semi-)government',
    },
    desc: {
      nl: 'Wij helpen jouw informatiebehoefte praktisch toepasbaar te maken voor de partijen die jou informatie aan moeten leveren. Wij helpen met het aanvragen van vergunning op basis van BIM.',
      en: 'We help make your information needs practically applicable for the parties that need to supply you with information. We help with permit applications based on BIM.'
    }
  },
  {
    key: 'developer',
    label: {
      nl: 'Ik ben een software developer',
      en: 'I am a software developer',
    },
    desc: {
      nl: 'Door software integraties te bouwen verbinden wij de LinkedData en de BIM wereld. Wij maken software componenten die jij kan gebruiken om jouw gebruikers toegang te geven tot bestaande standaarden. Ontzorgen door op een uniforme manier de standaarden aan te bieden in een IFC structuur. Wij snappen zowel de LinkedData als de BIM-software wereld, onze software integraties zorgen ervoor dat beide werelden praktisch aansluiten. Verschillende standaarden ontsluiten op een praktische manier. Dit kan een IDS, bSDD of LinkedData standaard zijn, wij tonen hem in samenhang en uniform.',
      en: 'By building software integrations, we connect the LinkedData and BIM worlds. We create software components you can use to give your users access to existing standards. We unburden you by offering standards in a uniform way in an IFC structure. We understand both the LinkedData and BIM software worlds, and our integrations ensure both worlds connect practically. We unlock different standards in a practical way. This can be an IDS, bSDD, or LinkedData standard; we show them in context and uniformly.'
    }
  },
];

const texts = {
  en: {
    getStarted: 'Get started',
    github: 'GitHub',
    welcome: 'Welcome!',
    chooseRole: 'What brings you here…',
    close: 'Close',
  },
  nl: {
    getStarted: 'Aan de slag',
    github: 'GitHub',
    welcome: 'Welkom!',
    chooseRole: 'Wat brengt jou hier…',
    close: 'Sluiten',
  },
};


export function Home() {
  const { lang, setLang } = useLanguage();
  const t = texts[lang];
  const [role, setRole] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  // On first visit, show modal. If you want to remember the choice, use localStorage here.
  useEffect(() => {
    // Uncomment below to only show once per session:
    // const savedRole = window.sessionStorage.getItem('ontrack_role');
    // if (savedRole) {
    //   setRole(savedRole);
    //   setShowModal(false);
    // }
  }, []);

  const handleRoleSelect = (key: string) => {
    setRole(key);
    setShowModal(false);
    // window.sessionStorage.setItem('ontrack_role', key); // Uncomment to remember
  };

  const selectedRole = roles.find(r => r.key === role);

  return (
    <div className={classes.wrapper}>
        <Modal
          opened={showModal}
          onClose={() => setShowModal(false)}
          centered
          size="lg"
          styles={{
            header: { background: 'var(--my-bgheader)' },
            content: { background: 'var(--my-bg)' },
            body: { padding: 32 }
          }}
          title={
            <div style={{ display: 'flex', alignItems: 'center', minHeight: 44, width: '100%', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
                <img
                  src={colorScheme === 'dark' ? onTrackLogoDark : onTrackLogoLight}
                  alt="On-Track logo"
                  style={{ height: 38, marginRight: 8 }}
                />
                <Title order={2} style={{ color: 'var(--my-primary)', margin: 0 }}>{t.welcome}</Title>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 'none' }}>
                <Button
                  className={classes.languageButton}
                  variant="subtle"
                  size="xs"
                  onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
                  leftSection={
                    lang === 'nl'
                      ? <ReactCountryFlag countryCode="GB" svg style={{ width: 20, height: 20 }} />
                      : <ReactCountryFlag countryCode="NL" svg style={{ width: 20, height: 20 }} />
                  }
                  style={{ marginRight: 0 }}
                />
                <ActionIcon
                  variant="outline"
                  color="var(--my-primary-dark)"
                  className={classes.actionIcon}
                  onClick={() => toggleColorScheme()}
                  title="Toggle color scheme"
                  style={{ marginRight: 0 }}
                >
                  {colorScheme === 'dark'
                    ? <IconSun size={18} color="var(--my-primary)" />
                    : <IconMoon size={18} color="var(--my-primary)" />}
                </ActionIcon>
              </div>
            </div>
          }
        >
          <div style={{ position: 'relative' }}>
            <Text mb="md" fw={700} style={{ color: 'var(--my-accent)' }}>{t.chooseRole}</Text>
            <Stack gap="xs">
              {roles.map(r => (
                <Button
                  key={r.key}
                  variant={role === r.key ? 'filled' : 'light'}
                  color="blue"
                  onClick={() => handleRoleSelect(r.key)}
                  style={{
                    background: role === r.key ? 'var(--my-gradient)' : undefined,
                    color: role === r.key ? 'var(--my-primary-dark)' : 'var(--my-primary)',
                    borderRadius: 8,
                    fontWeight: 600
                  }}
                >
                  {r.label[lang]}
                </Button>
              ))}
            </Stack>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 24 }}>
              <Button
                mt="md"
                variant="subtle"
                color="gray"
                onClick={() => setShowModal(false)}
                style={{ color: 'var(--my-subtext)' }}
              >
                {t.close}
              </Button>
            </div>
          </div>
        </Modal>
      <Container size={1000} className={classes.inner}>
        <h1 className={classes.title}>
          {/* Per-role dynamic headline with gradient text, fallback to default headline if no role is selected */}
          {(() => {
            if (selectedRole) {
              switch (selectedRole.key) {
                case 'kringverjaardag':
                  return lang === 'en'
                    ? <>All your <span className={classes.gradientText}>project info</span> in one place</>
                    : <>Alle <span className={classes.gradientText}>projectinformatie</span> centraal</>;
                case 'bouwinfra':
                  return lang === 'en'
                    ? <>Get more from your <span className={classes.gradientText}>BIM data</span></>
                    : <>Haal meer uit je <span className={classes.gradientText}>BIM-data</span></>;
                case 'directie':
                  return lang === 'en'
                    ? <>From <span className={classes.gradientText}>BIM model</span> to results</>
                    : <>Van <span className={classes.gradientText}>BIM-model</span> naar resultaat</>;
                case 'bimconsultant':
                  return lang === 'en'
                    ? <>Empower your clients with <span className={classes.gradientText}>better BIM data</span></>
                    : <>Help je klanten met <span className={classes.gradientText}>betere BIM-data</span></>;
                case 'bimmanager':
                  return lang === 'en'
                    ? <>From <span className={classes.gradientText}>Excel</span> to database-driven BIM</>
                    : <>Van <span className={classes.gradientText}>Excel</span> naar database-gedreven BIM</>;
                case 'linkeddata':
                  return lang === 'en'
                    ? <>Make <span className={classes.gradientText}>LinkedData</span> practical in BIM</>
                    : <><span className={classes.gradientText}>LinkedData</span> praktisch toepasbaar in BIM</>;
                case 'opdrachtgever':
                  return lang === 'en'
                    ? <>Your <span className={classes.gradientText}>BIM data</span> ready for building management</>
                    : <>Jouw <span className={classes.gradientText}>BIM-data</span> bruikbaar voor beheer</>;
                case 'overheid':
                  return lang === 'en'
                    ? <>From <span className={classes.gradientText}>requirement</span> to delivery</>
                    : <>Van <span className={classes.gradientText}>informatiebehoefte</span> naar levering</>;
                case 'developer':
                  return lang === 'en'
                    ? <>Connect <span className={classes.gradientText}>LinkedData</span> and <span className={classes.gradientText}>BIM</span></>
                    : <>Verbind <span className={classes.gradientText}>LinkedData</span> en <span className={classes.gradientText}>BIM</span></>;
                default:
                  break;
              }
            }
            // Fallback headline (original)
            return lang === 'en'
              ? <>Your <span className={classes.gradientText}>dataflow</span>, finally as expected</>
              : <>Jouw <span className={classes.gradientText}>dataset</span>, eindelijk zoals verwacht</>;
          })()}
        </h1>
        {selectedRole ? (
          <Text className={classes.description} mb="xl" mt="md" style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {selectedRole.desc[lang]}
          </Text>
        ) : (
          <Text className={classes.description} mb="xl" mt="md" style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {lang === 'en'
              ? <>Define what information you need and we will take care of every necessary connection. Between your programs and with your people.</>
              : <>Stel vast welke informatie je nodig hebt, dan zorgen wij voor elke noodzakelijke verbinding. Tussen jouw programma's en met jouw mensen.</>
            }
          </Text>
        )}
        <Group className={classes.controls}>
          <Button
            size="xl"
            className={`${classes.control} ${classes.gradientButton}`}
            style={{
              minWidth: 0,
              whiteSpace: 'normal',
              fontSize: '1.25rem',
            }}
            onClick={() => {
              const el = document.getElementById('contact-us');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {t.getStarted}
          </Button>
          <Button
            component="a"
            href="https://github.com/On-Track-bv"
            target="_blank"
            rel="noopener noreferrer"
            size="xl"
            variant="default"
            className={`${classes.control} ${classes.githubButton}`}
            style={{
              minWidth: 0,
              whiteSpace: 'normal',
              fontSize: '1.25rem',
            }}
            leftSection={<GithubIcon size={20} />}
          >
            {t.github}
          </Button>
        </Group>
      </Container>
    </div>
  );
}