import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class InsightArticle {
    private constructor(public readonly page: Page, private readonly title: string){
    }

    static async Create(page: Page, title: string): Promise<InsightArticle>{
        var article = new InsightArticle(page, title);
        await article.IsInsightsPage()
        return article;
    }

    private async IsInsightsPage(){
        await expect(this.page).toHaveTitle(`${this.title} | Baillie Gifford`, { timeout: 5000 });
        await this.page.getByRole('heading', { name: this.title, level: 1 }).isVisible();
    }
}