import {Container, Group, Text, useMantineColorScheme } from '@mantine/core';
import onTrackBeeldmerkLight from '../../assets/on-track/on-track-beeldmerk.svg';
import onTrackBeeldmerkDark from '../../assets/on-track/on-track-beeldmerk_wit.svg';
import onTrackLogoLight from '../../assets/on-track/on-track-outline_logo.svg';
import onTrackLogoDark from '../../assets/on-track/on-track-outline_logo_wit.svg';
import classes from './Footer.module.css';

import { useLanguage } from '../../contexts/LanguageContext';

export function Footer() {
    const { colorScheme } = useMantineColorScheme();
    const { lang, setLang } = useLanguage();

    const address = lang === 'nl'
        ? [
            "On-Track B.V. (postadres)",
            "Broodakker 19",
            "5374DM Schaijk",
            "Nederland",
            "info@on-track.nl"
        ]
        : [
            "On-Track B.V. (postal address)",
            "Broodakker 19",
            "5374DM Schaijk",
            "Netherlands",
            "info@on-track.nl"
        ];

    const copyright = lang === 'nl'
        ? "© 2025 On-Track B.V. Alle rechten voorbehouden."
        : "© 2025 On-Track B.V. All rights reserved.";

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <img
                        src={colorScheme === 'dark' ? onTrackBeeldmerkDark : onTrackBeeldmerkLight}
                        alt="On-Track logo"
                        style={{ height: 45, marginBottom: 16 }}
                    />
                    {address.map((line, idx) => (
                        <Text key={idx} size="xs" c="dimmed" className={classes.description}>
                            {line}
                        </Text>
                    ))}
                </div>
                <div className={classes.logo}>
                    <img
                        src={colorScheme === 'dark' ? onTrackLogoDark : onTrackLogoLight}
                        alt="On-Track logo"
                        style={{ height: 150 }}
                    />
                </div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text size="sm" c='var(--my-subtext)'>
                    {copyright}
                </Text>
                {/* Optional: Add a language switch button like in the header */}
                <Group mt="xs" justify="center">
                    <button
                        className={classes.languageButton}
                        onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--my-primary)',
                            cursor: 'pointer',
                            fontWeight: 700,
                            fontSize: '0.9em'
                        }}
                    >
                        {lang === 'nl' ? 'English' : 'Nederlands'}
                    </button>
                </Group>
            </Container>
        </footer>
    );
}