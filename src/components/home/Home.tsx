import { Button, Container, Group, Modal, Text, Title, ActionIcon } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import { IconSun, IconMoon } from '@tabler/icons-react';
import ReactCountryFlag from 'react-country-flag';
import { useMantineColorScheme } from '@mantine/core';
import onTrackLogoLight from '../../assets/on-track/on-track-logo.svg';
import onTrackLogoDark from '../../assets/on-track/on-track-logo_semi-wit.svg';
import classes from './Home.module.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState } from 'react';
import { useRole } from '../../contexts/RoleContext';
import onTrackLogoOutlineLight from '../../assets/on-track/on-track-outline_logo.svg';
import onTrackLogoOutlineDark from '../../assets/on-track/on-track-outline_logo_wit.svg';



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
  const { role, setRole, roles } = useRole();
  const [showModal, setShowModal] = useState(true);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  // On first visit, show modal. If you want to remember the choice, use localStorage here.
  // useEffect(() => {
  //   const savedRole = window.sessionStorage.getItem('ontrack_role');
  //   if (savedRole) {
  //     const found = roles.find(r => r.key === savedRole);
  //     if (found) setRole(found);
  //     setShowModal(false);
  //   }
  // }, [roles, setRole]);

  const handleRoleSelect = (key: string) => {
    const found = roles.find(r => r.key === key);
    if (found) setRole(found);
    setShowModal(false);
    // window.sessionStorage.setItem('ontrack_role', key); // Uncomment to remember
  };

  const selectedRole = role;

  return (
    <div className={classes.wrapper}>
      {/* Decorative background logo outline */}
      <img
        src={colorScheme === 'dark' ? onTrackLogoOutlineDark : onTrackLogoOutlineLight}
        alt="On-Track outline logo"
        className={classes.bgLogoOutline}
        aria-hidden="true"
        draggable="false"
      />
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
            <Text mb="md" fw={700}  style={{ color: 'var(--my-primary)' }}>{t.chooseRole}</Text>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 24,
                margin: '24px 0',
              }}
            >
              {roles.map(r => {
                const isSelected = role?.key === r.key;
                const [hovered, setHovered] = useState(false);
                return (
                  <button
                    key={r.key}
                    onClick={() => handleRoleSelect(r.key)}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                      position: 'relative',
                      background: isSelected ? 'var(--my-gradient)' : 'var(--my-bgheader)',
                      color: isSelected ? 'var(--my-primary-dark)' : 'var(--my-primary)',
                      borderRadius: 18,
                      fontWeight: 600,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      aspectRatio: '1/1',
                      minWidth: 120,
                      minHeight: 120,
                      maxWidth: 180,
                      maxHeight: 180,
                      padding: '0',
                      fontSize: '0.95rem',
                      boxShadow: isSelected
                        ? '0 4px 24px 0 rgba(0,0,0,0.18)'
                        : '0 1px 6px 0 rgba(0,0,0,0.08)',
                      border: isSelected
                        ? '2.5px solid var(--my-primary)'
                        : '1.5px solid var(--my-bgheader)',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.18s, transform 0.13s, border 0.18s',
                      overflow: 'hidden',
                    }}
                    onMouseOver={e => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 32px 0 rgba(0,0,0,0.22)';
                      (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.045)';
                    }}
                    onMouseOut={e => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = isSelected
                        ? '0 4px 24px 0 rgba(0,0,0,0.18)'
                        : '0 1px 6px 0 rgba(0,0,0,0.08)';
                      (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                    }}
                  >
                    <span
                      className={classes.roleIcon}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: hovered ? 1 : 0.4,
                        zIndex: 1,
                        pointerEvents: 'none',
                        userSelect: 'none',
                        transition: 'opacity 0.18s',
                      }}
                    >
                      {r.icon}
                    </span>
                    {hovered ? null : (
                      <span
                        style={{
                          position: 'relative',
                          zIndex: 2,
                          fontSize: '0.9em',
                          textAlign: 'center',
                          lineHeight: 1.25,
                          padding: '0 10px',
                          fontWeight: 700,
                          color: 'inherit',
                          textShadow: '0 1px 8px rgba(0,0,0,0.08)',
                        }}
                      >
                        {r.label[lang]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
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
                    : <>Alle <span className={classes.gradientText}>project informatie</span> centraal</>;
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
                    ? <>From Excel to <span className={classes.gradientText}>database-driven</span>  BIM</>
                    : <>Van Excel naar <span className={classes.gradientText}>database-gedreven</span> BIM</>;
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
                    : <>Van <span className={classes.gradientText}>informatie behoefte</span> naar levering</>;
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
          <Text
            className={classes.description}
            mb="xl"
            mt="md"
            style={{
              fontSize: '1.2rem',
              textAlign: 'center',
              // Responsive font size for mobile
              ...(window.innerWidth < 600 ? { fontSize: '1rem' } : {}),
            }}
          >
            {selectedRole.desc[lang]}
          </Text>
        ) : (
          <Text
            className={classes.description}
            mb="xl"
            mt="md"
            style={{
              fontSize: '1.2rem',
              textAlign: 'center',
              ...(window.innerWidth < 600 ? { fontSize: '1rem' } : {}),
            }}
          >
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