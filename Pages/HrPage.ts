import { Page, Locator } from '@playwright/test';


export class HrPage {
    private page: Page;
    private approvebtn: Locator;




    constructor(page: Page) {
        this.page = page;
        this.approvebtn = page.locator("button[test-id='Approve']");

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


        // // Scroll to the approve button to ensure it is visible
        // await this.page.evaluate(() => {
        //     const element = document.querySelector('div.scrollable'); // Replace with the target element's selector
        //     if (element) {
        //         element.scrollBy(0, element.clientHeight); // Scroll down by the height of the element's visible area
        //     }
        // });
        // // await this.approvebtn.scrollIntoViewIfNeeded();
        // // Ensure the approve button is visible and enabled before clicking

        // await this.page.evaluate((selector) => {
        //     const button = document.querySelector(selector) as HTMLElement;
        //     if (button) {
        //         button.click();
        //     }
        // }, '#Approve'); // Click the approve button using evaluate

    }

}

