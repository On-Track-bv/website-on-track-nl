import { useState } from 'react';
import { Burger, Container, Group } from '@mantine/core';
import onTrackLogo from '../../assets/on-track.png';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';

const links: { link: string; label: string }[] = [
    { link: '#top', label: 'Home' },
    // { link: '#contact-us', label: 'Contact' },
];


export function Header() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);

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
            <Container size="md" className={classes.inner}>

                <Group gap={5} visibleFrom="xs">
                    <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <img src={onTrackLogo} alt="On-Track logo" style={{ height: 36, cursor: 'pointer' }} />
                    </a>
                </Group>
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </header>
    );
}