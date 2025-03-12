import { Page } from 'playwright/test';
import { BasePage } from './base.page';
import { Element } from '../core/element';
import { urlConfig } from '../config/env.config';

export class LoginPage extends BasePage {
  private usernameInput: Element;
  private passwordInput: Element;
  private loginButton: Element;

  constructor(page: Page) {
    super(page, urlConfig.ui.loginPage);
    this.usernameInput = new Element(this.page.locator('[id="username"]'), 'Username');
    this.passwordInput = new Element(this.page.locator('#password'), 'Password');
    this.loginButton = new Element(this.page.locator('[type="submit"]'), 'Login');
  }

  private async inputUsername(username: string): Promise<void> {
    await this.usernameInput.fillText(username);
  }

  private async inputPassword(password: string): Promise<void> {
    await this.passwordInput.fillText(password);
  }

  private async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLogin();
  }
}
