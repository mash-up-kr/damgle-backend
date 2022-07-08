import { ConfigModule } from '@nestjs/config';

// config is empty now
const config = async () => {
  return {};
};

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [config],
});
