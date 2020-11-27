/* eslint-disable no-undef */
const { buildDriver } = require("./utility/buildDriver");
const { By, until } = require("selenium-webdriver");
const { triggerEvent } = require("./utility/triggerEvent");

describe("Test for Graph", () => {
  let driver;
  before(async () => {
    driver = await buildDriver();
  });

  it("correctly rendered gained strokes total", async () => {
    await driver.get("http://localhost:3000");
    await driver.wait(until.elementLocated(By.id("strokes-gained")), 20000);
    await driver.sleep(1000);
  });

  it("correctly click on stroke gained button", async () => {
    await driver.findElement(By.id("strokes-gained")).click();
    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.id("strokes-gained")), 20000);
    await driver.wait(
      until.elementLocated(
        By.css("#strokes-gained-dropdown > li:nth-child(1)")
      ),
      20000
    );
    await driver.wait(
      until.elementLocated(
        By.css("#strokes-gained-dropdown > li:nth-child(2)")
      ),
      20000
    );
    await driver.wait(
      until.elementLocated(
        By.css("#strokes-gained-dropdown > li:nth-child(3)")
      ),
      20000
    );
    await driver.findElement(By.id("strokes-gained")).click();
    await driver.sleep(1000);
  });

  it("correctly rendered graph", async () => {
    await driver.wait(until.elementLocated(By.id("rounds-graph")), 20000);
    await triggerEvent(driver, "mouseover", "#circle-1");
    await driver.wait(until.elementLocated(By.id("circle-1")), 20000);
    await driver.sleep(1000);
    await triggerEvent(driver, "mouseover", "#circle-2");
    await driver.wait(until.elementLocated(By.id("circle-2")), 20000);
    await driver.sleep(1000);
    await triggerEvent(driver, "mouseover", "#circle-3");
    await driver.wait(until.elementLocated(By.id("circle-3")), 20000);
    await driver.sleep(1000);
    await triggerEvent(driver, "mouseover", "#circle-4");
    await driver.wait(until.elementLocated(By.id("circle-4")), 20000);
    await driver.sleep(1000);
  });
});
