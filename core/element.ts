import { Locator, Page } from 'playwright/test';

export class Element {
  private _locator: Locator;
  private _elementName: string;

  constructor(locator: Locator, elementName?: string) {
    this._locator = locator;
    this._elementName = elementName;
  }

  get elementName() {
    return this._elementName;
  }

  get locator() {
    return this._locator;
  }

  get page() {
    return this.locator.page;
  }

  getChildBytext(text: string, elementName?: string): Element {
    return new Element(this.locator.locator(`//*[normalize-space(text())='${text}']`), elementName);
  }

  getChildByRole(role: string, elementName?: string): Element {
    return new Element(this.locator.locator(`//*[@role='${role}']`), elementName);
  }

  getParentByText(text: string, elementName?: string): Element {
    return new Element(this.locator.locator(`ancestor::*[normalize-space(text())='${text}']`), elementName);
  }

  getParentByRole(role: string, elementName?: string): Element {
    return new Element(this.locator.locator(`ancestor::*[@role='${role}']`), elementName);
  }

  getSiblingByText(text: string, elementName?: string): Element {
    return new Element(this.locator.locator(`following-sibling::*[normalize-space(text())='${text}']`), elementName);
  }

  getSiblingByRole(role: string, elementName?: string): Element {
    return new Element(this.locator.locator(`following-sibling::*[@role='${role}']`), elementName);
  }

  async getElements(): Promise<Locator[]> {
    await this.locator.first().waitFor({ state: 'visible' });
    return await this.locator.all();
  }

  async getElementText() {
    const locators: Locator[] = await this.getElements();
    await this.locator.waitFor({ state: 'visible' });
    let elementTexts: string[];
    for (const locator of locators) {
      elementTexts.push(await locator.textContent());
    }
  }

  async fillText(text: string): Promise<void> {
    await this.locator.fill(text);
  }

  async typeText(
    text: string,
    options?: {
      delay?: number;
      noWaitAfter?: boolean;
      timeout?: number;
    },
  ): Promise<void> {
    await this.locator.pressSequentially(text, options);
  }

  async clear(): Promise<void> {
    await this.locator.clear();
  }

  async getText(): Promise<string> {
    return await this.locator.innerText();
  }

  async getValue(): Promise<string> {
    return await this.locator.inputValue();
  }

  async getAttributeText(attribute: string): Promise<string> {
    return await this.locator.getAttribute(attribute);
  }

  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  async isHidden(): Promise<boolean> {
    return await this.locator.isHidden();
  }

  async isDisabled(): Promise<boolean> {
    return await this.locator.isDisabled();
  }

  async isEditable(): Promise<boolean> {
    return await this.locator.isEditable();
  }

  async click(): Promise<void> {
    await this.locator.click();
  }

  async hover(): Promise<void> {
    await this.locator.hover();
  }

  async focus(): Promise<void> {
    await this.locator.focus();
  }

  async waitFor(options?: { state?: 'visible' | 'hidden' | 'attached' | 'detached'; timeout?: number }): Promise<void> {
    await this.locator.waitFor(options);
  }

  async dragElement(page: Page, dX: number, dY: number): Promise<void> {
    const boundingBox = await this.locator.boundingBox();
    await page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
    await page.mouse.down({ button: 'left' });
    await page.mouse.move(boundingBox.x + boundingBox.width / 2 + dX, boundingBox.y + boundingBox.height / 2 + dY);
    await page.mouse.up({ button: 'left' });
  }
}
