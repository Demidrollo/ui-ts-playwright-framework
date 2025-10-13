import { Page, Locator } from 'playwright/test';
import { BasePage } from './base.page';
import { urlConfig } from '../config/env.config';
import { NavigationBar, FaceSDKWebAPISection } from './home.page.sections';

export class HomePage extends BasePage {
  private header: Locator = this.page.locator('[data-test*="header"]');

  constructor(page: Page) {
    super(page, urlConfig.ui.homePage);
  }

  get navigationBar() {
    return new NavigationBar(this.page);
  }

  get regulaFaceSDKWebAPISection() {
    return new FaceSDKWebAPISection(this.page);
  }
}
