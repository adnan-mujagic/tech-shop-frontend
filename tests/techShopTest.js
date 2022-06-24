describe("Tech shop nightwatch tests", function () {
  before((browser) =>
    browser.navigateTo("https://tech-shop-frontend.vercel.app")
  );

  it("Test registration failed", function (browser) {
    let inputElems = [];
    for (let i = 1; i < 6; i++) {
      const inputLocator = by.xpath(
        `/html/body/div/div/div/div[2]/form/div[${i}]/div/input`
      );
      inputElems.push(element(inputLocator));
    }

    browser
      .navigateTo("https://tech-shop-frontend.vercel.app/register")
      .useXpath();

    let inputs = ["Amar", "Mujagic", "email@email.com", "username", "badpw"];

    inputs.forEach((input, idx) => {
      browser.sendKeys(inputElems[idx], input);
    });

    browser
      .click("/html/body/div/div/div/div[2]/form/div[6]/button")
      .assert.visible("/html/body/div/div/div/div[1]/div/div[2]")
      .assert.textContains(
        "/html/body/div/div/div/div[1]/div/div[2]",
        "The password must have at least 8 characters, including at least 1 special character and at least 1 digit"
      );
  });

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
      .navigateTo("https://tech-shop-frontend.vercel.app/login")
      .assert.titleContains("Tech Shop")
      .sendKeys(emailInput, "admin@admin.com")
      .sendKeys(pwInput, "Admin123!")
      .useXpath()
      .click("/html/body/div/div/div/div[2]/form/div[3]/button");
  });

  it("Test purchasing an item", function (browser) {
    const purchaseBtn = "/html/body/div[2]/div[3]/div/div/button";
    const closeBtn = "/html/body/div[3]/div[3]/div/div/div[4]/button[1]";
    const hideDrawerMenuBtn = "/html/body/div[2]/div[3]/div/button";
    browser
      .useXpath()
      .click("/html/body/div/div/div/div[2]/div/div[1]/div[2]/div[7]/button[2]")
      .click("/html/body/div/div/div/div[1]/div[2]/div[2]/div")
      .assert.visible(purchaseBtn)
      .click(purchaseBtn)
      .click(closeBtn)
      .click(hideDrawerMenuBtn);
  });

  it("Testing order history", function (browser) {
    browser
      .useXpath()
      .assert.visible("/html/body/div/div/div/div[1]/div[2]/div[2]/div")
      .click("/html/body/div/div/div/div[1]/div[2]/div[2]/div")
      .assert.textContains(
        "/html/body/div[2]/div[3]/div/ul/li/div/button[1]",
        "ORDER HISTORY"
      )
      .click("/html/body/div[2]/div[3]/div/ul/li/div/button[1]")
      .assert.urlContains("orderHistory");
  });

  it("Testing admin dashboard", function (browser) {
    const menuBtn = "/html/body/div/div/div/div[1]/div[2]/div[2]";
    const adminDashboardBtn =
      "/html/body/div[2]/div[3]/div/ul/li/div/button[2]";

    const lowestInStockTable =
      "/html/body/div/div/div/div[2]/div[2]/div[2]/table";
    const mostSoldItemsTable = "/html/body/div/div/div/div[2]/div[3]/div/table";
    const favoriteItemsTable =
      "/html/body/div/div/div/div[2]/div[4]/div[2]/table";

    browser
      .useXpath()
      .click(menuBtn)
      .assert.textContains(adminDashboardBtn, "ADMIN DASHBOARD")
      .click(adminDashboardBtn)
      .assert.urlContains("admin")
      .assert.visible(lowestInStockTable)
      .assert.visible(mostSoldItemsTable)
      .assert.visible(favoriteItemsTable);
  });

  after((browser) => browser.end());
});
