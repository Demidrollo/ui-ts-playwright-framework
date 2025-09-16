import { Locator } from '@playwright/test';
import { Element } from './element';

export class RadioButton extends Element {
  /*
    If the RadioButton  has the same locator everywhere, we can use this constructor:
    constructor(elementName?: string) {
        super(page.locator('common RadioButton locator'), elementName);
    }
    */

  constructor(locator: Locator, elementName?: string) {
    super(locator, elementName);
  }

  async select(): Promise<void> {
    await this.click();
  }

  async isSelected(): Promise<boolean> {
    return await this.locator.isChecked();
  }
}
