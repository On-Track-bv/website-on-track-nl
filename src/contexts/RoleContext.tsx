import React, { createContext, useContext, useState } from 'react';
import {
  IconCake,
  IconBuilding,
  IconBriefcase,
  IconUserCheck,
  IconDatabase,
  IconLink,
  IconHome,
  IconBuildingBank,
  IconCode
} from '@tabler/icons-react';

export type Role = {
  key: string;
  menuTitle: { nl: string; en: string };
  label: { nl: string; en: string };
  desc: { nl: string; en: string };
  icon: React.ReactElement;
  avatar?: string; // Optional: for header avatar/profile
};

export const roles: Role[] = [
  {
    key: 'kringverjaardag',
    menuTitle: {
      nl: 'Algemeen',
      en: 'General',
    },
    label: {
      nl: 'De kringverjaardag',
      en: 'The family birthday',
    },
    desc: {
      nl: 'Wij helpen bedrijven in de bouw en infra om alle projectinformatie overzichtelijk en centraal op te slaan, in plaats van in losse Excel-bestanden. Met onze software en advies zorgen we dat iedereen met dezelfde, goed gestructureerde informatie werkt en die makkelijk kan aanvullen of corrigeren. Zo kun je beter en sneller bestellen, plannen, uitvoeren én opleveren. De informatie is bruikbaar, ook na de bouw.',
      en: 'We help construction and infrastructure companies store all project information centrally and clearly, instead of in scattered Excel files. With our software and advice, everyone works with the same, well-structured information that can be easily updated or corrected. This enables better and faster ordering, planning, execution, and delivery. The information remains useful, even after construction.'
    },
    icon: <IconCake />,
  },
  {
    key: 'bouwinfra',
    menuTitle: {
      nl: 'Bouw/Infra',
      en: 'Construction',
    },
    label: {
      nl: 'Ik werk in de bouw en infra',
      en: 'I work in construction and infrastructure',
    },
    desc: {
      nl: 'On-Track helpt de bouwsector meer uit het BIM-proces te halen met slimme software en consultancy. We maken LinkedData toepasbaar, verbeteren BIM-data consistentie en ondersteunen de overgang naar database-gedreven BIM.',
      en: 'On-Track helps the construction sector get more out of the BIM process with smart software and consultancy. We make LinkedData practical, improve BIM data consistency, and support the transition to database-driven BIM.'
    },
    icon: <IconBuilding />,
  },
  {
    key: 'directie',
    menuTitle: {
      nl: 'Directie',
      en: 'Management',
    },
    label: {
      nl: 'Ik ben directie of management',
      en: 'I am management or director',
    },
    desc: {
      nl: 'Wij helpen met meer uit je BIM modellen halen. Zodat je calculatie, planning en materialenpaspoorten sneller en beter kunt maken. Wij zorgen ervoor dat je met BIM modellen automatisch kunt plannen, calculeren en materialenpaspoorten kunt maken. Door onze hulp gaat je BIM proces in één keer goed, je hebt minder iteraties.',
      en: 'We help you get more out of your BIM models, so you can calculate, plan, and create material passports faster and better. We ensure you can automatically plan, calculate, and create material passports with BIM models. With our help, your BIM process is right the first time, with fewer iterations.'
    },
    icon: <IconBriefcase />,
  },
  {
    key: 'bimconsultant',
    menuTitle: {
      nl: 'BIM-consultant',
      en: 'BIM Consultant',
    },
    label: {
      nl: 'Ik ben een BIM-consultant',
      en: 'I am a BIM consultant',
    },
    desc: {
      nl: 'Wij maken software waarmee jij je klanten kan helpen de data in de BIM modellen beter te organiseren. Wij maken software die jij of je klant kan gebruiken om de data in de BIM modellen beter te krijgen.',
      en: 'We create software that helps you assist your clients in organizing BIM model data better. Our software can be used by you or your client to improve the data in BIM models.'
    },
    icon: <IconUserCheck />,
  },
  {
    key: 'bimmanager',
    menuTitle: {
      nl: 'BIM-manager',
      en: 'BIM Manager',
    },
    label: {
      nl: 'Ik ben een BIM manager',
      en: 'I am a BIM manager',
    },
    desc: {
      nl: 'Wij helpen met de transitie van Excel gedreven BIM naar database gedreven BIM. Waardoor de informatie in je BIM modellen veel constanter en voorspelbaarder wordt. Wij helpen BIM modellen altijd dezelfde informatie te bevatten. Wij helpen iedere domeinspecialist zonder modelleerkennis met het verrijken van BIM modellen.',
      en: 'We help with the transition from Excel-driven BIM to database-driven BIM, making the information in your BIM models much more consistent and predictable. We help BIM models always contain the same information. We help every domain specialist, even without modeling knowledge, enrich BIM models.'
    },
    icon: <IconDatabase />,
  },
  {
    key: 'linkeddata',
    menuTitle: {
      nl: 'LinkedData',
      en: 'LinkedData',
    },
    label: {
      nl: 'Ik ben LinkedData consultant of bedrijf',
      en: 'I am a LinkedData consultant or company',
    },
    desc: {
      nl: 'Wij helpen bedrijven om LinkedData simpel en praktisch toepasbaar maken in BIM software. Dit doen we door Software te bouwen en Consultancy te leveren.',
      en: 'We help companies make LinkedData simple and practical in BIM software. We do this by building software and providing consultancy.'
    },
    icon: <IconLink />,
  },
  {
    key: 'opdrachtgever',
    menuTitle: {
      nl: 'Opdrachtgever',
      en: 'Client',
    },
    label: {
      nl: 'Ik ben een opdrachtgever of gebouwbeheerder',
      en: 'I am a client or building manager',
    },
    desc: {
      nl: 'Wij zorgen ervoor dat de BIM-data die jij opgeleverd krijgt bruikbaar zijn in de gebouwbeheersfase. Wij zorgen ervoor dat de mutaties die jij doet in jouw gebouwbeheer software ook veranderen in de BIM-data.',
      en: 'We ensure that the BIM data you receive is usable in the building management phase. We also ensure that changes you make in your building management software are reflected in the BIM data.'
    },
    icon: <IconHome />,
  },
  {
    key: 'overheid',
    menuTitle: {
      nl: 'Overheid',
      en: 'Government',
    },
    label: {
      nl: 'Ik werk bij (Semi-)overheden',
      en: 'I work at (semi-)government',
    },
    desc: {
      nl: 'Wij helpen jouw informatiebehoefte praktisch toepasbaar te maken voor de partijen die jou informatie aan moeten leveren. Wij helpen met het aanvragen van vergunning op basis van BIM.',
      en: 'We help make your information needs practically applicable for the parties that need to supply you with information. We help with permit applications based on BIM.'
    },
    icon: <IconBuildingBank />,
  },
  {
    key: 'developer',
    menuTitle: {
      nl: 'Developer',
      en: 'Developer',
    },
    label: {
      nl: 'Ik ben een software developer',
      en: 'I am a software developer',
    },
    desc: {
      nl: 'Door software integraties te bouwen verbinden wij de LinkedData en de BIM wereld. Wij maken software componenten die jij kan gebruiken om jouw gebruikers toegang te geven tot bestaande standaarden. Ontzorgen door op een uniforme manier de standaarden aan te bieden in een IFC structuur. Wij snappen zowel de LinkedData als de BIM-software wereld, onze software integraties zorgen ervoor dat beide werelden praktisch aansluiten. Verschillende standaarden ontsluiten op een praktische manier. Dit kan een IDS, bSDD of LinkedData standaard zijn, wij tonen hem in samenhang en uniform.',
      en: 'By building software integrations, we connect the LinkedData and BIM worlds. We create software components you can use to give your users access to existing standards. We unburden you by offering standards in a uniform way in an IFC structure. We understand both the LinkedData and BIM software worlds, and our integrations ensure both worlds connect practically. We unlock different standards in a practical way. This can be an IDS, bSDD, or LinkedData standard; we show them in context and uniformly.'
    },
    icon: <IconCode />,
  },
];

type RoleContextType = {
  role: Role | null;
  setRole: (role: Role | null) => void;
  roles: Role[];
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  return (
    <RoleContext.Provider value={{ role, setRole, roles }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within a RoleProvider');
  return context;
}
