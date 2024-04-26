import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class RootPage {
    baseUrl = 'https://www.bailliegifford.com';

    constructor(public readonly page: Page){

    }

    async goto() {
        await this.page.goto(this.baseUrl);
        await expect(this.page).toHaveTitle(/Investment Managers | Baillie Gifford/);
    }

    async acceptCookies() {
        const privacyMessage = this.page.getByText('Your privacy matters to us'); //todo: or role?
        await privacyMessage.isVisible();
        await this.page.getByRole('button', { name: 'Accept all' }).click();
        await expect(privacyMessage).toBeHidden();
    }

    async chooseRegion() {
        const userLocationMessage = this.page.getByText('We detected you are in a location which is outside our licensed jurisdictions.');
        await userLocationMessage.isVisible();
        await this.page.getByRole('button', { name: 'Existing investors', exact: false }).click();
        await userLocationMessage.isHidden();
    
        //the site stores user selection and sometimes things happen to fast
        await this.page.waitForTimeout(1000); // await new Promise( r => setTimeout(r, 1000) );
    }

    async gotoInsights() {
        await this.page.getByRole('link', { name: 'View all insights' }).click();
    }
}