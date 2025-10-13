import { Page, Locator } from 'playwright/test';
import { BasePage } from './base.page';
import { urlConfig } from '../config/env.config';

export class JobBoard extends BasePage {
  private _headerOpenPositions: Locator = this.page.locator('h3[class*="tac"]');
  private _hiddenJobItems: Locator = this.page.locator(
    '//*[contains(@class, "job-pos") and contains(@style, "display: none")]',
  );
  private _jobItems: Locator = this.page.locator('[class*="job-pos-list-item"]');
  private locationSelector = '[name="locations"]';

  constructor(page: Page) {
    super(page, urlConfig.ui.jobBoard);
  }

  get headerOpenPositions() {
    return this._headerOpenPositions;
  }

  get hiddenJobItems() {
    return this._hiddenJobItems;
  }

  get jobItems() {
    return this._jobItems;
  }

  async isOnlyMatchingLocationVisible(location: string): Promise<boolean> {
    const jobItems = await this.jobItems.all();

    for (const item of jobItems) {
      if (await item.isVisible()) {
        const text = await item.innerText();
        if (!text.includes(location)) {
          return false;
        }
      }
    }
    return true;
  }

  async selectLocation(location: string) {
    await this.page.selectOption(this.locationSelector, location.toLocaleLowerCase());
    await this.waitListUpdate();
  }

  private async waitListUpdate() {
    const maxAttempts = 10;
    let attempt = 0;
    const initialCount = await this.hiddenJobItems.count();

    while (attempt < maxAttempts) {
      if (initialCount !== (await this.hiddenJobItems.count())) {
        return true;
      }
      await this.page.waitForTimeout(300);
      attempt++;
    }
    if (attempt === maxAttempts) {
      console.warn(`List did not update after ${maxAttempts} attempts.`);
    }
  }
}
