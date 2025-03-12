import { Element } from './element';
import { Locator } from '@playwright/test';

export class Modal extends Element {
  private closeButton: Element = new Element(this.locator.locator('button[aria-label="Close"]'), 'Close button');
  private confirmButton: Element = new Element(this.locator.locator('button[data-testid="confirm"]'), 'Confirm button');
  private cancelButton: Element = new Element(this.locator.locator('button[data-testid="cancel"]'), 'Cancel button');
  private modalHeader: Element = new Element(this.locator.locator('h2'), 'Modal header');
  private modalContent: Element = new Element(this.locator.locator('div[role="dialog"]'), 'Modal content');

  /*
       If the Modal has the same locator everywhere, we can use this constructor:
       constructor(elementName?: string) {
        super(page.locator('common Modal locator'), elementName);
       }
    */

  constructor(locator: Locator, elementName?: string) {
    super(locator, elementName);
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async confirm(): Promise<void> {
    await this.confirmButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getModalHeader(): Promise<string> {
    return await this.modalHeader.getText();
  }

  async getModalContent(): Promise<string> {
    return await this.modalContent.getText();
  }
}
