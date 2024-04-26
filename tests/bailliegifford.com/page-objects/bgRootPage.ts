import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class BgRootPage {
    baseUrl = 'https://www.bailliegifford.com'; //can be also moved to playwright.config.ts
    private readonly privacyMessage: Locator;
    private readonly audienceSelector: Locator;

    constructor(public readonly page: Page){
        this.privacyMessage = this.page.getByText('Your privacy matters to us');
        this.audienceSelector = this.page.locator("#audience-selector");
    }

    async goto() {
        await this.page.goto(this.baseUrl);
        await expect(this.page).toHaveTitle(/Investment Managers | Baillie Gifford/);
    }

    async acceptCookies() {
        await this.privacyMessage.isVisible();
        await this.page.getByRole('button', { name: 'Accept all' }).click();
        await expect(this.privacyMessage).toBeHidden();
    }

    async selectIrelandRegion() {
        const userLocationMessage = this.audienceSelector.getByText('01. Your location');
        await userLocationMessage.isVisible();
        await this.audienceSelector.getByRole('button', { name: 'Change' }).click();
        await this.audienceSelector.getByRole('button', { name: 'Europe, Middle East & Africa' }).click();
        await this.audienceSelector.getByRole('listitem').filter({ hasText: "Ireland" }).click();
        await this.audienceSelector.getByRole('button', { name: 'Professional investor', exact: false }).click();
        await userLocationMessage.isHidden();
    
        //the site stores user selection and sometimes if things happen too fast, after a redirect to a subpage the popup may appear again
        //it's worth further investigation if we can avoid that wait
        await this.page.waitForTimeout(1000);
    }

    async gotoInsightsPage() {
        await this.page.getByRole('link', { name: 'View all insights' }).click();
    }
}