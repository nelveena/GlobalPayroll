import { Page, Locator } from '@playwright/test';


export class loginPageEmp {
    private page: Page;

    //login
    private usernameInput: Locator;
    private passwordInput: Locator;
    private signInbtn: Locator;


    //navigate to certification
    private mySpaceNav: Locator;
    private PersonalInfoNav: Locator;
    private educationNav: Locator;
    private certificationNav: Locator;

    //upload new certificate
    private addbtn: Locator;
    private typedropdown: Locator;
    private scanCopy: Locator;
    private chooseFile: Locator;
    private certSubmitbtn: Locator;




    constructor(page: Page) {
        this.page = page;

        //login
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.signInbtn = this.page.locator('#kc-login');

        //navigate to certification
        this.mySpaceNav = this.page.locator('#ess-menu');
        this.PersonalInfoNav = page.locator('#ess-personal-info-menu');
        this.educationNav = page.locator('a').filter({ hasText: 'Education' });
        this.certificationNav = page.getByText('Certifications', { exact: true });

        //upload new certificate
        this.addbtn = this.page.getByRole('button', { name: ' Add' });
        this.typedropdown = page.locator('ng-select span');
        this.scanCopy = page.getByRole('link', { name: 'Certification 1 (Driving' })
        this.chooseFile = page.getByRole('textbox', { name: ' Choose or drop a file' });
        this.certSubmitbtn = page.getByRole('button', { name: 'Submit' })

    }

    async enterusername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async submitForm() {
        await this.signInbtn.click();
    }


    async filltheform(uname: string, pwd: string) {
        await this.enterusername(uname);
        await this.enterPassword(pwd);
        await this.submitForm();

    }

    async navigateToCertification() {
        await this.mySpaceNav.click();
        await this.PersonalInfoNav.click();
        await this.educationNav.click();
        await this.certificationNav.click();
    }

    // async uploadCertificate() {
    //     await this.addbtn.click
    //     await this.typedropdown.first().click();
    //     await this.scanCopy.click();
    //     const filePath = 'c:\\HR People Update\\test-data\\certificate.jpg'; // Ensure the file path is correct
    //     await this.chooseFile.setInputFiles(filePath);


}

