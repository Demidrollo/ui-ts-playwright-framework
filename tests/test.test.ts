import { HomePage } from 'page/home.page';
import { test, expect } from 'fixtures/baseTest';
import { urlConfig } from 'config/env.config';

let homePage: HomePage;

test.describe('example', () => {
    test.beforeEach(async ({ pageProvider }) => {
        homePage = pageProvider.homePage;
    })

    test.only('example', async () => {
        {
            await homePage.goToPage();
            expect(await homePage.url).toEqual(urlConfig.ui.homePage);
        }
    })
});
