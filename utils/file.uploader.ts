import { Locator, Page } from '@playwright/test';

export async function uploadFile(
  page: Page,
  inputLocator: Locator,
  buttonLocator: Locator,
  filePath: string | string[],
) {
  if (await inputLocator.count()) {
    await inputLocator.setInputFiles(filePath);
  } else {
    const [fileChooser] = await Promise.all([page.waitForEvent('filechooser'), buttonLocator.click()]);
    await fileChooser.setFiles(filePath);
  }
  // temporary solution to avoid test failures due to file upload delay
  // should be replaced with proper wait for element that appears after file upload
  // await page.waitForTimeout(2000);
}
