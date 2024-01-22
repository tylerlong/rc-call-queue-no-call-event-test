import RingCentral from '@rc-ex/core';
import WebSocketExtension from '@rc-ex/ws';
import waitFor from 'wait-for-async';

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID!,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET!,
  server: process.env.RINGCENTRAL_SERVER_URL!,
});

const main = async () => {
  await rc.authorize({
    jwt: process.env.RINGCENTRAL_JWT_TOKEN!,
  });
  const wsExt = new WebSocketExtension();
  await rc.installExtension(wsExt);
  wsExt.subscribe(['/restapi/v1.0/account/~/extension/62282928016/presence?detailedTelephonyState=true'], (event) => {
    console.log(JSON.stringify(event, null, 2));
  });
  await waitFor({ interval: 100000000 });
  await rc.revoke();
};
main();
