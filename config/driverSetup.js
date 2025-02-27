const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

async function getDriver(browser = 'chrome') {
    if (browser === 'firefox') {
        const options = new firefox.Options();
        options.addArguments('--headless');
        return new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    } else {
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--disable-gpu');
        options.addArguments('--window-size=1920,1080');
        return new Builder().forBrowser('chrome').setChromeOptions(options).build();
    }
}

module.exports = getDriver;