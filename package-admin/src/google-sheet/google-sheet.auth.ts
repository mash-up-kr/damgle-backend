import { google } from 'googleapis';
import Fastify from 'fastify';

interface GoogleOAuthParams {
  client: {
    id: string;
    secret: string;
    redirectUrl: string; // 테스트 계정으로 생성한 토큰 정보만 가지고 사용할 것이기 때문에 필요없음
  };
  user: {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: 'Bearer';
    expiry_date: number;
  };
}

export function createAuth(client: GoogleOAuthParams['client'], user: GoogleOAuthParams['user']) {
  const oAuth2Client = new google.auth.OAuth2(client.id, client.secret, client.redirectUrl);
  oAuth2Client.setCredentials(user);
  return oAuth2Client;
}

export async function createAuthFromTerminal(client: Pick<GoogleOAuthParams['client'], 'id' | 'secret'>) {
  const code = new Promise<string>(resolve => {
    const app = Fastify().get<{ Querystring: { code: string } }>('/', (req, reply) => {
      resolve(req.query['code']);
      reply.status(200).send(`<html><script>alert('done')</script></html>`);
      app.close();
    });
    app.listen({ port: 3000 });
  });

  const oAuth2Client = new google.auth.OAuth2(client.id, client.secret, 'http://localhost:3000');
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/drive',
  });

  console.log({ url });
  const { tokens } = await oAuth2Client.getToken(await code);
  console.log({ tokens });
  process.exit(0);
}

// createAuthFromTerminal(GoogleSheet.loadEnv());
