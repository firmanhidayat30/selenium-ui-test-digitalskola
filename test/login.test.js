const { getDriver } = require("../config/driverSetup");
const LoginPage = require('../Pages/LoginPage');
const takeScreenshot = require('../utils/screenshot');
const assert = require('chai').assert;

describe('Login Test', function () {
    this.timeout(20000);
    let driver, loginPage;

    before(async function () {
        driver = await getDriver();
        loginPage = new LoginPage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    it('User can login successfully', async function () {
        await driver.get('https://www.saucedemo.com/');
        await loginPage.login("standard_user", "secret_sauce");

        const url = await driver.getCurrentUrl();
        assert.include(url, 'inventory.html', 'Login failed');
        
        await takeScreenshot(driver, 'login_success');
    });
});