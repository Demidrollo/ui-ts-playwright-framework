import { Browser, Page } from 'playwright/test';
import { HomePage, CareersPage, JobBoard } from './index';

export class PageProvider {
  private browser: Browser;
  private page: Page;
  private pageObject = new Map<string, any>();

  constructor(browser: Browser, page: Page) {
    this.page = page;
    this.registerPageObject('HomePage', HomePage);
    this.registerPageObject('CareersPage', CareersPage);
    this.registerPageObject('JobBoard', JobBoard);
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

  get careersPage(): CareersPage {
    return this.getPageObject<CareersPage>('CareersPage');
  }

  get jobBoard(): JobBoard {
    return this.getPageObject<JobBoard>('JobBoard');
  }
}
