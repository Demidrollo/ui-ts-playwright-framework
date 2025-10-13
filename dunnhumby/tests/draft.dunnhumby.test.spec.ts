import { test } from 'dunnhumby/fixtures/dunnhumby.fixture';
import { expect, Locator } from '@playwright/test';

test.fixme('Dunnhumby draft test', async ({ page }) => {
  await page.goto('https://www.dunnhumby.com/');
  await page.locator('//*[contains(@class,"users")]//*[text()="Careers"]').click(); //or another locator //*[contains(@id,"header")]//*[text()="Careers"]
  await expect(page).toHaveURL('https://www.dunnhumby.com/careers/');
  await expect(page.locator('[class*="black-social list"]')).toBeVisible();
  await expect(page.locator('[src*="linkedin.svg"]')).toBeVisible();
  await expect(page.locator('[src*="fb-dark.svg"]')).toBeVisible();
  await expect(page.locator('[src*="x-dark.svg"]')).toBeVisible();
  await expect(page.locator('[src*="youtube.svg"]')).toBeVisible();

  await page.locator('[class="btn-trs"]').click(); //another locator can be [href="#job-board"]
  await expect(page).toHaveURL('https://www.dunnhumby.com/careers/#job-board');
  await expect(page.locator('h3[class*="tac"]')).toContainText(/Viewing \d+ open positions in all locations/);

  const hiddenJobItemsLocator = page.locator('//*[contains(@class, "job-pos") and contains(@style, "display: none")]');
  const hiddenJobItemsCount = await hiddenJobItemsLocator.count();

  await page.selectOption('[name="locations"]', 'Bogota'.toLocaleLowerCase());
  while (hiddenJobItemsCount == (await hiddenJobItemsLocator.count())) {
    await page.waitForTimeout(500);
    await page.selectOption('[name="locations"]', 'Bogota'.toLocaleLowerCase());
  }

  const jobItems: Locator[] = await page.locator('[class*="job-pos-list-item"]').all();
  for (let i = 0; i < jobItems.length; i++) {
    if (await jobItems[i].isVisible()) {
      await expect(jobItems[i]).toContainText('Bogota');
    }
  }
});
