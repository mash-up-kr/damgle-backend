import { staticEnv } from '@damgle/utils';
import { ConfigModule } from '@nestjs/config';

// config is empty now
const config = async () => {
  return {
    cdnHost: staticEnv.cdn_host,
  };
};

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [config],
});
