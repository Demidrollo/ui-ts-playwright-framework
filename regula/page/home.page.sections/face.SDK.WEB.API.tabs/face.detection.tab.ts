import { Page, Locator } from 'playwright/test';
import { BasePage } from '../../base.page';
import { uploadFile } from 'utils/file.uploader';

export class FaceDetectionTab extends BasePage {
  private previewDataText: Locator = this.page.locator('[class*="preview-data"]');
  private uploadInput: Locator = this.page.locator('//input[@type="file"]');
  private uploadBtn: Locator = this.page.locator('//button[@data-test="button-upload-file"]');
  private privatePolicyModalConfirmBtn: Locator = this.page.locator('//button[text()="Confirm"]');
  private retryBtn: Locator = this.page.locator('//*[text()="Retry"]/..');

  constructor(page: Page) {
    super(page);
  }

  async uploadPhoto(filePath: string) {
    await this.confirmPrivatePolicy();
    await uploadFile(this.page, this.uploadInput, this.uploadBtn, filePath);
    await this.refreshTabResults();
  }

  async refreshTabResults() {
    await this.retryBtn.click();
  }

  get previewData() {
    return this.previewDataText;
  }

  private async confirmPrivatePolicy() {
    await this.uploadBtn.click();
    if (await this.privatePolicyModalConfirmBtn.isVisible()) {
      await this.privatePolicyModalConfirmBtn.click();
    }
  }
}
