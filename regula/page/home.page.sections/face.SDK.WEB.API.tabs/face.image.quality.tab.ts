import { Page, Locator } from 'playwright/test';
import { BasePage } from '../../base.page';
import { uploadFile } from '../../../../utils/file.uploader';
import { FaceDetectionTab } from './face.detection.tab';

export class FaceImageQualityTab extends BasePage {
  private resultStatusText: Locator = this.page.locator('[class*="status-text"]');
  private numberOfFailedParametersText: Locator = this.page.locator('div[class*="checks"]');
  private uploadInput: Locator = this.page.locator('//input[@type="file"]');
  private uploadBtn: Locator = this.page.locator('//button[@data-test="button-upload-file"]');
  private privatePolicyModalConfirmBtn: Locator = this.page.locator('//button[text()="Confirm"]');
  private faceDetectionTab = new FaceDetectionTab(this.page);

  constructor(page: Page) {
    super(page);
  }

  get resultStatus(): Locator {
    return this.resultStatusText;
  }

  get numberOfFailedParameters(): Locator {
    return this.numberOfFailedParametersText;
  }

  async uploadPhoto(filePath: string) {
    await this.confirmPrivatePolicy();
    await uploadFile(this.page, this.uploadInput, this.uploadBtn, filePath);
    await this.faceDetectionTab.refreshTabResults();
  }

  private async confirmPrivatePolicy() {
    await this.uploadBtn.click();
    if (await this.privatePolicyModalConfirmBtn.isVisible()) {
      await this.privatePolicyModalConfirmBtn.click();
    }
  }
}
