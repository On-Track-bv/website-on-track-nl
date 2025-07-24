

import { Button, Container, Group, Text } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import classes from './Home.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

const texts = {
    en: {
        title: (
            <h1 className={classes.title}>
                Your{' '}
                <span className={classes.gradientText}>
                    dataflow
                </span>{' '}
                finally as expected
            </h1>
        ),
        description:
            'Define what information you need and we will take care of every necessary connection. Between your programs and with your people.',
        getStarted: 'Get started',
        github: 'GitHub',
    },
    nl: {
        title: (
            <h1 className={classes.title}>
                Jouw{' '}
                <span className={classes.gradientText}>
                    dataset
                </span>{' '}
                eindelijk zoals verwacht
            </h1>
        ),
        description:
            'Stel vast welke informatie je nodig hebt, dan zorgen wij voor elke noodzakelijke verbinding. Tussen jou programma\'s en met jou mensen.',
        getStarted: 'Aan de slag',
        github: 'GitHub',
    },
};

export function Home() {
    const { lang } = useLanguage();
    const t = texts[lang];

    return (
        <div className={classes.wrapper}>
            <Container size={1000} className={classes.inner}>
                <h1 className={classes.title}>
                    {t.title}
                </h1>

                <Text className={classes.description} >
                    {t.description}
                </Text>

                <Group className={classes.controls}>
                    <Button
                        size="xl"
                        className={`${classes.control} ${classes.gradientButton}`}
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
                        leftSection={<GithubIcon size={20} />}
                    >
                        {t.github}
                    </Button>
                </Group>
            </Container>
        </div>
    );
}