import { test as base } from 'playwright/test';
import { PageProvider } from '../page/page.provider';
import { cookies } from 'utils/cookies';

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
  context: async ({ context }, use) => {
    await context.addCookies(cookies);
    await use(context);
  },
});
