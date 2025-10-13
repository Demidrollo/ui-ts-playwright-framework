import { Page, Locator } from 'playwright/test';
import { BasePage } from './base.page';
import { urlConfig } from '../config/env.config';

export class HomePage extends BasePage {
  private navigationBar: Locator = this.page.locator('[class*="users"]');
  private careersBtn: Locator = this.navigationBar.locator('//*[text()="Careers"]');

  constructor(page: Page) {
    super(page, urlConfig.ui.homePage);
  }

  async clickCareerBtn() {
    await this.careersBtn.click();
  }
}
