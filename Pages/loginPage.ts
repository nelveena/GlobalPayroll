import { Page, Locator } from '@playwright/test';


export class loginPage {
    private page: Page;


    private usernameInput: Locator;
    private passwordInput: Locator;

    private signInbtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');

        this.signInbtn = this.page.locator('#kc-login')

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

}                     