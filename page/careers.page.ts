import { Page, Locator } from 'playwright/test';
import { BasePage } from './base.page';
import { urlConfig } from '../config/env.config';

export class CareersPage extends BasePage {
  private _socialAppsLogos: Locator = this.page.locator('[class*="black-social list"]');
  private _linkedinLogo: Locator = this.page.locator('[src*="linkedin.svg"]');
  private _facebookLogo: Locator = this.page.locator('[src*="fb-dark.svg"]');
  private _xLogo: Locator = this.page.locator('[src*="x-dark.svg"]');
  private _youtubeLogo = this.page.locator('[src*="youtube.svg"]');
  private searchApplyJobsBtn = this.page.locator('[class="btn-trs"]'); //or [href="#job-board"]

  constructor(page: Page) {
    super(page, urlConfig.ui.careers);
  }

  get socialAppsLogos() {
    return this._socialAppsLogos;
  }

  get linkedinLogo() {
    return this._linkedinLogo;
  }

  get facebookLogo() {
    return this._facebookLogo;
  }

  get xLogo() {
    return this._xLogo;
  }

  get youtubeLogo() {
    return this._youtubeLogo;
  }

  async clickSearchApplyBtn() {
    await this.searchApplyJobsBtn.click();
  }
}
