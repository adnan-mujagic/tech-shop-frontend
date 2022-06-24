describe("Tech shop nightwatch tests", function () {
  before((browser) =>
    browser.navigateTo("https://tech-shop-frontend.vercel.app/login")
  );

  it("Test login", function (browser) {
    const emailInputLocator = by.xpath(
      "/html/body/div/div/div/div[2]/form/div[1]/div/input"
    );
    const pwInputLocator = by.xpath(
      "/html/body/div/div/div/div[2]/form/div[2]/div/input"
    );
    const emailInput = element(emailInputLocator);
    const pwInput = element(pwInputLocator);

    browser
      .waitForElementVisible("body")
      .assert.titleContains("Tech Shop")
      .sendKeys(emailInput, "admin@admin.com")
      .sendKeys(pwInput, "Admin123!")
      .useXpath()
      .click("/html/body/div/div/div/div[2]/form/div[3]/button")
      .pause();
  });

  after((browser) => browser.end());
});
