import { test as base, expect as expectBase } from 'playwright/test';
import { PageProvider } from '../page/dunnhumby/page.provider';
import * as fs from 'fs';
import * as path from 'path';
import { BasePage } from 'page/dunnhumby/base.page';
import { Element } from 'core/dunnhumby/element';
import {testResults} from 'playwright.config.dunnhumby';

export const test = base.extend<
  {
    pageProvider: PageProvider;
  },
  {
    workerStorageState: string;
  }
>({
  pageProvider: async ({ browser, page }, use) => {
    await use(new PageProvider(browser, page));
  },

  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [
    async ({ browser }, use) => {
      const parallelIndex = base.info().parallelIndex;
      const authFile = path.resolve(testResults, `.auth/${parallelIndex}.json`);
      if (fs.existsSync(authFile)) {
        await use(authFile);
        return;
      } else {
        const context = await browser.newContext({ storageState: undefined });
        const page = await context.newPage();
        try {
          const pageProvider = new PageProvider(browser, page);

          await page.context().tracing.start({ screenshots: true, snapshots: true });
          const signInPage = pageProvider.loginPage;
          await signInPage.goToPage();
          await signInPage.login(process.env['USERNAME'], process.env['USER_PASSWORD']);
          await page.context().storageState({ path: authFile });
          await page.context().tracing.stop({ path: `.${testResults}/trace.zip` });
          await context.close();
        } catch (error) {
          await page.context().tracing.stop({ path: `./${testResults}/fialed-setup-trace.zip` });
          await context.close();
          throw error;
        }
        await use(authFile);
      }
    },
    { scope: 'worker' },
  ],
});

const expect = (value: Element | any | BasePage, message?: string | { message?: string }) => {
  if (value instanceof Element) {
    return expectBase<any>(value.locator, message);
  } else if (value instanceof BasePage) {
    return expectBase<any>(value.page, message);
  }
  return expectBase(value, message);
};
expect.soft = expectBase.soft;
expect.poll = expectBase.poll;
expect.extend = expectBase.extend;
expect.any = expectBase.any;
expect.anything = expectBase.anything;
expect.objectContaining = expectBase.objectContaining;
expect.arrayContaining = expectBase.arrayContaining;
expect.stringContaining = expectBase.stringContaining;
expect.stringMatching = expectBase.stringMatching;

export { expect };
