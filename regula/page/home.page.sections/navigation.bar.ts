import { Page, Locator } from 'playwright/test';
import { BasePage } from '../base.page';

export class NavigationBar extends BasePage {
  private navigationBar: Locator = this.page.locator('//*[@data-test="navigation"]');
  private faceSDKDropDown: Locator = this.navigationBar.locator('//*[text()="Face SDK"]');
  private developerHubBtn: Locator = this.page.locator('[data-test*="developer-hub"]');
  private helpCenterBtn: Locator = this.page.locator('[data-test*="help-center"]');
  private blogBtn: Locator = this.page.locator('[data-test*="blog"]');

  constructor(page: Page) {
    super(page);
  }

  async openBlog() {
    const [blogPage] = await Promise.all([this.page.context().waitForEvent('page'), this.blogBtn.click()]);
    await blogPage.waitForLoadState();
    return blogPage;
  }

  async openHelpCenter() {
    const [helpCenterPage] = await Promise.all([this.page.context().waitForEvent('page'), this.helpCenterBtn.click()]);
    await helpCenterPage.waitForLoadState();
    return helpCenterPage;
  }

  async openDeveloperHub(): Promise<Page> {
    const [developerHubPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.developerHubBtn.click(),
    ]);
    await developerHubPage.waitForLoadState();
    return developerHubPage;
  }

  async selectFaceSDKDOption(faceSDKDropDownOption: 'AboutFaceSDK' | 'ReleaseNotes'): Promise<Page> {
    await this.faceSDKDropDown.click();
    switch (faceSDKDropDownOption) {
      case 'AboutFaceSDK':
        const [aboutFaceSDKPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          this.page.locator(FaceSDKDropDownOptions.AboutFaceSDK).click(),
        ]);
        await aboutFaceSDKPage.waitForLoadState();
        return aboutFaceSDKPage;
      case 'ReleaseNotes':
        const [releaseNotesPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          this.page.locator(FaceSDKDropDownOptions.ReleaseNotes).click(),
        ]);
        await releaseNotesPage.waitForLoadState();
        return releaseNotesPage;
    }
  }
}

enum FaceSDKDropDownOptions {
  AboutFaceSDK = '[data-test*="about-face-sdk"]',
  ReleaseNotes = '[data-test*="release-notes"]',
}
