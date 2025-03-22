import { test, Page, expect } from '@playwright/test';
import { loginPage } from '../Pages/loginPage';
import { HrPage } from '../Pages/HrPage';
import { EmpPage } from '../Pages/EmpPage';
import { ManPage } from '../Pages/ManPage';
import { CommonData } from '../test-data/common-data';
import { LoginEmp, LoginHr, LoginMan } from '../test-data/login-data';

test.describe('Update Personal Info', () => {
    let page: Page;
    let loginpage: loginPage;
    let hrPage: HrPage;
    let empPage: EmpPage;
    let manPage: ManPage;

    const qaloginEmp = LoginEmp.QA;
    const qaloginHr = LoginHr.QA;
    const qaloginMan = LoginMan.QA;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginpage = new loginPage(page);
        hrPage = new HrPage(page);
        empPage = new EmpPage(page);
        manPage = new ManPage(page);
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('Successful Test - Upload certificate', async () => {
        test.setTimeout(240000); // Set timeout to 240 seconds for this test

        // Step 1: Open browser and navigate to the website
        await test.step('Open browser and navigate to website', async () => {
            await page.goto(CommonData.applicationUrl, { waitUntil: 'domcontentloaded' });
        });

        // Step 2: Login as Employee, upload certificate, and submit
        await test.step('Login as Employee', async () => {
            await loginpage.filltheform(qaloginEmp.uname, qaloginEmp.pwd);
        });

        await test.step('Navigate to Personal Info - Upload Certificate - Submit', async () => {
            await loginpage.navigateToCertification();

            //2.1 Add a new certificate
            await page.getByRole('button', { name: ' Add' }).click();
            await page.locator('ng-select span').first().click();
            await page.getByRole('link', { name: 'Certification 1 (Driving' }).click();

            //2.2 Upload the certificate file
            const filePath = 'c:\\HR People Update\\test-data\\certificate.jpg'; // Ensure the file path is correct
            await page.getByRole('textbox', { name: ' Choose or drop a file' }).setInputFiles(filePath);

            //2.3 Submit the form
            await page.getByRole('button', { name: 'Submit' }).click();
        });

        // Step 3: Validate success message for new record
        await test.step('Validate success message for new record', async () => {
            const successMessage1 = await page.locator('div').filter({ hasText: 'Your request was recorded.' }).nth(2);
            await expect(successMessage1).toBeVisible();
        });

        // Step 4: Sign out as Employee
        await test.step('Sign out as Employee', async () => {
            await empPage.signOutasEmp();
        });

        // Step 5: Validate redirection to login page
        await test.step('Validate that user has been redirected to login page after sign out', async () => {
            await expect(page.locator('#kc-page-title')).toHaveText('Sign in to your account');
        });

        // Step 6: Sign in as HR
        await test.step('Sign in as HR', async () => {
            await loginpage.filltheform(qaloginHr.uname, qaloginHr.pwd);
        });

        // Step 7: Approve request as HR Manager
        await test.step('Approve request as HR Manager', async () => {
            await page.waitForSelector('#my-tasks-menu'); // Wait for the menu to be visible
            await page.locator('#my-tasks-menu').click();

            await hrPage.getTableCell(1, 2); // Call the method on the instance
            await hrPage.clickTableCell(1, 1);

            await hrPage.ClickonApprovebtn();
        });

        // Step 8: Validate success message for approval
        await test.step('Validate success message for approval', async () => {
            const successMessage2 = await page.locator('div').filter({ hasText: 'You successfully completed the task.' }).nth(2);
            await expect(successMessage2).toBeVisible();
        });

        // Step 9: Sign out from HR account
        await test.step('Sign Out as HR', async () => {
            await hrPage.signOutHr();
        });

        // Step 10: Sign in as Manager for HR approval
        await test.step('Sign in as Manager', async () => {
            await loginpage.filltheform(qaloginMan.uname, qaloginMan.pwd);
        });

        // Step 11: Check notification 
        await test.step('Check notification', async () => {
            await manPage.checkNotif();
        });

        //step 12: Assertion : Verify Notification title confirming that changes has been approved
        await test.step('Validate notification message title', async () => {
            const notifMsg = await page.locator('div').filter({ hasText: 'Changes in Certifications for NelTest Emp were approved' }).nth(2);
            await expect(notifMsg).toBeVisible();
        });


        //step 13 : Sign Out from Manager account
        await test.step('Sign Out as Manager', async () => {
            await manPage.signOutMan();
        });


        //step 14 : Assertion : Verify that user has been redirected to login page after sign out
        await test.step('Validate that user has been redirected to login page after sign out', async () => {
            await expect(page.locator('#kc-page-title')).toHaveText('Sign in to your account');
        });


        //step 15 : Sign in as Employee
        await test.step('Sign in as Employee', async () => {
            await loginpage.filltheform(qaloginEmp.uname, qaloginEmp.pwd);
        });

        //step 16 : Navigate to Personal Info - Verify uploaded certificate
        await test.step('Navigate to Personal Info - Verify uploaded certificate', async () => {
            await loginpage.navigateToCertification();

            const certRow = page.locator('tr').filter({ hasText: 'Certification 1 (Driving licence)' }).first();

        });

        //step 17 : Sign Out as Employee
        await test.step('Sign out as Employee', async () => {
            await empPage.signOutasEmp();
        });

        //step 18 : Validate redirection to login page
        await test.step('Validate that user has been redirected to login page after sign out', async () => {
            await expect(page.locator('#kc-page-title')).toHaveText('Sign in to your account');
        });


    });


});