import config from 'dunnhumby/playwright.config'

export const baseUrl = process.env.BASE_URL || config.use.baseURL;

export const urlConfig = {
  ui: {
    homePage: baseUrl,
    careers: baseUrl + 'careers/',
    jobBoard: baseUrl + 'careers/#job-board',
  },
  api: {},
};
