import { Element } from './element';
import { Page } from '@playwright/test';

export class Scroll extends Element {
  async scrollTo(page: Page, dX: number, dY: number): Promise<void> {
    await page.evaluate(
      ({ dX, dY }) => {
        window.scrollBy(dX, dY);
      },
      { dX, dY },
    );
  }

  async scrollUsingMouse(page: Page, dX: number, dY: number): Promise<void> {
    await this.locator.hover();
    await page.mouse.wheel(dX, dY);
  }

  async scrollToEnd(page: Page): Promise<void> {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async scrollToTop(page: Page): Promise<void> {
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }

  async scrollToLeft(page: Page): Promise<void> {
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }

  async scrollToRight(page: Page): Promise<void> {
    await page.evaluate(() => {
      window.scrollTo(document.body.scrollWidth, 0);
    });
  }

  async scrollIntoView(page: Page): Promise<void> {
    await page.evaluate(() => {
      document.documentElement.scrollIntoView();
    });
  }
}
