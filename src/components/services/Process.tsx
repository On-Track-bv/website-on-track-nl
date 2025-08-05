import { Container, Title, Text } from '@mantine/core';
import classes from './Services.module.css';

export function Process() {
  return (
    <Container className={classes.wrapper} id="process">
      <Title className={classes.title}>Proces</Title>
      <Text className={classes.description}>
        Hier komt binnenkort een uitgebreide uitleg over het proces, inclusief animaties en visuals.
      </Text>
    </Container>
  );
}
