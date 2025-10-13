import { Page, Locator } from 'playwright/test';
import { BasePage } from '../base.page';
import { FaceDetectionTab, FaceImageQualityTab, FaceMatchingTab, LivenessDetection } from './face.SDK.WEB.API.tabs';

export class FaceSDKWebAPISection extends BasePage {
  private tabsBar: Locator = this.page.locator('[class*="nav-tabs"]');
  private livenessDetectionTab: Locator = this.tabsBar.getByText('Liveness detection');
  private faceDetectionTab: Locator = this.tabsBar.getByText('Face detection');
  private faceMatchingTab: Locator = this.tabsBar.getByText('Face matching');
  private faceImageQualityTab: Locator = this.tabsBar.getByText('Face image quality');

  constructor(page: Page) {
    super(page);
  }

  get livenessDetection() {
    return new LivenessDetection(this.page);
  }

  get faceDetection() {
    return new FaceDetectionTab(this.page);
  }

  get faceMatching() {
    return new FaceMatchingTab(this.page);
  }

  get faceImageQuality() {
    return new FaceImageQualityTab(this.page);
  }

  async selectTab(tabName: 'Liveness detection' | 'Face detection' | 'Face matching' | 'Face image quality') {
    switch (tabName) {
      case 'Liveness detection':
        await this.livenessDetectionTab.click();
        break;
      case 'Face detection':
        await this.faceDetectionTab.click();
        break;
      case 'Face matching':
        await this.faceMatchingTab.click();
        break;
      case 'Face image quality':
        await this.faceImageQualityTab.click();
        break;
      default:
        throw new Error(`Tab with name ${tabName} does not exist.`);
    }
  }
}
