import { test, expect } from '@playwright/test';
import { RootPage } from './page-objects/bg-root-page';
import { InsightsPage } from './page-objects/bg-insights-page';
import { InsightArticle } from './page-objects/bg-insight-article';

test.describe('bg site should', () => {
    let rootPage: RootPage;

    test.beforeEach(async ({ page }) => {
        rootPage = new RootPage(page);
        await rootPage.goto();
        await rootPage.acceptCookies();
        await rootPage.chooseRegion();
        await rootPage.gotoInsights();
    });

    test.afterEach(async ({ page }) => { });

    test('filter insights', async ({ page }) => {
        let icPage = new InsightsPage(page);
        await icPage.IsInsightsPage();

        await icPage.FillSearch('the');
        await icPage.AssertIcCount(15);

        await icPage.FillSearch('the o');
        await icPage.AssertIcCount(6);

        const ocadoItem = await icPage.GetItem('Ocado');
        await expect(ocadoItem).toBeVisible();
    });

    test('navigate to the ocado article', async ({ page }) => {
        let icPage = new InsightsPage(page);
        await icPage.IsInsightsPage();
        await icPage.FillSearch('the o');

        const ocadoItem = await icPage.GetItem('Ocado');
        await ocadoItem.click();
        
        let article = await InsightArticle.Create(page, 'Ocado’s robot retail revolution');
    });
});