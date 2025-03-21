import { test, Page, expect } from '@playwright/test';
import { loginPage } from '../Pages/loginPage';
import { HrPage } from '../Pages/HrPage';
import { EmpPage } from '../Pages/EmpPage';
import { CommonData } from '../test-data/common-data';
import { LoginEmp, LoginHr, LoginMan } from '../test-data/login-data';

test.describe('Update Personal Info', () => {
    let page: Page;
    let loginpage: loginPage;
    let hrPage: HrPage;
    let empPage: EmpPage;


    const qaloginEmp = LoginEmp.QA;
    const qaloginHr = LoginHr.QA;
    const qaloginMan = LoginMan.QA;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginpage = new loginPage(page);
        hrPage = new HrPage(page);
        empPage = new EmpPage(page);
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('Successful Test - Upload certificate', async () => {
        test.setTimeout(60000); // Set timeout to 60 seconds for this test

        await test.step('Open browser and navigate to website', async () => {
            await page.goto(CommonData.applicationUrl, { waitUntil: 'domcontentloaded' });
        });

        // Login as Employee, upload certificate, and submit
        await test.step('Login as Employee', async () => {
            await loginpage.filltheform(qaloginEmp.uname, qaloginEmp.pwd);
        });

        await test.step('Navigate to Personal Info - Upload Certificate - Submit', async () => {
            // Navigate to the certification section
            await loginpage.navigateToCertification();

            // Add a new certificate
            //await page.locator('span:has-text("Add")').click();
            await page.getByRole('button', { name: ' Add' }).click();
            await page.locator('ng-select span').first().click();
            await page.getByRole('link', { name: 'Certification 1 (Driving' }).click();

            // Upload the certificate file
            const filePath = 'c:\\HR People Update\\test-data\\certificate.jpg'; // Ensure the file path is correct
            await page.getByRole('textbox', { name: ' Choose or drop a file' }).setInputFiles(filePath);

            // Submit the form
            await page.getByRole('button', { name: 'Submit' }).click();
        });

        // Assertions - Validate success message
        await test.step('Validate success message for new record', async () => {

            const successMessage = await page.locator('div').filter({ hasText: 'Your request was recorded.' }).nth(2);
            await expect(successMessage).toBeVisible();
            // const informMessage = page.locator('span').filter({ hasText: 'Your request is in the process of being validated.' }).nth(2);
            // await expect(informMessage).toBeVisible();

        });

        // Signing out as Employee after record creation
        await test.step('Sign out as Employee', async () => {
            await empPage.signOutasEmp();

        });

        // Assertion - Verify login page is displayed
        await test.step('Validate that user has been redirected to login page after sign out', async () => {
            await expect(page.locator('#kc-page-title')).toHaveText('Sign in to your account'); // Corrected locator
        });



        // Signing in as HR after Employee submission
        await test.step('Sign in as HR', async () => {
            await loginpage.filltheform(qaloginHr.uname, qaloginHr.pwd);

        });



        // Navigate to the HR tasks and approve request
        await test.step('Approve request as HR Manager', async () => {

            await page.locator('#my-tasks-menu').click();
            await hrPage.getTableCell(1, 2); // Call the method on the instance
            await hrPage.clickTableCell(1, 1);
            await hrPage.ClickonApprovebtn();
        });

    });
});
