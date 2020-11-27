const { Builder } = require('selenium-webdriver');
require('chromedriver');

let driver = null;
exports.buildDriver = async () => {
  if (!driver) {
    driver = new Builder().forBrowser('chrome').build();
  }
  return driver;
};

exports.quitDriver = async () => {
  if (driver) {
    await driver.quit();
  }
}