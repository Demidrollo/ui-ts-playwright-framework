import { HomePage } from 'page/dunnhumby/home.page';
import { test, expect } from 'fixtures/baseDunnhumbyTest';
import { urlConfig } from 'config/dunnhumby/env.config';

let homePage: HomePage;

test.describe('example', () => {
  test.beforeEach(async ({ pageProvider }) => {
    homePage = pageProvider.homePage;
  });

  test('example', async () => {
    {
      await homePage.goToPage();
      expect(await homePage.url).toEqual(urlConfig.ui.homePage);
    }
  });
});
