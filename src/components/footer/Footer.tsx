import { Container, Group, Text, useMantineColorScheme, Modal, Button } from '@mantine/core';
import onTrackBeeldmerkLight from '../../assets/on-track/on-track-beeldmerk.svg';
import onTrackBeeldmerkDark from '../../assets/on-track/on-track-beeldmerk_wit.svg';
import onTrackLogoLight from '../../assets/on-track/on-track-outline_logo.svg';
import onTrackLogoDark from '../../assets/on-track/on-track-outline_logo_wit.svg';
import classes from './Footer.module.css';

import { useLanguage } from '../../contexts/LanguageContext';
import { useState } from 'react';

export function Footer() {
    const { colorScheme } = useMantineColorScheme();
    const { lang, setLang } = useLanguage();
    const [disclaimerOpened, setDisclaimerOpened] = useState(false);


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

const disclaimerNl = `De content op deze website is door On-Track B.V. met de grootst mogelijke zorg samengesteld, doch aanvaarden we geen aansprakelijkheid ten aanzien van mogelijke onjuistheden van de inhoud. On-Track B.V. is niet verantwoordelijk voor content op de aan deze website gekoppelde bestanden en/of websites waarnaar wordt verwezen. Ongeautoriseerd of oneigenlijk gebruik van de content of delen daarvan, maken inbreuk op intellectuele rechten. Toestemming tot het gebruik van de getoonde content of delen daarvan op publiekelijk toegankelijke plaatsen dient mag alleen na schriftelijke toestemming vanuit On-Track B.V.. Voor vragen kun je met ons telefonisch of via mail contact opnemen.`;

const disclaimerEn = `The content on this website has been compiled with the greatest possible care by On-Track B.V., but we accept no liability for any inaccuracies in the content. On-Track B.V. is not responsible for the content of files and/or websites linked to this website. Unauthorized or improper use of the content or parts thereof infringes intellectual property rights. Permission to use the displayed content or parts thereof in publicly accessible places may only be granted with written consent from On-Track B.V. For questions, you can contact us by phone or email.`;

  return (
        <footer className={classes.footer}>
            {/* ...existing code... */}
            <Container className={classes.afterFooter}>
                <Text size="sm" c='var(--my-subtext)'>
                    {copyright}
                </Text>
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
                    <Button
                        variant="subtle"
                        size="xs"
                        onClick={() => setDisclaimerOpened(true)}
                        style={{
                            color: 'var(--my-primary)',
                            fontWeight: 700,
                            fontSize: '0.9em'
                        }}
                    >
                        Disclaimer
                    </Button>
                </Group>
            </Container>
            <Modal
                opened={disclaimerOpened}
                onClose={() => setDisclaimerOpened(false)}
                title="Disclaimer"
                size="lg"
            >
                <Text size="sm" style={{ whiteSpace: 'pre-line', userSelect: 'text' }}>
                    {lang === 'nl' ? disclaimerNl : disclaimerEn}
                </Text>
            </Modal>
        </footer>
    );
}