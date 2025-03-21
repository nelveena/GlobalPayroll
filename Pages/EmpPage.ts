import { Page, Locator } from '@playwright/test';


export class EmpPage {
    private page: Page;

    private signOut: Locator;




    constructor(page: Page) {
        this.page = page;

        //sign out
        this.signOut = page.locator('a:has-text("Sign Out")');



    }


    async signOutasEmp() {
        await this.page.locator('.nav-link.dropdown-toggle').click();
        await this.signOut.click();
    }


}




