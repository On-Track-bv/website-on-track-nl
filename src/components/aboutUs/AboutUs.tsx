import { useLanguage } from '../../contexts/LanguageContext';
import janImg from '../../assets/on-track/Jan.jpg';
import stijnImg from '../../assets/on-track/Stijn.jpg';
import rienhImg from '../../assets/on-track/Rien.jpg';
import classes from './AboutUs.module.css';

const people = {
  en: [
    {
      name: 'Jan Brouwer',
      role: 'Co-founder',
      email: 'jbrouwer@on-track.nl',
      img: janImg,
      story: 'Jan is the technical engine behind On-Track. With a background in architecture and a passion for digital innovation, he develops smart tools that truly work in practice. His drive? Solving complex problems through open standards and automation. Jan ensures the technical quality of our solutions and translates abstract standards into practical applications.',
    },
    {
      name: 'Stijn van Schaijk',
      role: 'Co-founder',
      email: 'svschaijk@on-track.nl',
      img: stijnImg,
      story: 'Stijn makes sure technology and people connect. He guides clients from initial needs to full implementation, always with a personal touch. His strength lies in bridging the gap from construction site to boardroom. At On-Track, he focuses on client processes, implementation, commercial strategy, and sustainability.',
    },
    {
      name: 'Rien van der Scheur',
      role: 'Co-founder',
      email: 'rvdscheur@on-track.nl',
      img: rienhImg,
      story: 'Rien moves effortlessly between technology and real-world application. He focuses on user experience, BIM processes, and product development. With a strong understanding of both systems and the shop floor, Rien ensures our digital solutions truly fit the way people work.',
    },
  ],
  nl: [
    {
      name: 'Jan Brouwer',
      role: 'Mede-eigenaar',
      email: 'jbrouwer@on-track.nl',
      img: janImg,
      story: 'Jan is de technische motor achter On-Track. Met zijn achtergrond in bouwkunde en passie voor digitalisering ontwikkelt hij slimme tools die écht werken in de praktijk. Zijn drijfveer? Complexe problemen oplossen met open standaarden en automatisering. Jan bewaakt de inhoudelijke kwaliteit en vertaalt abstracte standaarden naar concrete oplossingen.',
    },
    {
      name: 'Stijn van Schaijk',
      role: 'Mede-eigenaar',
      email: 'svschaijk@on-track.nl',
      img: stijnImg,
      story: 'Stijn zorgt ervoor dat techniek en mensen elkaar vinden. Hij begeleidt klanten van wens tot implementatie en houdt het proces soepel en persoonlijk. Zijn kracht ligt in het verbinden van bouwkeet tot boardroom, met oog voor resultaat én gebruiksgemak. Stijn is ook verantwoordelijk voor het commerciële stuk en duurzaamheid binnen On-Track.',
    },
    {
      name: 'Rien van der Scheur',
      role: 'Mede-eigenaar',
      email: 'rvdscheur@on-track.nl',
      img: rienhImg,
      story: 'Rien beweegt zich moeiteloos tussen techniek en praktijk. Hij richt zich op de gebruikerservaring, BIM-processen en productontwikkeling. Zijn kracht ligt in het verbinden van systemen, mensen en informatie. Met zijn brede ervaring zorgt hij dat digitale oplossingen écht aansluiten op de werkvloer.',
    },
  ],
};

export function AboutUs() {
  const { lang } = useLanguage();
  const team = people[lang];

  return (
    <div className={classes.wrapper}>
      <div className={classes.grid}>
        {team.map((person) => (
          <div className={classes.card} key={person.email}>
            <img src={person.img} alt={person.name} className={classes.avatar} />
            <div className={classes.name}>{person.name}</div>
            <div className={classes.infoLine}>
              <span className={classes.email}>{person.email}</span>
              <span className={classes.dot}>•</span>
              <span className={classes.email}>{person.role}</span>
            </div>
            <div className={classes.story}>{person.story}</div>
          </div>
        ))}
      </div>
    </div>
  );
}