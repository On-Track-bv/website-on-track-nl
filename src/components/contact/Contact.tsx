import { Button, Group, SimpleGrid, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLanguage } from '../../contexts/LanguageContext';
import classes from './Contact.module.css';
import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const texts = {
    en: {
        title: (
            <>
                Get in touch or email us at: <span className={classes.emailHighlight}>info@on-track.nl</span>
            </>
        ),
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'Your email',
        subjectPlaceholder: 'Subject',
        messagePlaceholder: 'Your message',
        send: 'Send message',
        success: 'Message sent!',
        error: 'Sending failed.',
        phone: 'Phone',
        phonePlaceholder: 'Your phone number',
    },
    nl: {
        title: (
            <>
                Neem contact op of e-mail naar: <span className={classes.emailHighlight}>info@on-track.nl</span>
            </>
        ),
        name: 'Naam',
        email: 'E-mail',
        subject: 'Onderwerp',
        message: 'Bericht',
        namePlaceholder: 'Uw naam',
        emailPlaceholder: 'Uw e-mailadres',
        subjectPlaceholder: 'Onderwerp',
        messagePlaceholder: 'Uw bericht',
        send: 'Verstuur bericht',
        success: 'Bericht verzonden!',
        error: 'Verzenden mislukt.',
        phone: 'Telefoon',
        phonePlaceholder: 'Uw telefoonnummer',
    },
};

export function Contact() {
    const { lang } = useLanguage();
    const t = texts[lang];
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const handleCaptchaChange = (token: string | null) => {
        setCaptchaVerified(!!token);
        setCaptchaToken(token);
    };

    const sanitize = (value: string) => DOMPurify.sanitize(value);

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        },
        validate: {
            name: (value) => value.trim().length < 2,
            email: (value) => !/^\S+@\S+$/.test(value),
            phone: (value) => value.trim().length < 6, // basic check
            subject: (value) => value.trim().length === 0,
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        setFeedback(null);
        try {
            // No executeAsync for visible captcha!
            const sanitized = {
                name: sanitize(values.name),
                email: sanitize(values.email),
                phone: sanitize(values.phone),
                subject: sanitize(values.subject),
                message: sanitize(values.message),
                time: new Date().toISOString(), // <-- timestamp toegevoegd
            };

            const templateParams = {
                ...sanitized,
                'g-recaptcha-response': captchaToken,
            };

            await emailjs.send(
                'service_ypr4idc',
                'template_3r6zip3',
                templateParams,
                'wcDCkSKWdKMZlZ2QZ'
            );
            setFeedback(t.success);
            form.reset();
        } catch (error) {
            setFeedback(t.error);
            console.error('EmailJS error:', error);
        }
        setLoading(false);
    };  

    return (
        <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
            <Title order={2} size="h1" className={classes.title}>
                {t.title}
            </Title>

            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                <TextInput
                    label={t.name}
                    placeholder={t.namePlaceholder}
                    name="name"
                    variant="filled"
                    classNames={{ input: classes.input, label: classes.label }}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label={t.email}
                    placeholder={t.emailPlaceholder}
                    name="email"
                    variant="filled"
                    classNames={{ input: classes.input, label: classes.label }}
                    {...form.getInputProps('email')}
                />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl"> <div>
                <label className={classes.label} htmlFor="phone-input">
                    {t.phone}
                </label>
                <PhoneInput
                    country={'nl'}
                    value={form.values.phone}
                    onChange={phone => form.setFieldValue('phone', phone)}
                    inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: false,
                        placeholder: t.phonePlaceholder,
                        className: classes.input,
                        'data-invalid': form.errors.phone ? true : undefined, // <-- add this line
                    }}
                    containerClass={classes.phoneContainer}
                    inputClass={classes.input}
                    buttonClass={classes.phoneButton}
                    dropdownClass={classes.phoneDropdown}
                    specialLabel={t.phone}
                />    
                </div>
            </SimpleGrid>
            <TextInput
                label={t.subject}
                placeholder={t.subjectPlaceholder}
                mt="md"
                name="subject"
                variant="filled"
                classNames={{ input: classes.input, label: classes.label }}
                {...form.getInputProps('subject')}
            />
            <Textarea
                mt="md"
                label={t.message}
                placeholder={t.messagePlaceholder}
                maxRows={10}
                minRows={5}
                autosize
                name="message"
                variant="filled"
                classNames={{ input: classes.input, label: classes.label }}
                {...form.getInputProps('message')}
            />
            <div className={classes.captchaBox}>
                <ReCAPTCHA
                    sitekey="6LfXsYsrAAAAABaxstZ-CnPWqzGJr_fGMsgivilt"
                    size="normal"
                    ref={recaptchaRef}
                    onChange={handleCaptchaChange}
                />
            </div>

            <Group justify="center" mt="xl">
                <Button
                    type="submit"
                    size="md"
                    className={classes.button}
                    disabled={!captchaVerified || loading}
                    loading={loading}
                >
                    {t.send}
                </Button>
            </Group>
            {feedback && (
                <div className={classes.feedback}>
                    {feedback}
                </div>
            )}
        </form>
    );
}