import { Page, Locator } from '@playwright/test';


export class ManPage {
    private page: Page;

    private signOut: Locator;
    private notif: Locator;
    private clickNotif: Locator;




    constructor(page: Page) {
        this.page = page;

        this.notif = page.locator("//a[contains(@class, 'nav-link') and contains(@href, '#/inbox/notifications')]");
        this.clickNotif = page.locator("//span[@class='pointer' and @tabindex='0' and contains(text(), 'Changes in Certifications for NelTest Emp were approved')]");
        this.signOut = page.locator('.dropdown-item.user-sign-out');

    }

    //Verify notification
    async checkNotif() {
        await this.notif.click();

        // if (this.page.isClosed()) {
        //     throw new Error("Cannot click notification: Page is closed.");
        // }
        // if (await this.clickNotif.isVisible()) {
        //     await this.clickNotif.click();
        // } else {
        //     throw new Error("Notification element is not visible.");
        // }


        // await this.clickNotif.count() > 0 && await this.clickNotif.isVisible();
        // if (await this.clickNotif.count() > 0 && await this.clickNotif.isVisible()) {
        //     await this.clickNotif.first().click();
        // } else {
        //     throw new Error("Notification click element is either not present or not visible.");
        // }

    }

    //sign out as Manager
    async signOutMan() {
        await this.page.locator('.nav-link.dropdown-toggle').click();
        await this.signOut.click();
    }



}




