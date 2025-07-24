import { useState } from 'react';
import { Burger, Container, Group, ActionIcon, Button } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import ReactCountryFlag from "react-country-flag";
import { useDisclosure } from '@mantine/hooks';
import { useMantineColorScheme } from '@mantine/core';
import onTrackBeeldmerkLight from '../../assets/on-track-beeldmerk.svg';
import onTrackBeeldmerkDark from '../../assets/on-track-beeldmerk_wit.svg';
import classes from './Header.module.css';
import { useLanguage } from '../../contexts/LanguageContext';


const linksNl = [
    { link: '#top', label: 'Home' },
    { link: '#who', label: 'Over ons' },
    { link: '#why', label: 'Visie en missie' },
    { link: '#what', label: 'Diensten' },
    { link: '#contact-us', label: 'Contact' },
];

const linksEn = [
    { link: '#top', label: 'Home' },
    { link: '#who', label: 'About us' },
    { link: '#why', label: 'Vision and mission' },
    { link: '#what', label: 'Services' },
    { link: '#contact-us', label: 'Contact' },
];

export function Header() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(linksNl[0].link);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { lang, setLang } = useLanguage();

    const links = lang === 'nl' ? linksNl : linksEn;

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
                if (link.link === '#top') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (link.link.startsWith('#')) {
                    const el = document.getElementById(link.link.substring(1));
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <Container size="lg" className={classes.inner}>
                <Group gap={5} visibleFrom="xs">
                    <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <img
                            src={colorScheme === 'dark' ? onTrackBeeldmerkDark : onTrackBeeldmerkLight}
                            alt="On-Track logo"
                            style={{ height: 45, cursor: 'pointer' }}
                        />
                    </a>
                </Group>
                <div className={classes.rightGroups}>
                    <Group gap={6} visibleFrom="xs">
                        {items}
                    </Group>
                    <Group>
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
                        >
                        </Button>
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
                    </Group>
                </div>
                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </header>
    );
}