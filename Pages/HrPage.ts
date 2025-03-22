import { Page, Locator } from '@playwright/test';


export class HrPage {
    private page: Page;
    private approvebtn: Locator;
    private signoutbtn: Locator;
    private declinebtn: Locator;




    constructor(page: Page) {
        this.page = page;
        this.approvebtn = page.locator("button[test-id='Approve']");
        this.declinebtn = page.locator("//button[@type='button' and @class='btn primary p-x-md' and @test-id='Decline']");
        this.signoutbtn = page.locator('.dropdown-item.user-sign-out'); // Corrected locator

    }


    // Get a specific request (cell)
    async getTableCell(rowIndex: number, colIndex: number) {
        return this.page.locator(
            `tr:nth-child(${rowIndex}) > td:nth-child(${colIndex})`
        );
    }

    // Click on a specific request (cell)
    async clickTableCell(rowIndex: number, colIndex: number) {
        const cell = await this.getTableCell(rowIndex, colIndex);
        await cell.click();
    }

    async ClickonApprovebtn() {
        await this.approvebtn.click()

    }
    async ClickonDeclinebtn() {
        await this.declinebtn.click()

    }
    async signOutHr() {
        await this.page.locator('.nav-link.dropdown-toggle.clear').click();
        await this.signoutbtn.click();
    }


}

