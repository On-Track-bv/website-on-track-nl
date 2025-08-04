import {
  IconDatabase,
  IconBuildingBridge,
  IconSettingsAutomation,
  IconRepeat,
  IconCheckupList,
  IconApi,
  IconShieldCheck,
  IconMap,
  IconLink,
  IconCode,
} from '@tabler/icons-react';
import { useRole } from '../../contexts/RoleContext';
import { Container, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './Services.module.css';
import { useLanguage } from '../../contexts/LanguageContext';


const servicesContent = {
  basic: {
    nl: {
      consultancyTitle: 'Consultancy',
      consultancyDescription: 'Wij helpen je om je informatiebehoefte te structureren, te verrijken en te delen, zonder ingewikkeld jargon. Altijd overzicht, altijd centraal.',
      consultancy: [
        { icon: IconDatabase, title: 'Informatie op orde', description: 'We zorgen dat je alle projectinformatie makkelijk terugvindt en deelt met je team. Geen losse bestanden, alles centraal.' },
        { icon: IconBuildingBridge, title: 'Samenwerken zonder gedoe', description: 'We zorgen dat jouw informatie aansluit bij die van je partners, zodat samenwerken vanzelf gaat.' },
        { icon: IconCheckupList, title: 'Verrijken en controleren', description: 'We helpen je informatie aan te vullen en te controleren, zodat je altijd met de juiste gegevens werkt.' },
        { icon: IconRepeat, title: 'Uniform werken', description: 'Iedereen werkt op dezelfde manier, waardoor je minder tijd kwijt bent aan zoeken en uitleg.' },
        { icon: IconSettingsAutomation, title: 'Toekomstbestendig', description: 'Met onze begeleiding en software ben je klaar voor de toekomst en kun je makkelijk inspelen op nieuwe eisen.' },
      ],
      softwareTitle: 'Software',
      softwareDescription: 'Onze software maakt het makkelijk om informatie te verzamelen, te delen, te verrijken en te bewaren.',
      software: [
        { icon: IconApi, title: 'Alles centraal', description: 'Nooit meer zoeken: alle documenten en gegevens op één plek, voor iedereen toegankelijk.' },
        { icon: IconShieldCheck, title: 'Eenvoudig in gebruik', description: 'Geen technische kennis nodig, iedereen kan ermee werken.' },
        { icon: IconMap, title: '3D omgeving', description: 'Bekijk je projectinformatie in een eenvoudige 3D omgeving, zodat iedereen het snapt.' },
        { icon: IconSettingsAutomation, title: 'Altijd up-to-date', description: 'Automatische updates en controles zorgen dat je informatie altijd klopt.' },
      ],
    },
    en: {
      consultancyTitle: 'Consultancy',
      consultancyDescription: 'We help you organize, enrich and share your information needs, without technical jargon. Always clear, always central.',
      consultancy: [
        { icon: IconDatabase, title: 'Information in order', description: 'We make sure you can easily find and share all your project information. No scattered files, everything in one place.' },
        { icon: IconBuildingBridge, title: 'Effortless collaboration', description: 'We ensure your information matches your partners, so collaboration is easy.' },
        { icon: IconCheckupList, title: 'Enrich and check', description: 'We help you add and check information, so you always work with the right data.' },
        { icon: IconRepeat, title: 'Uniform working', description: 'Everyone works the same way, so you spend less time searching and explaining.' },
        { icon: IconSettingsAutomation, title: 'Future-proof', description: 'With our guidance and software, you are ready for the future and can easily adapt to new requirements.' },
      ],
      softwareTitle: 'Software',
      softwareDescription: 'Our software makes it easy to collect, share, enrich and store information.',
      software: [
        { icon: IconApi, title: 'Everything in one place', description: 'Never search again: all documents and data in one spot, accessible to everyone.' },
        { icon: IconShieldCheck, title: 'Easy to use', description: 'No technical knowledge required, everyone can use it.' },
        { icon: IconMap, title: '3D environment', description: 'View your project information in a simple 3D environment, so everyone understands.' },
        { icon: IconSettingsAutomation, title: 'Always up-to-date', description: 'Automatic updates and checks keep your information correct.' },
      ],
    }
  },
  bim: {
    nl: {
      consultancyTitle: 'Consultancy',
      consultancyDescription: 'Wij helpen je om BIM-data optimaal te benutten en processen te verbeteren met open standaarden en slimme tools.',
      consultancy: [
        { icon: IconDatabase, title: 'Begeleiding van Excel naar database', description: 'We helpen bedrijven om hun informatiebehoefte uit Excel of andere ongestructureerde bronnen om te zetten naar een database, waarbij we standaarden als bSDD direct kunnen verwerken. Zo wordt informatie direct toepasbaar in BIM-software en het bouwproces.' },
        { icon: IconBuildingBridge, title: 'Aansluiting met samenwerkingspartners', description: 'We zorgen dat de informatiebehoefte van onze klanten aansluit bij die van samenwerkingspartners zoals overheden, fabrikanten, aannemers en ontwikkelaars. Daarbij zorgen we dat standaarden als bSDD en IDS worden meegenomen.' },
        { icon: IconSettingsAutomation, title: 'Procesverbetering', description: 'We zorgen dat data volgens de informatiebehoefte correct wordt aangeleverd en dat medewerkers weten wat zij eruit kunnen halen. Dit levert direct procesverbetering op, zoals efficiënter calculeren, duidelijke inkoop, snellere werkvoorbereiding en automatisch genereren van materialenpaspoorten. Hierbij maken we gebruik van open standaarden als IFC en IDS.' },
        { icon: IconRepeat, title: 'Uniforme informatieverwerking', description: 'We zorgen dat bedrijven hun informatie altijd op dezelfde manier ontvangen of versturen, met gebruik van bSDD en IDS voor structuur en validatie. Hierdoor zoeken medewerkers minder naar de juiste gegevens.' },
        { icon: IconCheckupList, title: 'Verrijken en controleren van BIM modellen', description: 'Wij zorgen dat de BIM modellen van onze klanten exact voldoen aan de informatiebehoefte. Verrijking en controle doen we o.a. met bSDD en IFC. We kunnen dit voor je doen of je trainen, ondersteund door onze software.' },
        { icon: IconMap, title: 'GEO-BIM experts', description: 'BIM en GIS data moeiteloos door elkaar heen gebruiken? Vraag naar de mogelijkheden!' },
      ],
      softwareTitle: 'Software',
      softwareDescription: 'Onze software verbindt, valideert en verrijkt je BIM-data uit elke bron.',
      software: [
        { icon: IconApi, title: 'IFC-Wasstraat', description: 'Met de IFC-Wasstraat zorgen we dat IFC-bestanden altijd “On-Track” zijn: altijd op koers, altijd een groene datastroom. Praktische toepasbaarheid van informatiebehoefte, controle, validatie en verrijking van IFC-bestanden.' },
        { icon: IconCode, title: 'Add-ins voor bestaande software', description: 'We maken add-ins voor o.a. Revit, SketchUp, Tekla, ACC en Trimble Connect. Hiermee kun je informatie invoeren bij de bron, controleren, verrijken en BIM-modellen bekijken op basis van de informatiebehoefte.' },
        { icon: IconRepeat, title: 'Uniforme informatiestroom', description: 'We kunnen aansluiten op ieder pakket en zo een uniforme informatiestroom garanderen, onafhankelijk van de gebruikte software.' },
        { icon: IconMap, title: '3D omgeving', description: 'Wij leveren 3D omgevingen van iedere locatie in Nederland, inclusief verschillende kaartlagen. Ideaal voor ontwerpers, ontwikkelaars en aannemers om plannen in 3D te maken en te presenteren.' },
        { icon: IconSettingsAutomation, title: 'Toekomstbestendigheid', description: 'Wij zorgen voor een beter georganiseerd, uitwisselbaar projectdossier, betere communicatie tussen partijen, eisen onder controle en een “Wasstraat” voor correcte informatie. Met gestructureerde informatiebronnen kan AI het proces verder versnellen.' },
      ],
    },
    en: {
      consultancyTitle: 'Consultancy',
      consultancyDescription: 'We help you get the most out of your BIM data and improve processes with open standards and smart tools.',
      consultancy: [
        { icon: IconDatabase, title: 'Guidance from Excel to database-driven information', description: 'We help companies translate their information needs from Excel or other unstructured formats into a database, directly processing standards like bSDD. This makes information directly usable in BIM software and the construction process.' },
        { icon: IconBuildingBridge, title: 'Connecting with partners', description: 'We ensure your information needs align with those of partners such as governments, manufacturers, contractors, and developers, including standards like bSDD and IDS.' },
        { icon: IconSettingsAutomation, title: 'Process improvement', description: 'We ensure data is delivered according to your information needs and employees know how to use it. This leads to immediate process improvements, such as more efficient calculations, clear procurement, faster work preparation, and automatic generation of material passports. We use open standards like IFC and IDS.' },
        { icon: IconRepeat, title: 'Uniform information processing', description: 'We ensure your company always sends and receives information in a consistent way, using bSDD and IDS for structure and validation. This reduces time spent searching for the right data.' },
        { icon: IconCheckupList, title: 'Enrich and check BIM models', description: 'We ensure your BIM models meet your information needs exactly. Enrichment and checking is done with bSDD and IFC. We can do this for you or train your team, supported by our software.' },
        { icon: IconMap, title: 'GEO-BIM experts', description: 'Effortlessly use BIM and GIS data together? Ask us about the possibilities!' },
      ],
      softwareTitle: 'Software',
      softwareDescription: 'Our software connects, validates, and enriches your BIM data from any source.',
      software: [
        { icon: IconApi, title: 'IFC-Washstreet', description: 'With the IFC-Washstreet, we ensure IFC files are always “On-Track”: always on course, always a green data flow. Practical application of information needs, control, validation, and enrichment of IFC files.' },
        { icon: IconCode, title: 'Add-ins for existing software', description: 'We create add-ins for Revit, SketchUp, Tekla, ACC, and Trimble Connect. These help with data entry at the source, validation, enrichment, and viewing BIM models based on information needs.' },
        { icon: IconRepeat, title: 'Uniform information flow', description: 'We can connect to any package and guarantee a uniform information flow, regardless of the software you use.' },
        { icon: IconMap, title: '3D environment', description: 'We deliver 3D environments for any location in the Netherlands, including various map layers. Perfect for designers, developers, and contractors to create and present plans in 3D.' },
        { icon: IconSettingsAutomation, title: 'Future-proofing', description: 'We ensure a better organized, exchangeable project dossier, improved communication between all parties, requirements under control, and a “Washstreet” for correct information. With structured information sources, AI can further accelerate the process.' },
      ],
    }
  },
  data: {
    nl: {
      consultancyTitle: 'Consultancy',
      consultancyDescription: 'Wij maken data en integraties praktisch toepasbaar voor jouw organisatie. Altijd verbonden, altijd actueel.',
      consultancy: [
        { icon: IconLink, title: 'LinkedData & standaarden', description: 'Koppel databronnen en standaarden met LinkedData, bSDD en andere open standaarden.' },
        { icon: IconCode, title: 'Software integraties', description: 'Wij bouwen koppelingen tussen BIM, GIS, ERP, CDE’s en andere systemen. Ook voor validatie en verrijking van data.' },
        { icon: IconCheckupList, title: 'Verrijken en controleren', description: 'Wij zorgen dat data uit verschillende bronnen wordt verrijkt, gecontroleerd en samengebracht tot één geheel.' },
        { icon: IconRepeat, title: 'Uniforme data-uitwisseling', description: 'Altijd dezelfde structuur en kwaliteit, ongeacht de bron of het systeem.' },
        { icon: IconSettingsAutomation, title: 'Toekomstbestendig & AI', description: 'Met onze oplossingen ben je klaar voor de toekomst: van uitwisselbare projectdossiers tot AI-ondersteunde processen.' },
      ],
      softwareTitle: 'Software',
      softwareDescription: 'Onze software ontsluit, koppelt, verrijkt en standaardiseert data uit verschillende bronnen en systemen.',
      software: [
        { icon: IconApi, title: 'API-koppelingen', description: 'Integreer data uit verschillende systemen, zoals BIM, GIS, ERP en meer.' },
        { icon: IconShieldCheck, title: 'Standaardisatie', description: 'Werk altijd met uniforme, gevalideerde data, klaar voor uitwisseling en analyse.' },
        { icon: IconMap, title: '3D omgevingen & kaartlagen', description: 'Combineer data uit verschillende bronnen in een 3D omgeving, inclusief kaartlagen en locatie-informatie.' },
        { icon: IconSettingsAutomation, title: 'AI & automatisering', description: 'Automatiseer controles, verrijking en rapportages met slimme software en AI.' },
      ],
    },
    en: {
      consultancyTitle: 'Consultancy',
      consultancyDescription: 'We make data and integrations practical for your organization. Always connected, always up-to-date.',
      consultancy: [
        { icon: IconLink, title: 'LinkedData & standards', description: 'Connect data sources and standards with LinkedData, bSDD and other open standards.' },
        { icon: IconCode, title: 'Software integrations', description: 'We build integrations between BIM, GIS, ERP, CDEs and other systems. Also for validation and enrichment of data.' },
        { icon: IconCheckupList, title: 'Enrich and check', description: 'We enrich, check and combine data from different sources into one whole.' },
        { icon: IconRepeat, title: 'Uniform data exchange', description: 'Always the same structure and quality, regardless of the source or system.' },
        { icon: IconSettingsAutomation, title: 'Future-proof & AI', description: 'With our solutions you are ready for the future: from exchangeable project dossiers to AI-supported processes.' },
      ],
      softwareTitle: 'Software',
      softwareDescription: 'Our software unlocks, connects, enriches and standardizes data from various sources and systems.',
      software: [
        { icon: IconApi, title: 'API integrations', description: 'Integrate data from different systems, such as BIM, GIS, ERP and more.' },
        { icon: IconShieldCheck, title: 'Standardization', description: 'Always work with uniform, validated data, ready for exchange and analysis.' },
        { icon: IconMap, title: '3D environments & map layers', description: 'Combine data from different sources in a 3D environment, including map layers and location info.' },
        { icon: IconSettingsAutomation, title: 'AI & automation', description: 'Automate checks, enrichment and reporting with smart software and AI.' },
      ],
    }
  }
};

interface FeatureProps {
  icon?: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div className={classes.feature}>
      {Icon && (
        <span className={classes.icon}><Icon size={22} stroke={1.5} /></span>
      )}
      <Text mt="sm" mb={7} className={classes.featureTitle}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6} className={classes.featureDescription}>
        {description}
      </Text>
    </div>
  );
}


