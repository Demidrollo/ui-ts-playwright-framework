import fs from 'fs';
import { auth } from 'regula/playwright.config';

export default async function globalSetup() {
  fs.rmSync(auth, {
    recursive: true,
    force: true,
  });
}
