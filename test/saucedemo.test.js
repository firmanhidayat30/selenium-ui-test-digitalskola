const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;

describe('SauceDemo UI Test', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com/');
    });

    after(async function () {
        await driver.quit();
    });

    it('User success login', async function () {
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        const url = await driver.getCurrentUrl();
        assert.include(url, 'inventory.html', 'Login failed or wrong URL');
    });

    it('Add item to cart and validate', async function () {
        await driver.findElement(By.className('btn_inventory')).click();
        await driver.wait(until.elementLocated(By.className('shopping_cart_badge')), 5000);

        const cartBadge = await driver.findElement(By.className('shopping_cart_badge')).getText();
        assert.equal(cartBadge, '1', 'Item not added to cart');
    });
});