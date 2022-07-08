import { ConfigModule } from '@nestjs/config';
import { ensuredEnv, ENV_KEY } from '@damgle/utils';

// config is empty now
const config = async () => {
  return ensuredEnv({
    cdnHost: ENV_KEY.cdn_host,
  });
};

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [config],
});
