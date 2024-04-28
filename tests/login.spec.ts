import { expect, test } from "@playwright/test";
test("Test 1 - Test case to buy the iPhone 13 PRO @login", async ({ page }) => {
  //Step 1: Go to page
  await page.goto("https://rahulshettyacademy.com/client/");

  //Step 2: Enter valid email and password
  await page.fill('#userEmail', 'rahulshetty@gmail.com');
  await page.fill('#userPassword', 'Iamking@000');

  //Step 3: Click on Login button
  await page.click('#login');

  // Click on “Add to Cart” for iPhone 13 PRO item
  await page.locator('div.container > div.row > div:nth-child(3) > div > div > button.btn.w-10.rounded').click();

  //Go to the Cart page by clicking on the Cart button
  await page.locator('//button[@class="btn btn-custom" and contains(text(),"Cart")]').click();
  
  //Click on “Check out” button
  await page.locator('//*[contains(text(),"Checkout")]').click();
  
  //Select country
  await page.getByPlaceholder('Select Country').click();
  await page.getByPlaceholder('Select Country').fill('VietNam');
  page.keyboard.press('Backspace');
  page.keyboard.press('ArrowDown');
  await page.locator('//button/span[@class="ng-star-inserted"]').click();

  //Click on “Place Order”
  await page.locator('//div/div/div[2]/div/div/div[3]/div[2]/div[2]/div/div[2]/a').click();
  // await page.getByRole('button', { name: 'Place Order' }).click();
  
  //Get Order ID
  const orderId = await page.locator('//label[@class="ng-star-inserted"]');

  //Verify Order ID
  
  await page.locator('//button[@class="btn btn-custom" and contains(text(),"ORDERS")] ').click();
  
  await page.isVisible(`text=${orderId}`);
 
  // await expect(page.locator(xpath)).toBeVisible();
//   const locatorA = await page.locator("//tbody/tr/th");
// await expect(locatorA).toHaveValue(orderId);
 
});