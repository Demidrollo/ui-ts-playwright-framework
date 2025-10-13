import fs from 'fs';
import { playwrightReport, testResults } from 'regula/playwright.config';

export default async function globalSetup() {
  fs.rmSync(testResults, {
    recursive: true,
    force: true,
  });
  fs.rmSync(playwrightReport, {
    recursive: true,
    force: true,
  });
}
