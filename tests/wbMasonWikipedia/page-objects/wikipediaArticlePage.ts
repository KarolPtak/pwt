import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class WikipediaArticlePage {

    infoBox: Locator;

    constructor(public readonly page: Page) {
        this.infoBox = this.page.locator('.infobox');
    }

    async isArticlePage() {
        await expect(this.page).toHaveTitle('W.B. Mason - Wikipedia');
    }

    async isPresentInInfoBox(rowName: string, rowText: string) {
        let row = this.infoBox.getByRole('row')
            .filter({ hasText: rowName });

        await expect(row).toBeVisible();
        const rowValue = row.locator('td');
        await expect(rowValue).toBeVisible();

        await expect(rowValue).toContainText(rowText);
    }
}