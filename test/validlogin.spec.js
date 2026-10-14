import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.js';
import { LoginPage } from '../pages/login.js';

const { BASEURL, BASEUSERNAME, BASEPASSWORD } = process.env;

if (!BASEURL || !BASEUSERNAME || !BASEPASSWORD) {
  throw new Error('BASEURL, BASEUSERNAME, and BASEPASSWORD must be set in the environment or .env file.');
}

test('user can log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto(BASEURL);
  await loginPage.login(BASEUSERNAME, BASEPASSWORD);

  await expect(page).toHaveURL(/\/inventory(?:\.html)?\/?$/);
  await expect(inventoryPage.inventoryContainer).toBeVisible();
});
