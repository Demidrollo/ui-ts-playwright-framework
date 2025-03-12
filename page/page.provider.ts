import { Browser, Page } from 'playwright/test';
import { HomePage } from './home.page';
import { LoginPage } from './login.page';

export class PageProvider {
    private browser: Browser;
    private page: Page;
    private pageObject = new Map<string, any>();

    constructor(browser: Browser, page: Page) {
        this.browser = browser;
        this.page = page;
        this.registerPageObject('HomePage', HomePage);
        this.registerPageObject('LoginPage', LoginPage);
    }

    registerPageObject(key: string, pageObjectClass: any): void {
        this.pageObject.set(key, pageObjectClass);
    }

    getPageObject<T>(key: string): T {
        const PageClass = this.pageObject.get(key);
        if (!PageClass) {
            throw new Error('Page object not found for key: ' + key);
        }
        return new PageClass(this.page) as T;
    }

    get homePage(): HomePage {
        return this.getPageObject<HomePage>('HomePage');
    }

    get loginPage(): LoginPage {
        return this.getPageObject<LoginPage>('LoginPage');
    }
}