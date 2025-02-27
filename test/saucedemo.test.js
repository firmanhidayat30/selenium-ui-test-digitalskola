const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
const getDriver = require('../config/driverSetup');

describe('SauceDemo UI Test', function () {
    this.timeout(20000);
    let driver;

    before(async function () {
        driver = await getDriver(process.env.BROWSER || 'chrome'); 
        await driver.get('https://www.saucedemo.com/');
    });

    after(async function () {
        await driver.quit();
    });

    beforeEach(async function () {
        await driver.get('https://www.saucedemo.com/');
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();
        await driver.wait(until.urlContains('inventory.html'), 5000);
    });

    it('User success login and validate dashboard', async function () {
        const url = await driver.getCurrentUrl();
        assert.include(url, 'inventory.html', 'Login failed or wrong URL');

        const pageTitle = await driver.findElement(By.css('.title')).getText();
        assert.equal(pageTitle, 'Products', 'User is not on the dashboard');
    });

    it('Add item to cart and validate', async function () {
        await driver.findElement(By.css('.btn_inventory')).click();
        await driver.wait(until.elementLocated(By.css('.shopping_cart_badge')), 5000);

        const cartBadge = await driver.findElement(By.css('.shopping_cart_badge')).getText();
        assert.equal(cartBadge, '1', 'Item not added to cart');

        await driver.findElement(By.css('.shopping_cart_link')).click();
        const cartItem = await driver.findElement(By.css('.inventory_item_name')).getText();
        assert.isNotEmpty(cartItem, 'Cart is empty after adding item');
    });
});