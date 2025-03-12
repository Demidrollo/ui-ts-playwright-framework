import { Page } from 'playwright/test';

export abstract class BasePage {
    private _page: Page;
    private _url: string;

    constructor(page: Page, url: string) {
        this._page = page;
        this._url = url;
    }

    async goToPage(): Promise<void> {
        await this.page.goto(this.url);
    }

    get page() {
        return this._page;
    }

    get url() {
        return this._url;
    }
}