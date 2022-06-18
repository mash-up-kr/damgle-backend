import { bootstrap } from './bootstrap';

bootstrap().then(({ app }) => {
  app.listen(3000);
});
