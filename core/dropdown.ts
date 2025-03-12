import { Locator } from '@playwright/test';
import { Element } from './element';

export class Dropdown extends Element {
    /*
    If the Dropdown has the same locator everywhere, we can use this constructor:
    constructor(elementName?: string) {
        super(page.locator('common Dropdown locator'), elementName);
    }
    */

    constructor(locator: Locator, elementName?: string) {
        super(locator, elementName);
    }

    async selectOption(option: string): Promise<void> {
        await this.click();
        await this.locator.locator(`//li[text()="${option}"]`).click();
    }

    async getSelectedOption(): Promise<string> {
        return await this.getText();
    }

    async getOptions(): Promise<string[]> {
        await this.click();
        const options = await this.locator.locator('ul').locator('li').innerText();
        return options.split('\n');
    }
}