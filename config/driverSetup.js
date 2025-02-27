const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");

async function getDriver(browser = "chrome") {
    let options;
    if (browser === "firefox") {
        options = new firefox.Options();
        options.addArguments("--headless"); // Headless mode
        return new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
    } else {
        options = new chrome.Options();
        options.addArguments("--headless", "--disable-gpu", "--window-size=1920,1080"); // Headless mode
        return new Builder().forBrowser("chrome").setChromeOptions(options).build();
    }
}

module.exports = { getDriver };