import puppeteer from "puppeteer";
jest.setTimeout(50000);

// Test first feature

describe("filter events by city", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch(/*{
      headless: false,
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    }*/);
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".city");
  });

  afterAll(async () => {
    browser.close();
  });

  //Scenario 1
  test("When user hasn’t searched for a city, show upcoming events from all cities.", async () => {});

  //Scenario 2
  test("User should see a list of suggestions when they search for a city.", async () => {
    await page.type(".city", "Berlin", { delay: 100 });
    const suggestion = await page.$(".suggestions");
    expect(suggestion).toBeDefined();
  });

  //Scenario 3
  test("User can select a city from the suggested list.", async () => {
    await page.reload();
    await page.type(".city", "Berlin", { delay: 100 });
    await page.click(".suggestions li");
  });
});

// Test second feature

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch(/*{
      headless: false,
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    }*/);
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(async () => {
    browser.close();
  });

  //Scenario 1
  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .event__Details");
    expect(eventDetails).toBeNull();
  });
  //Scenario 2
  test("User can expand an event to see its details", async () => {
    await page.click(".event .button");
    const eventDetails = await page.$(".event .event__Details");
    expect(eventDetails).toBeDefined();
  });
  //Scenario 3
  test("User can collapse an event to hide its details", async () => {
    //await page.click(".event .hide");
    await page.evaluate(() => {
      document.querySelector(".event .button").click();
    });
    const eventDetails = await page.$(".event .event__Details");
    expect(eventDetails).toBeNull();
  });
});
