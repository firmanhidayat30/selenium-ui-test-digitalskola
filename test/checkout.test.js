const { expect } = require("chai");
const { Builder } = require("selenium-webdriver");
const LoginPage = require("../Pages/LoginPage");
const InventoryPage = require("../Pages/InventoryPage");
const CartPage = require("../Pages/CartPage");
const CheckoutPage = require("../Pages/CheckoutPage");

describe("Checkout Test", function () {
    let driver;
    let loginPage, inventoryPage, cartPage, checkoutPage;

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);

        await driver.get("https://www.saucedemo.com/");
        await loginPage.login("standard_user", "secret_sauce");
        await inventoryPage.addItemToCart();
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
    });

    it("User can complete checkout", async function () {
        await checkoutPage.fillCheckoutDetails("John", "Doe", "12345");
        await checkoutPage.completeCheckout();
        const successMessage = await checkoutPage.isCheckoutSuccessful();
        expect(successMessage).to.exist;
    });

    after(async function () {
        await driver.quit();
    });
});