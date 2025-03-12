// import { Page } from '@playwright/test';

export const baseUrl = process.env.BASE_URL;

export const urlConfig = {
  ui: {
    homePage: baseUrl,
    loginPage: baseUrl + '/login',
  },
  api: {},
};

// this method is used to set the build version (workflow number) in local storage

// export async function setBuildVersionInLocalStorage(page: Page) {
//     const buildNumber: string = process.env.BUILD_NUMBER ?? null;
//     if (buildNumber == 'current main' || buildNumber == null) { return }
//     else {
//         await page.evaluate((buildNumber: string) => {
//             localStorage.setItem(
//                 'manifest',
//                 JSON.stringify({
//                     manifestObjectkey: {
//                         remoteEntry: '/remotes/project/main.branch.${buildNumber}/remoteEntry.js,
//                         buildNumber: buildNumber,
//                     },
//                 }),
//             );
//         }, buildNumber);
//         await page.reload();
//     }
// }
