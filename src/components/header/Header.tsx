import React from 'react';
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
    { link: '#what', label: 'Diensten' },
    { link: '#who', label: 'Over ons' },
    { link: '#contact-us', label: 'Contact' },
];

const linksEn = [
    { link: '#top', label: 'Home' },
    { link: '#why', label: 'Vision and mission' },
    { link: '#what', label: 'Services' },
    { link: '#who', label: 'About us' },
    { link: '#contact-us', label: 'Contact' },
];

export function Header() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(linksNl[0].link);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { lang, setLang } = useLanguage();

    const links = lang === 'nl' ? linksNl : linksEn;
    const { role, setRole, roles } = useRole();
    const [roleMenuOpened, setRoleMenuOpened] = useState(false);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
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
                // Sluit de Drawer als hij open is (alleen op mobiel)
                close();
            }}
        >
            {link.label}
        </a>
    ));

    const sectionIds = links.map(link => link.link.replace('#', ''));

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;
            let currentSection = "#top";
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el) {
                    const top = el.offsetTop;
                    if (scrollPosition >= top) {
                        currentSection = `#${id}`;
                    }
                }
            }
            if (active !== currentSection) {
                setActive(currentSection);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, active]);

    return (
        <header className={classes.header}>
            <Container size="lg" className={classes.inner}>
                {/* Logo altijd zichtbaar */}
                <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
                        {items}
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