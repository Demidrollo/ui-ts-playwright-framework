import { Page, Locator } from 'playwright/test';
import { BasePage } from '../../base.page';
import { uploadFile } from '../../../../utils/file.uploader';
import { FaceDetectionTab } from './face.detection.tab';

export class FaceMatchingTab extends BasePage {
  private machingTabResult: Locator = this.page.locator('[class*="Results_item"]');
  private privatePolicyModalConfirmBtn: Locator = this.page.locator('//button[text()="Confirm"]');
  private faceDetectionTab = new FaceDetectionTab(this.page);

  constructor(page: Page) {
    super(page);
  }

  get machingTabResultTextElement() {
    return this.machingTabResult;
  }

  async uploadPhoto(role: 'Reference' | 'Compare', filePath: string) {
    await this.confirmPrivatePolicy();
    await uploadFile(this.page, this.getFaceMatchingUploadInput(role), this.getFaceMatchingUploadBtn(role), filePath);
    await this.faceDetectionTab.refreshTabResults();
  }

  private async confirmPrivatePolicy() {
    await this.getFaceMatchingUploadBtn('Reference').click();
    if (await this.privatePolicyModalConfirmBtn.isVisible()) {
      await this.privatePolicyModalConfirmBtn.click();
    }
  }

  private getFaceMatchingUploadInput(role: 'Reference' | 'Compare'): Locator {
    return this.page.locator(`//*[text()="${role}"]//..//..//..//input[@type="file"]`);
  }

  private getFaceMatchingUploadBtn(role: 'Reference' | 'Compare'): Locator {
    return this.page.locator(`//*[text()="${role}"]//..//..//..//button[@data-test="button-upload-file"]`);
  }
}
