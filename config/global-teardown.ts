import fs from 'fs';
import { auth } from 'playwright.config';

export default async function globalSetup() {
    fs.rmSync(auth, {
        recursive: true,
        force: true
    });
}