const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

describe("SauceDemo UI Tests", function () {
  let driver;

  before(async function () {
    this.timeout(10000);
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should login successfully and navigate to dashboard", async function () {
    await driver.get("https://www.saucedemo.com/");

    // Login
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // Validate dashboard
    await driver.wait(until.urlContains("inventory.html"), 5000);
    const url = await driver.getCurrentUrl();
    expect(url).to.include("inventory.html");
  });

  it("should add an item to the cart", async function () {
    await driver.get("https://www.saucedemo.com/");
    
    // Login
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // Add item to cart
    const addToCartBtn = await driver.findElement(By.className("btn_inventory"));
    await addToCartBtn.click();

    // Validate cart badge
    const cartBadge = await driver.wait(
      until.elementLocated(By.className("shopping_cart_badge")),
      5000
    );
    const badgeText = await cartBadge.getText();
    expect(badgeText).to.equal("1");
  });
});