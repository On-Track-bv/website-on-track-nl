import { useEffect, useState } from 'react';
import { Burger, Container, Group, ActionIcon, Button, Drawer, Stack, Box } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import ReactCountryFlag from "react-country-flag";
import { useDisclosure } from '@mantine/hooks';
import { useMantineColorScheme } from '@mantine/core';
import onTrackBeeldmerkLight from '../../assets/on-track/on-track-beeldmerk.svg';
import onTrackBeeldmerkDark from '../../assets/on-track/on-track-beeldmerk_wit.svg';
import classes from './Header.module.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRole } from '../../contexts/RoleContext';
import { Menu, Avatar, Text } from '@mantine/core';

const linksNl = [
    { link: '#top', label: 'Home' },
    { link: '#why', label: 'Visie en missie' },
    {
      label: 'Diensten',
      dropdown: [
        { link: '#process', label: 'Proces' },
        { link: '#consultancy', label: 'Consultancy' },
        { link: '#software', label: 'Software' },
      ]
    },
    { link: '#who', label: 'Over ons' },
    { link: '#contact-us', label: 'Contact' },
];

const linksEn = [
    { link: '#top', label: 'Home' },
    { link: '#why', label: 'Vision and mission' },
    {
      label: 'Services',
      dropdown: [
        { link: '#process', label: 'Process' },
        { link: '#consultancy', label: 'Consultancy' },
        { link: '#software', label: 'Software' },
      ]
    },
    { link: '#who', label: 'About us' },
    { link: '#contact-us', label: 'Contact' },
];

