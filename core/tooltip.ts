import { Element } from './element';
import { Locator } from '@playwright/test';

export class Tooltip extends Element {
  /*
       If the Tooltip has the same locator everywhere, we can use this constructor:
       constructor(elementName?: string) {
        super(page.locator('common Tooltip locator'), elementName);
       }
    */

  constructor(locator: Locator, elementName?: string) {
    super(locator, elementName);
  }

  async getTooltipText(): Promise<string> {
    await this.locator.hover();
    await this.locator.waitFor({ state: 'visible' });
    return await this.locator.textContent();
  }

  async isTooltipVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  async waitForTooltipToDisappear(): Promise<void> {
    await this.locator.waitFor({ state: 'hidden' });
  }

  async waitForTooltipToAppear(): Promise<void> {
    await this.locator.waitFor({ state: 'visible' });
  }
}
