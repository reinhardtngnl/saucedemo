export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = this.inventoryContainer.locator('[data-test="inventory-item"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addToCart(productName) {
    const product = this.inventoryItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });

    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}