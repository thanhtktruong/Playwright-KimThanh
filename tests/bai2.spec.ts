
import { Page, expect, test } from "@playwright/test";

let page: Page;
const employeeName = "Ravi M B";
const username = "KimThanh";
const password='Admin123';

test.beforeAll(async ({browser}) => {
  await test.step("Pre-condition", async () => {   
    page = await browser.newPage();
    test.setTimeout(600000);
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.locator("button:has-text('Login')").click();
    
    await page.locator("//*[contains(@href,'/web/index.php/admin/viewAdminModule')]").click();
    await page.getByRole('button', { name: 'Add' }).click();
    await page.locator('//div/label[contains(text(),"User Role")]//parent::div//following::div[1]').click();
    await page.getByRole('option', { name: 'Admin' }).click();
    
    await page.getByPlaceholder('Type for hints...').fill(employeeName);
    page.keyboard.press('ArrowDown');
    await page.locator('//div/label[contains(text(),"Status")]//parent::div//following::div[1]').click();
    await page.getByRole('option', { name: 'Enabled' }).click();

    await page.locator('//div/label[contains(text(),"Username")]//following::input[1]').fill(username);
    await page.locator('//div/label[starts-with(text(),"Password")]//following::input[1]').fill(password);
    await page.locator('//div/label[starts-with(text(),"Confirm Password")]//following::input[1]').fill(password);

    await page.getByRole('button', { name: 'Save' }).click();
});
});

test.describe("Test suite", () => {
    test("TC01: Verify successful login with valid credentials", async ({  }) => {
       
        // Go to the OrangeHRM login page
        test.setTimeout(600000);
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
       
        // Input valid credentials
        await page.locator("input[name='username']").fill(username);
        await page.locator("input[name='password']").fill(password);
        await page.locator("button:has-text('Login')").click();

        // Verify that the Dashboard page is displayed
        await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
        
    });
    test("TC02: Verify error message when username is empty", async ({ page }) => {
        // Go to the OrangeHRM login page
        test.setTimeout(600000);
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
   
        // Input valid credentials
        await page.locator("input[name='username']").fill("");
        await page.locator("input[name='password']").fill(password);
        await page.locator("button:has-text('Login')").click();

        // Verify that the Dashboard page is displayed
        await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
        

        // Verify that the “Required” message is displayed below the username textbox
        await expect(page.locator(":text-is('Invalid credentials')")).toBeVisible();
    });
   
});
