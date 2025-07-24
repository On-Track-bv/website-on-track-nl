import { Avatar, Button, Paper, Text, SimpleGrid } from '@mantine/core';
import { useLanguage } from '../../contexts/LanguageContext';
import janImg from '../../assets/jan.jpg';
import stijnImg from '../../assets/stijn.jpg';
import rienhImg from '../../assets/rien.jpg';
import classes from './AboutUs.module.css';

const people = {
  en: [
    {
      name: 'Jan Brouwer',
      role: 'Co-founder',
      email: 'jbrouwer@on-track.nl',
      img: janImg,
      story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida urna libero, vitae interdum ipsum tristique vel. Cras nec sem in diam faucibus dapibus. Sed dolor velit, ultricies vitae nisl quis, rhoncus aliquet urna. Curabitur ultricies sapien turpis, quis tempus nunc congue at. Vestibulum ornare erat vel pharetra malesuada. Sed quis vulputate orci, quis pretium nunc. Nulla ullamcorper nibh at risus tempor feugiat. Nunc tortor enim, lacinia at ultrices vehicula, euismod quis elit. Proin consequat lorem eu ex tincidunt, in suscipit dolor semper.',
    },
    {
      name: 'Stijn van Schaijk',
      role: 'Co-founder',
      email: 'svschaijk@on-track.nl',
      img: stijnImg,
      story: 'Etiam congue nulla sed ante pulvinar dictum. Nulla nec facilisis erat, non efficitur ex. Praesent ac odio non libero suscipit eleifend. Nunc facilisis aliquet erat vel facilisis. Maecenas at tortor in turpis finibus aliquet. Duis lacinia mi non lorem facilisis, et faucibus dui pulvinar. In fringilla malesuada ultricies. Duis diam sapien, porta sed diam id, laoreet sagittis lacus. Phasellus fringilla condimentum lorem, nec luctus eros interdum eget. Curabitur eros diam, gravida vitae volutpat non, feugiat varius nulla. Sed laoreet luctus sagittis. Donec vehicula condimentum nulla vel placerat. Aliquam lobortis eget sapien sit amet lacinia. Aliquam commodo, dolor eget placerat porta, ante tellus dapibus velit, et dictum tellus diam ut arcu. Maecenas eget suscipit orci.',
    },
    {
      name: 'Rien van der Scheur',
      role: 'Co-founder',
      email: 'rvdscheur@on-track.nl',
      img: rienhImg,
      story: 'Nunc sit amet ornare lectus. Donec non velit ut ex tristique ornare. Nulla at magna enim. Integer quis dui eget metus egestas lacinia sed vel arcu. Sed ultrices, eros in finibus tempus, orci lorem scelerisque est, nec efficitur ligula elit sit amet sem. Maecenas pellentesque lectus a iaculis euismod. Sed a scelerisque lorem, id placerat purus. Etiam quis nunc dui. Nam pulvinar luctus facilisis. Duis at pharetra nibh. Nullam nec mi eget justo gravida faucibus. Phasellus sit amet ullamcorper nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ],
  nl: [
    {
      name: 'Jan Brouwer',
      role: 'Mede-eigenaar',
      email: 'jbrouwer@on-track.nl',
      img: janImg,
      story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida urna libero, vitae interdum ipsum tristique vel. Cras nec sem in diam faucibus dapibus. Sed dolor velit, ultricies vitae nisl quis, rhoncus aliquet urna. Curabitur ultricies sapien turpis, quis tempus nunc congue at. Vestibulum ornare erat vel pharetra malesuada. Sed quis vulputate orci, quis pretium nunc. Nulla ullamcorper nibh at risus tempor feugiat. Nunc tortor enim, lacinia at ultrices vehicula, euismod quis elit. Proin consequat lorem eu ex tincidunt, in suscipit dolor semper.   ',
    },
    {
      name: 'Stijn van Schaijk',
      role: 'Mede-eigenaar',
      email: 'svschaijk@on-track.nl',
      img: stijnImg,
      story: 'Etiam congue nulla sed ante pulvinar dictum. Nulla nec facilisis erat, non efficitur ex. Praesent ac odio non libero suscipit eleifend. Nunc facilisis aliquet erat vel facilisis. Maecenas at tortor in turpis finibus aliquet. Duis lacinia mi non lorem facilisis, et faucibus dui pulvinar. In fringilla malesuada ultricies. Duis diam sapien, porta sed diam id, laoreet sagittis lacus. Phasellus fringilla condimentum lorem, nec luctus eros interdum eget. Curabitur eros diam, gravida vitae volutpat non, feugiat varius nulla. Sed laoreet luctus sagittis. Donec vehicula condimentum nulla vel placerat. Aliquam lobortis eget sapien sit amet lacinia. Aliquam commodo, dolor eget placerat porta, ante tellus dapibus velit, et dictum tellus diam ut arcu. Maecenas eget suscipit orci.',
    },
    {
      name: 'Rien van der Scheur',
      role: 'Mede-eigenaar',
      email: 'rvdscheur@on-track.nl',
      img: rienhImg,
      story: 'Nunc sit amet ornare lectus. Donec non velit ut ex tristique ornare. Nulla at magna enim. Integer quis dui eget metus egestas lacinia sed vel arcu. Sed ultrices, eros in finibus tempus, orci lorem scelerisque est, nec efficitur ligula elit sit amet sem. Maecenas pellentesque lectus a iaculis euismod. Sed a scelerisque lorem, id placerat purus. Etiam quis nunc dui. Nam pulvinar luctus facilisis. Duis at pharetra nibh. Nullam nec mi eget justo gravida faucibus. Phasellus sit amet ullamcorper nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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