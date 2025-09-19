import { Page, Locator } from 'playwright/test';
import { BasePage } from '../../base.page';

export class LivenessDetection extends BasePage {
  private buttonActive: Locator = this.page.getByRole('button', { name: 'Active' });
  private buttonPassive: Locator = this.page.getByRole('button', { name: 'Passive' });
  private activeStatus: Locator = this.page.locator('[class*="Liveness_active"]');
  private livenessTryBtn: Locator = this.page.locator('[data-test="liveness-try-button"]');

  private modalGoBtn: Locator = this.page.locator('[data-e2e="get-ready"]');
  private modalCloseBtn: Locator = this.page.locator('[data-e2e="cross"]');
  private modalTitle: Locator = this.page.locator('[part*="screen-title"]');

  constructor(page: Page) {
    super(page);
  }

  get modalTitleTextElement() {
    return this.modalTitle;
  }

  get modalWindowGoButton() {
    return this.modalGoBtn;
  }

  async closeModalWindow() {
    if (await this.modalCloseBtn.isVisible()) {
      await this.modalCloseBtn.click();
    }
  }

  async clickLivenessTryBtn() {
    await this.livenessTryBtn.click();
  }

  async selectLivenessType(btn: 'Active' | 'Passive') {
    switch (btn) {
      case 'Active':
        await this.buttonActive.click();
        break;
      case 'Passive':
        await this.buttonPassive.click();
        break;
      default:
        throw new Error(`Liveness btn with name ${btn} does not exist.`);
    }
  }

  async checkIfBtnSelected(btn: 'Active' | 'Passive'): Promise<boolean> {
    return (await this.activeStatus.innerText()) === btn;
  }
}
