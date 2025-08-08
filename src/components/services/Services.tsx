
import { Container } from '@mantine/core';
import classes from './Services.module.css';



import { Process } from './Process';
import { Consultancy } from './Consultancy';
import { Software } from './Software';

export function Services() {
  return (
    <Container className={classes.wrapper} >
      <Process />
      <Consultancy />
      <Software />
    </Container>
  );
}