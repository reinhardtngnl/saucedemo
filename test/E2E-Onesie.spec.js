import { expect, test } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.js';
import { CartPage } from '../pages/cart.js';
import { InventoryPage } from '../pages/inventory.js';
import { LoginPage } from '../pages/login.js';

const { BASEURL, BASEUSERNAME, BASEPASSWORD, FIRSTNAME, LASTNAME, POSTALCODE } = process.env;

if (!BASEURL || !BASEUSERNAME || !BASEPASSWORD || !FIRSTNAME || !LASTNAME || !POSTALCODE) {
  throw new Error(
    'BASEURL, BASEUSERNAME, BASEPASSWORD, FIRSTNAME, LASTNAME, and POSTALCODE must be set in the environment or .env file.',
  );
}

const product = { name: 'Sauce Labs Onesie', price: '$7.99' };

test('user can purchase a Sauce Labs Onesie from login through order confirmation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto(BASEURL);
  await loginPage.login(BASEUSERNAME, BASEPASSWORD);
  await expect(page).toHaveURL(/\/inventory(?:\.html)?\/?$/);
  await expect(inventoryPage.inventoryContainer).toBeVisible();

  await inventoryPage.addToCart(product.name);
  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  await inventoryPage.openCart();

  await expect(page).toHaveURL(/\/cart\.html\/?$/);
  await expect(cartPage.cartItems).toHaveCount(1);
  await expect(cartPage.getItemTitle(product.name)).toHaveText(product.name);
  await expect(cartPage.getItemPrice(product.name)).toHaveText(product.price);

  await cartPage.checkout();
  await expect(page).toHaveURL(/\/checkout-step-one\.html\/?$/);

  await checkoutPage.fillInformation({
    firstName: FIRSTNAME,
    lastName: LASTNAME,
    postalCode: POSTALCODE,
  });
  await checkoutPage.continueToOverview();

  await expect(page).toHaveURL(/\/checkout-step-two\.html\/?$/);
  await expect(checkoutPage.checkoutItems).toHaveCount(1);
  await expect(checkoutPage.checkoutItems).toContainText(product.name);
  await expect(checkoutPage.checkoutItems.locator('[data-test="inventory-item-price"]')).toHaveText(product.price);

  await checkoutPage.finishOrder();

  await expect(page).toHaveURL(/\/checkout-complete\.html\/?$/);
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  await expect(checkoutPage.completeText).toBeVisible();
});