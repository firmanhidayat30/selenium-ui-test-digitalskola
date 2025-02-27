const fs = require("fs");

async function takeScreenshot(driver, filename = "screenshot.png") {
    let image = await driver.takeScreenshot();
    fs.writeFileSync(filename, image, "base64");
}

module.exports = takeScreenshot;