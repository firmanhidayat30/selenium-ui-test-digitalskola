const { By, until } = require("selenium-webdriver");

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.cartBadge = By.className("shopping_cart_badge");
        this.checkoutButton = By.id("checkout");
    }

    async getCartItemCount() {
        try {
            const badge = await this.driver.wait(until.elementLocated(this.cartBadge), 5000);
            return await badge.getText();
        } catch (error) {
            return "0";
        }
    }

    async proceedToCheckout() {
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.checkoutButton)), 5000);
        await this.driver.findElement(this.checkoutButton).click();
    }
}

module.exports = CartPage;