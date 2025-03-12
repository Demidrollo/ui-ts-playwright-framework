import { Locator } from '@playwright/test';
import { Element } from './element';

export class Checkbox extends Element {

    /*
    If the Checkbox  has the same locator everywhere, we can use this constructor:
    constructor(elementName?: string) {
        super(page.locator('common Checkbox locator'), elementName);
    }
    */

    constructor(locator: Locator, elementName?: string) {
        super(locator, elementName);
    }

    async check(): Promise<void> {
        await this.click();
    }

    async uncheck(): Promise<void> {
        await this.click();
    }

    async isChecked(): Promise<boolean> {
        return await this.locator.isChecked();
    }
}