function getRoleGroup(roleKey: string | undefined): 'basic' | 'bim' | 'data' {
  if (!roleKey) return 'basic';
  if ([
    'kringverjaardag',
    'directie',
    'opdrachtgever',
  ].includes(roleKey)) return 'basic';
  if ([
    'bouwinfra',
    'bimconsultant',
    'bimmanager',
    'overheid',
  ].includes(roleKey)) return 'bim';
  if ([
    'linkeddata',
    'developer',
  ].includes(roleKey)) return 'data';
  return 'basic';
}

export function Services() {
  const { lang } = useLanguage();
  const { role } = useRole();
  const group = getRoleGroup(role?.key);
  const t = servicesContent[group][lang];

  return (
    <Container className={classes.wrapper}>
      {/* Consultancy Section */}
      <Title className={classes.title}>{t.consultancyTitle}</Title>
      <Text className={classes.description}>{t.consultancyDescription}</Text>
      <SimpleGrid
        mt={40}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {t.consultancy.map((feature, idx) => (
          <Feature key={idx} {...feature} />
        ))}
      </SimpleGrid>

      {/* Software Section */}
      <Title className={classes.title} mt={80}>
        {t.softwareTitle}
      </Title>
      <Text className={classes.description}>{t.softwareDescription}</Text>
      <SimpleGrid
        mt={40}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {t.software.map((feature, idx) => (
          <Feature key={idx} {...feature} />
        ))}
      </SimpleGrid>
    </Container>
  );
}