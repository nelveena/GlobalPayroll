import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',

  use: {
    baseURL:
      'https://signon-acc1.globepayroll.net/auth/realms/globalsolutions-reference/protocol/openid-connect/auth?client_id=GPFRONT&redirect_uri=https%3A%2F%2Fglobalsolutions-reference.gpi-test.globepayroll.net%2Fui%2F%23%2Finbox%2Frequests&state=496d9646-9cce-42f7-8196-e95b5f16b18a&response_mode=fragment&response_type=code&scope=openid&nonce=a3321d91-afc6-45e2-897f-12a0810a5911',
    headless: false,
    launchOptions: { slowMo: 1000 },
    trace: 'on-first-retry',
    browserName: 'chromium',
    screenshot: 'only-on-failure'



  },

  webServer: {
    command: 'npm start',
    url: 'https://signon-acc1.globepayroll.net/auth/realms/globalsolutions-reference/protocol/openid-connect/auth?client_id=GPFRONT&redirect_uri=https%3A%2F%2Fglobalsolutions-reference.gpi-test.globepayroll.net%2Fui%2F%23%2Finbox%2Frequests&state=496d9646-9cce-42f7-8196-e95b5f16b18a&response_mode=fragment&response_type=code&scope=openid&nonce=a3321d91-afc6-45e2-897f-12a0810a5911',
    reuseExistingServer: true,
  }
});
