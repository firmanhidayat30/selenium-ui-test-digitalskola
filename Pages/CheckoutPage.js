const { By, until } = require("selenium-webdriver");

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.firstNameField = By.id("first-name");
        this.lastNameField = By.id("last-name");
        this.postalCodeField = By.id("postal-code");
        this.continueButton = By.id("continue");
        this.finishButton = By.id("finish");
        this.checkoutComplete = By.className("complete-header");
    }

    async fillCheckoutDetails(firstName, lastName, postalCode) {
        await this.driver.wait(until.elementLocated(this.firstNameField), 5000);
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.postalCodeField).sendKeys(postalCode);
        await this.driver.findElement(this.continueButton).click();
    }

    async completeCheckout() {
        await this.driver.wait(until.elementLocated(this.finishButton), 5000);
        await this.driver.findElement(this.finishButton).click();
    }

    async isCheckoutSuccessful() {
        return await this.driver.wait(until.elementLocated(this.checkoutComplete), 5000);
    }
}

module.exports = CheckoutPage;