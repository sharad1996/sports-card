/* eslint-disable no-undef */
const { buildDriver } = require("./utility/buildDriver");
const { By, until } = require("selenium-webdriver");

describe("Test for header", () => {
  let driver;
  before(async () => {
    driver = await buildDriver();
  });

  it("correctly rendered player name and location", async () => {
    await driver.get("http://localhost:3000");
    await driver.wait(until.elementLocated(By.id("player-name")), 20000);
    await driver.wait(until.elementLocated(By.id("player-location")), 20000);
    await driver.sleep(1000);
  });

  it("correctly rendered qualifications", async () => {
    await driver.wait(until.elementLocated(By.id("quality")), 20000);
    await driver.wait(until.elementLocated(By.id("handicap")), 20000);
    await driver.wait(until.elementLocated(By.id("sg-total")), 20000);
    await driver.sleep(1000);
  });

  it("correctly rendered latest activity", async () => {
    await driver.wait(until.elementLocated(By.id("latest-activity")), 20000);
    await driver.sleep(1000);
  });

  it("Correctly change theme", async () => {
    await driver.wait(until.elementLocated(By.id("dark-btn")), 20000);
    await driver.findElement(By.id("dark-btn")).click();
    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.id("light-btn")), 20000);
    await driver.findElement(By.id("light-btn")).click();
    await driver.sleep(1000);
  })
});
