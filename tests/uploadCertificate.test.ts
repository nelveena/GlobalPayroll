import { test, Page, expect } from '@playwright/test';
import { loginPage } from '../Pages/loginPage';
import { CommonData } from '../test-data/common-data';
import { LoginEmp, LoginHr, LoginMan } from '../test-data/login-data';


test.describe('Update Personal Info', () => {

    let page: Page; //creating a variable page
    let loginpage: loginPage;
    const qaloginEmp = LoginEmp.QA;
    const qaloginHr = LoginEmp.QA;
    const qaloginMan = LoginEmp.QA;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginpage = new loginPage(page);

    });

    test.afterEach(async () => {
        await page.close();

    });

    test('Successful Test - Upload certifate', async () => {

        await test.step('Open browser and navigate to website', async () => {
            await page.goto(CommonData.applicationUrl, { waitUntil: 'domcontentloaded' });

        });

        //Login as Employee, upload certificate and submit
        await test.step('Login as Emp', async () => {

            await loginpage.filltheform(
                qaloginEmp.uname,
                qaloginEmp.pwd,

            );

            await test.step('Navigate to Personal info - upload certificate - submit', async () => {
                //Navigate to education section
                await page.locator('#ess-menu').click();
                await page.locator('#ess-personal-info-menu').click();
                await page.locator('a').filter({ hasText: 'Education' }).click();
                await page.getByText('Certifications', { exact: true }).click();

                //Add new certificate
                await page.getByRole('button', { name: ' Add' }).click();
                await page.locator('ng-select span').first().click();
                await page.getByRole('link', { name: 'Certification 1 (Driving' }).click();

                // Upload the certificate file
                const filePath = 'c:\\HR People Update\\test-data\\certificationGP.jpg'; // Ensure the file path is correct
                await page.getByRole('textbox', { name: ' Choose or drop a file' }).setInputFiles(filePath);

                // Submit the form
                await page.getByRole('button', { name: 'Submit' }).click();

                // Validate success message
                const successMessage = await page.locator('div').filter({ hasText: 'Your request was recorded.' }).nth(2);
                await expect(successMessage).toBeVisible();

                const validationMessage = await page.locator('div').filter({ hasText: /^Your request is in the process of being validated\.$/ });
                await expect(validationMessage).toBeVisible();


                // await page.getByRole('button', { name: 'Submit' }).click();
                //assertion for record submitted successfully 
                // (#toast-container)
                // await page.locator('div').filter({ hasText: 'Your request was recorded.' }).nth(2).click();
                // await page.locator('div').filter({ hasText: /^Your request is in the process of being validated\.$/ }).click();



            });

            // await test.step('', async () => {


            // });


            // //Login as Manager, approve changes
            // await test.step('Login as Manager', async () => {

            //     await loginpage.filltheform(
            //         qaloginMan.uname,
            //         qaloginMan.pwd,

            //     );

            //     await test.step('Navigate to my task', async () => {


            //     });


            // });


        });
    });











});