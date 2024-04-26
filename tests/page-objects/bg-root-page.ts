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
        const privacyMessage = this.page.getByText('Your privacy matters to us');
        await privacyMessage.isVisible();
        await this.page.getByRole('button', { name: 'Accept all' }).click();
        await expect(privacyMessage).toBeHidden();
    }

    async chooseIrelandRegion() {
        const audienceSelector = await this.page.locator("#audience-selector");

        const userLocationMessage = audienceSelector.getByText('01. Your location');
        await userLocationMessage.isVisible();
        await audienceSelector.getByRole('button', { name: 'Change' }).click();
        await audienceSelector.getByRole('button', { name: 'Europe, Middle East & Africa' }).click();
        await audienceSelector.getByRole('listitem').filter({ hasText: "Ireland" }).click();
        await audienceSelector.getByRole('button', { name: 'Professional investor', exact: false }).click();
        await userLocationMessage.isHidden();
    
        //the site stores user selection and sometimes if things happen too fast, after a redirect to a subpage the popup may appear again
        //it's worth further investigation if we can avoid that wait
        await this.page.waitForTimeout(1000);
    }

    async gotoInsights() {
        await this.page.getByRole('link', { name: 'View all insights' }).click();
    }
}