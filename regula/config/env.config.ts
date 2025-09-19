import config from 'regula/playwright.config';

export const baseUrl = process.env.BASE_URL || config.use.baseURL;

export const urlConfig = {
  ui: {
    homePage: baseUrl,
  },
  api: {},
};
