import { Locator } from '@playwright/test';
import { Element } from './element';

export class Loader extends Element {
  /*
    If the Loader has the same locator everywhere, we can use this constructor:
    constructor(elementName?: string) {
        super(page.locator('common Loader locator'), elementName);
    }
    */

  constructor(locator: Locator, elementName?: string) {
    super(locator, elementName);
  }

  async waitForLoaderToDisappear(): Promise<void> {
    if (await this.isVisible()) {
      await this.waitFor({ state: 'hidden' });
    }
  }
}
