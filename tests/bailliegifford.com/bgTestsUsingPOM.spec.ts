import { test, expect } from '@playwright/test';
import { BgRootPage } from './page-objects/bgRootPage';
import { InsightsArticleListPage } from './page-objects/insightsArticleListPage';
import { InsightArticlePage } from './page-objects/insightArticlePage';

//tests using page object model
test.describe('bg site should', () => {
    let rootPage: BgRootPage;

    test.beforeEach(async ({ page }) => {
        rootPage = new BgRootPage(page);
        await rootPage.goto();
        await rootPage.acceptCookies();
        await rootPage.selectIrelandRegion();

        await rootPage.gotoInsightsPage();
    });

    test.afterEach(async ({ page }) => { });

    test('filter elements on the insights list page', async ({ page }) => {
        let insightsPage = new InsightsArticleListPage(page);
        await insightsPage.isInsightsPage();

        await insightsPage.fillArticlesSearch('the');
        await insightsPage.assertArticlesCount(15);

        await insightsPage.fillArticlesSearch('the o');
        await insightsPage.assertArticlesCount(12);

        const ocadoArticle = await insightsPage.getArticleItem('Ocado');
        await expect(ocadoArticle).toBeVisible();
    });

    test('navigate to the ocado article', async ({ page }) => {
        let icPage = new InsightsArticleListPage(page);
        await icPage.isInsightsPage();
        await icPage.fillArticlesSearch('the o');

        const ocadoItem = await icPage.getArticleItem('Ocado’s robot revolution');
        await ocadoItem.click();
        
        let article = await InsightArticlePage.create(page, 'Ocado’s robot retail revolution');
    });
});