import https from 'https';
import fs from 'fs';

const file = fs.createWriteStream("cloudflared.exe");
https.get("https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe", response => {
  if (response.statusCode === 302) {
    https.get(response.headers.location, r => r.pipe(file).on('finish', () => console.log('Downloaded!')));
  } else {
    response.pipe(file).on('finish', () => console.log('Downloaded!'));
  }
});
