import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class WikipediaRootPage {
    baseUrl = 'https://www.wikipedia.org';

    searchInput: Locator;
    suggestionContainer: Locator;
    expectedSearchResult: Locator;

    constructor(public readonly page: Page){
        // this.searchInput = this.page.getByLabel('Search Wikipedia');
        this.searchInput = this.page.locator('#searchInput');
        this.suggestionContainer = this.page.locator('.suggestions-dropdown');
        // this.expectedSearchResult = suggestionContainer.getByRole('link', { name: 'W.B. Mason'});
        this.expectedSearchResult = this.suggestionContainer.getByRole('heading', { name: 'W.B. Mason', level: 3, exact: true});
    }

    async goto(){
        await this.page.goto(this.baseUrl);
        await expect(this.page).toHaveTitle('Wikipedia');
    }

    async fillSearch(term: string){
        await this.searchInput.fill(term);
        // await input.press('Enter');
    }

    async findSearchSuggestion(title: string): Promise<Locator> {
        await expect(this.suggestionContainer).toBeVisible();
        await expect(this.expectedSearchResult).toBeVisible();
        return this.expectedSearchResult;
    }
}