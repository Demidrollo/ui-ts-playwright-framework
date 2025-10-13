import { test } from 'dunnhumby/fixtures/dunnhumby.fixture';
import { expect } from '@playwright/test';
import { dunnhumbyTestData } from 'dunnhumby/test-data/dunnhumby.test.data';

test('Dunnhumby original test', async ({ pageProvider }) => {
  const homePage = pageProvider.homePage;

  await homePage.goToPage();
  await homePage.clickCareerBtn();

  const careersPage = pageProvider.careersPage;

  await expect(careersPage.page).toHaveURL(careersPage.url);

  await expect.soft(careersPage.socialAppsLogos).toBeVisible();
  await expect.soft(careersPage.linkedinLogo).toBeVisible();

  await expect.soft(careersPage.facebookLogo).toBeVisible();
  await expect.soft(careersPage.xLogo).toBeVisible();
  await expect.soft(careersPage.youtubeLogo).toBeVisible();

  await careersPage.clickSearchApplyBtn();

  const jobBoard = pageProvider.jobBoard;

  await expect(jobBoard.page).toHaveURL(jobBoard.url);
  await expect(jobBoard.headerOpenPositions).toContainText(dunnhumbyTestData.headerOpenPositionsText);

  await jobBoard.selectLocation(dunnhumbyTestData.locations);

  expect(await jobBoard.isOnlyMatchingLocationVisible(dunnhumbyTestData.locations)).toBeTruthy();

  expect(test.info().errors).toHaveLength(0);
});
