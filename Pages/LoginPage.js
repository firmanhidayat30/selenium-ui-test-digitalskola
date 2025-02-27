const { By, until } = require("selenium-webdriver");

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameField = By.id("user-name");
        this.passwordField = By.id("password");
        this.loginButton = By.id("login-button");
    }

    async enterUsername(username) {
        await this.driver.findElement(this.usernameField).sendKeys(username);
    }

    async enterPassword(password) {
        await this.driver.findElement(this.passwordField).sendKeys(password);
    }

    async clickLogin() {
        await this.driver.findElement(this.loginButton).click();
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async waitForLoginPage() {
        await this.driver.wait(until.elementLocated(this.usernameField), 5000);
    }
}

module.exports = LoginPage;