const { By, until } = require("selenium-webdriver");

class InventoryPage {
    constructor(driver) {
        this.driver = driver;
        this.inventoryContainer = By.id("inventory_container"); 
        this.firstItemContainer = By.className("inventory_item"); 
        this.addToCartButton = By.xpath("(//button[contains(text(),'Add to cart')])[1]"); 
        this.cartIcon = By.className("shopping_cart_link"); 
    }

    async waitForPageToLoad() {
        await this.driver.wait(until.elementLocated(this.inventoryContainer), 5000);
    }

    async addItemToCart() {
        await this.waitForPageToLoad();
        const addButton = await this.driver.findElement(this.addToCartButton);
        await this.driver.wait(until.elementIsVisible(addButton), 3000);
        await addButton.click();
    }

    async goToCart() {
        const cartIcon = await this.driver.findElement(this.cartIcon);
        await this.driver.wait(until.elementIsVisible(cartIcon), 3000);
        await cartIcon.click();
    }
}

module.exports = InventoryPage;
