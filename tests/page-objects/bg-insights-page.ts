import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class InsightsPage {
    constructor(public readonly page: Page){
    }

    async IsInsightsPage(){
        await expect(this.page).toHaveTitle(/Insights | Investment Managers | Baillie Gifford/, { timeout: 5000 });
        await this.page.getByRole('heading', { name: 'Insights', level: 1 }).isVisible();
    }

    async FillSearch(input: string){
        const searchInput = this.page.getByPlaceholder('Search insights');
        await searchInput.fill(input);
        await searchInput.press('Enter');
    }

    async AssertIcCount(count: number){
        const searchResultsContainer = this.page.locator('.insightsSearchResults').first();

        await expect(searchResultsContainer.getByRole('listitem')).toHaveCount(count);
        await expect(this.page.getByText(`Viewing ${count} of`)).toBeVisible();
        await expect(searchResultsContainer.getByText(`Viewing ${count} of`)).toBeVisible();
    }

    async GetItem(name: string): Promise<Locator> {
        const searchResultsContainer = this.page.locator('.insightsSearchResults').first();
        const item = searchResultsContainer.getByRole('listitem')
            //.nth(2);
            .filter({ hasText: name }); //.first();
        
        await expect(item).toBeVisible();

        return item;
    }
}