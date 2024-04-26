import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class InsightArticlePage {
    private constructor(public readonly page: Page, private readonly title: string){
    }

    static async create(page: Page, title: string): Promise<InsightArticlePage>{
        var article = new InsightArticlePage(page, title);
        await article.IsInsightsPage()
        return article;
    }

    private async IsInsightsPage(){
        await expect(this.page).toHaveTitle(`${this.title} | Baillie Gifford`, { timeout: 5000 });
        await this.page.getByRole('heading', { name: this.title, level: 1 }).isVisible();
    }
}