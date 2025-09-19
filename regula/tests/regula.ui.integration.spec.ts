import { test } from 'regula/fixtures/regula.fixture';
import { expect } from '@playwright/test';
import { navigationBarTestData } from 'regula/test-data/test.data';

test('Check how Regula navigation bar component works in integration', async ({ pageProvider }) => {
  const testData = navigationBarTestData;
  const homePage = pageProvider.homePage;
  const navigationBar = homePage.navigationBar;

  await homePage.goToPage();

  await test.step('Open "About Face SDK" from "Face SDK"', async () => {
    const aboutFaceSDKPage = await navigationBar.selectFaceSDKDOption('AboutFaceSDK');
    await expect.soft(aboutFaceSDKPage).toHaveURL(testData.aboutFaceSDKPageURL);
    await aboutFaceSDKPage.close();
  });

  await test.step('Open "Release Notes" from "Face SDK"', async () => {
    const releaseNotesPage = await navigationBar.selectFaceSDKDOption('ReleaseNotes');
    await expect.soft(releaseNotesPage).toHaveURL(testData.releaseNotesPageURL);
    await releaseNotesPage.close();
  });

  await test.step('Open "Developer Hub"', async () => {
    const developerHubPage = await navigationBar.openDeveloperHub();
    await expect.soft(developerHubPage).toHaveTitle(testData.developerHubPageTitle);
    await developerHubPage.close();
  });

  await test.step('Open "Help Center', async () => {
    const helpCenterPage = await navigationBar.openHelpCenter();
    await expect.soft(helpCenterPage).toHaveURL(testData.helpCenterPageURL);
    await expect.soft(helpCenterPage).toHaveTitle(testData.helpCenterPageTitle);
    await helpCenterPage.close();
  });

  await test.step('Open blog page', async () => {
    const blogPage = await navigationBar.openBlog();
    await expect.soft(blogPage).toHaveURL(testData.blogPageURL);
    await expect.soft(blogPage).toHaveTitle(testData.blogPageTitle);
    await blogPage.close();
  });

  expect(test.info().errors.length).toBe(0);
});
