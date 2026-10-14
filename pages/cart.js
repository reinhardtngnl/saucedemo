export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  getItemByName(name) {
    return this.cartItems.filter({
      has: this.page.getByText(name, { exact: true }),
    });
  }

  getItemTitle(name) {
    return this.getItemByName(name).locator('[data-test$="-title-link"]');
  }

  getItemPrice(name) {
    return this.getItemByName(name).locator('[data-test="inventory-item-price"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
