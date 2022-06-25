import { ensuredEnv } from '@damgle/utils';
import { ConfigModule } from '@nestjs/config';

export interface Environment {
  'google.apiKey': string;
}

const config = () => {
  return ensuredEnv({
    'google.apiKey': 'GCP_API_KEY',
  });
};

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [config],
});
