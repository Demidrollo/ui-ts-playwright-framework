import { Page } from 'playwright/test';
import { BasePage } from './base.page';
import { urlConfig } from '../../config/dunnhumby/env.config';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, urlConfig.ui.homePage);
}
}