export function Header() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [activeMain, setActiveMain] = useState(linksNl[0].link);
    const [activeSub, setActiveSub] = useState<string | null>(null);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { lang, setLang } = useLanguage();

    const links = lang === 'nl' ? linksNl : linksEn;
    const { role, setRole, roles } = useRole();
    const [roleMenuOpened, setRoleMenuOpened] = useState(false);

    const items = links.map((link) => {
      if (link.dropdown) {
        return (
          <Menu key={link.label} trigger="hover" openDelay={80} closeDelay={120} withinPortal>
            <Menu.Target>
              <span
                className={classes.link}
                style={{ cursor: 'pointer' }}
                data-active={activeMain === link.label || undefined}
              >
                {link.label}
              </span>
            </Menu.Target>
            <Menu.Dropdown className={classes.servicesDropdown}>
              {link.dropdown.map((item) => (
                <Menu.Item
                  key={item.label}
                  style={{ color: 'var(--my-text)', fontWeight: 600 }}
                  className={activeSub === item.link ? classes.selectedServicesItem : undefined}
                  data-active={activeSub === item.link || undefined}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--my-hover)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
                  onClick={e => {
                    e.preventDefault();
                    
                    // Only dispatch header navigation event for non-process links
                    if (item.link !== '#process') {
                      window.dispatchEvent(new CustomEvent('header-navigation'));
                    }
                    
                    const el = document.getElementById(item.link.substring(1));
                    if (el) {
                      const yOffset = -80;
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                    setActiveMain(link.label);
                    setActiveSub(item.link);
                    close();
                  }}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        );
      }
      return (
        <a
          key={link.label}
          href={link.link}
          className={classes.link}
          data-active={activeMain === link.link || undefined}
          onClick={(event) => {
            event.preventDefault();
            
            // Dispatch header navigation event
            window.dispatchEvent(new CustomEvent('header-navigation'));
            
            if (link.link === '#top') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (link.link.startsWith('#')) {
              const el = document.getElementById(link.link.substring(1));
              if (el) {
                const yOffset = -80;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }
            setActiveMain(link.link);
            setActiveSub(null);
            close();
          }}
        >
          {link.label}
        </a>
      );
    });

    // Verzamel alle sectie-IDs inclusief dropdowns, met parent label
    type SectionId = { id: string; parentLabel: string; link?: string };
    const sectionIds: SectionId[] = [];
    links.forEach(link => {
      if (typeof link.link === 'string') {
        sectionIds.push({ id: link.link.replace('#', ''), parentLabel: link.label, link: link.link });
      }
      if (link.dropdown) {
        link.dropdown.forEach(item => {
          sectionIds.push({ id: item.link.replace('#', ''), parentLabel: link.label });
        });
      }
    });

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;
            let currentSection = sectionIds[0];
            for (const section of sectionIds) {
                const el = document.getElementById(section.id);
                if (el) {
                    const top = el.offsetTop;
                    if (scrollPosition >= top) {
                        currentSection = section;
                    }
                }
            }
            // Zet hoofdtab en subtab
            let newActiveMain = '';
            let newActiveSub: string | null = null;
            const parentLink = links.find(l => l.label === currentSection.parentLabel);
            if (parentLink) {
                if (parentLink.dropdown) {
                    newActiveMain = parentLink.label;
                    // Kijk of het een subtab is
                    const foundSub = parentLink.dropdown.find(item => item.link.replace('#', '') === currentSection.id);
                    if (foundSub) {
                        newActiveSub = foundSub.link;
                    }
                } else if (parentLink.link) {
                    newActiveMain = parentLink.link;
                }
            }
            if (activeMain !== newActiveMain || activeSub !== newActiveSub) {
                setActiveMain(newActiveMain);
                setActiveSub(newActiveSub);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, activeMain, activeSub, links]);

    return (
        <header className={classes.header}>
            <Container size="lg" className={classes.inner}>
                {/* Logo altijd zichtbaar */}
                <a href="#top" onClick={e => { 
                  e.preventDefault(); 
                  
                  // Dispatch header navigation event
                  window.dispatchEvent(new CustomEvent('header-navigation'));
                  
                  window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }}>
                    <img
                        src={colorScheme === 'dark' ? onTrackBeeldmerkDark : onTrackBeeldmerkLight}
                        alt="On-Track logo"
                        style={{ height: 45, cursor: 'pointer' }}
                    />
                </a>
                <div className={classes.rightGroups}>
                    <Group gap={6} visibleFrom="xs">
                        {items}
                    </Group>
                    <Group visibleFrom="xs">
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
                        />
                        <ActionIcon
                            variant="outline"
                            color="var(--my-primary-dark)"
                            className={classes.actionIcon}
                            onClick={() => toggleColorScheme()}
                            title="Toggle color scheme"
                        >
                            {colorScheme === 'dark'
                                ? <IconSun size={18} color="var(--my-primary)" />
                                : <IconMoon size={18} color="var(--my-primary)" />}
                        </ActionIcon>
                        {/* Profile/role button */}
                        <Menu opened={roleMenuOpened} onChange={setRoleMenuOpened} position="bottom-end" withinPortal>
                          <Menu.Target>
                            <ActionIcon
                              variant="transparent"
                              size="lg"
                              onClick={() => setRoleMenuOpened((o) => !o)}
                              title="Selecteer profiel"
                              style={{ marginLeft: 8, background: 'transparent', boxShadow: 'none' }}
                              data-profile-btn
                            >
                              <Avatar radius="xl" size={32} className={classes.profileAvatar} style={{ background: 'var(--my-bgheader)', color: 'var(--my-primary)' }}>
                                {role?.icon && (
                                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18 }}>
                                    {role.icon && typeof role.icon.type === 'function'
                                      ? <role.icon.type size={16} color="var(--my-primary)" />
                                      : role.icon}
                                  </span>
                                )}
                              </Avatar>
                            </ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown className={classes.profileDropdown}>
                            <Menu.Label>Kies je profiel</Menu.Label>
                            {roles.map(r => (
                              <Menu.Item
                                key={r.key}
                                leftSection={<span className={classes.profileIcon}>{r.icon}</span>}
                                onClick={() => { setRole(r); setRoleMenuOpened(false); }}
                                className={[
                                  classes.profileItem,
                                  role?.key === r.key ? classes.selectedProfileItem : null
                                ].filter(Boolean).join(' ')}
                                style={{
                                  '--_menu-item-hover-bg': 'var(--my-hover)'
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.backgroundColor = 'var(--my-hover)';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.backgroundColor = '';
                                }}
                              >
                                <Text size="sm" c={role?.key === r.key ? undefined : undefined}>{r.menuTitle[lang]}</Text>
                              </Menu.Item>
                            ))}
                            <Menu.Divider />
                            <Menu.Item onClick={() => { setRole(null); setRoleMenuOpened(false); }}>
                              <Text size="xs" c="dimmed">Geen profiel</Text>
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                    </Group>
                </div>
                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
            {/* Drawer voor mobiel menu */}
            <Drawer
                opened={opened}
                onClose={close}
                size="xs"
                padding="md"
                title={
                    <img
                        src={colorScheme === 'dark' ? onTrackBeeldmerkDark : onTrackBeeldmerkLight}
                        alt="On-Track logo"
                        style={{ height: 32 }}
                    />
                }
                styles={{
                    header: {
                        background: 'var(--my-bgheader)', // kleur bovenin, bij het logo
                    },
                    content: {
                        background: 'var(--my-bg)', // of je eigen kleur
                    },
                }}
            >
                <nav>
                    <Box mb="md" /> {/* Voeg whitespace toe boven de links */}
                    <Stack gap="md">
                      {links.map((link) =>
                        link.dropdown ? (
                          <div key={link.label}>
                            <div
                              className={classes.link}
                              style={{ fontWeight: 900, paddingLeft: 16, cursor: 'default', background: 'none' }}
                            >
                              {link.label}
                            </div>
                            <div>
                              {link.dropdown.map((item) => (
                                <a
                                  key={item.label}
                                  href={item.link}
                                  className={activeSub === item.link ? classes.selectedServicesItem + ' ' + classes.link : classes.link}
                                  style={{ display: 'block', fontWeight: 600, fontSize: '0.90rem', paddingLeft: 32, borderRadius: 'var(--mantine-radius-sm)' }}
                                  onClick={event => {
                                    event.preventDefault();
                                    
                                    // Only dispatch header navigation event for non-process links
                                    if (item.link !== '#process') {
                                      window.dispatchEvent(new CustomEvent('header-navigation'));
                                    }
                                    
                                    const el = document.getElementById(item.link.substring(1));
                                    if (el) {
                                      const yOffset = -80;
                                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                      window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                    setActiveMain(link.label);
                                    setActiveSub(item.link);
                                    close();
                                  }}
                                >
                                  {item.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <a
                            key={link.label}
                            href={link.link}
                            className={classes.link}
                            onClick={event => {
                              event.preventDefault();
                              
                              // Only dispatch header navigation event for non-process links
                              if (link.link !== '#process') {
                                window.dispatchEvent(new CustomEvent('header-navigation'));
                              }
                              
                              if (link.link === '#top') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              } else if (link.link.startsWith('#')) {
                                const el = document.getElementById(link.link.substring(1));
                                if (el) {
                                  const yOffset = -80;
                                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                  window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                              }
                              setActiveMain(link.link);
                              setActiveSub(null);
                              close();
                            }}
                          >
                            {link.label}
                          </a>
                        )
                      )}
                    </Stack>
                    <Group gap="md" mt="xl" justify="center">
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
                        />
                        <ActionIcon
                            variant="outline"
                            color="var(--my-primary-dark)"
                            className={classes.actionIcon}
                            onClick={() => toggleColorScheme()}
                            title="Toggle color scheme"
                        >
                            {colorScheme === 'dark'
                                ? <IconSun size={18} color="var(--my-primary)" />
                                : <IconMoon size={18} color="var(--my-primary)" />}
                        </ActionIcon>
                        {/* Profile/role button in burger menu */}
                        <Menu position="bottom-end" withinPortal>
                          <Menu.Target>
                            <ActionIcon
                              variant="transparent"
                              size="lg"
                              title="Selecteer profiel"
                              style={{ marginLeft: 8, background: 'transparent', boxShadow: 'none' }}
                              data-profile-btn
                            >
                              <Avatar radius="xl" size={32} className={classes.profileAvatar} style={{ background: 'var(--my-bgheader)', color: 'var(--my-primary)' }}>
                                {role?.icon && (
                                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18 }}>
                                    {role.icon && typeof role.icon.type === 'function'
                                      ? <role.icon.type size={16} color="var(--my-primary)" />
                                      : role.icon}
                                  </span>
                                )}
                              </Avatar>
                            </ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown className={classes.profileDropdown} style={{ maxHeight: 320, overflowY: 'auto' }}>
                            <Menu.Label>Kies je profiel</Menu.Label>
                            {roles.map(r => (
                              <Menu.Item
                                key={r.key}
                                leftSection={r.icon}
                                onClick={() => { setRole(r); }}
                                className={[
                                  classes.profileItem,
                                  role?.key === r.key ? classes.selectedProfileItem : null
                                ].filter(Boolean).join(' ')}
                              >
                                <Text size="sm" c={role?.key === r.key ? undefined : undefined}>{r.menuTitle[lang]}</Text>
                              </Menu.Item>
                            ))}
                            <Menu.Divider />
                            <Menu.Item onClick={() => { setRole(null); }}>
                              <Text size="xs" c="dimmed">Geen profiel</Text>
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                    </Group>
                </nav>
            </Drawer>
        </header>
    );
}