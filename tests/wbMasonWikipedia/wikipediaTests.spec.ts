import { test, expect } from '@playwright/test';
import { WikipediaRootPage } from './page-objects/wikipediaRootPage';
import { WikipediaArticlePage } from './page-objects/wikipediaArticlePage';

const baseUrl = 'https://www.bailliegifford.com';

//tests using page object model
test.describe('wikipedia site should', () => {
    let rootPage: WikipediaRootPage;

    test.beforeEach(async ({ page }) => {
        rootPage = new WikipediaRootPage(page);
        await rootPage.goto();
    });

    test.afterEach(async ({ page }) => { });

    test('render the root page', async ({ page }) => {
        //everything in beforeEach
    });

    test('return W.B. Mason in the search results', async ({ page }) => {
        await rootPage.fillSearch('wb mason');
        let wbMasonResult = await rootPage.findSearchSuggestion("W.B. Mason");
        await expect(wbMasonResult).toBeVisible();
    });

    test('contain W.B.Mason article with correct data', async ({ page }) => {
        await rootPage.fillSearch('wb mason');
        let wbMasonResult = await rootPage.findSearchSuggestion("W.B. Mason");
        await wbMasonResult.click();

        let wbMasonArticle = new WikipediaArticlePage(page);
        await wbMasonArticle.isArticlePage();
        await wbMasonArticle.isPresentInInfoBox('Founded', '1898');
        await wbMasonArticle.isPresentInInfoBox('Founder', 'William Betts Mason');
        await wbMasonArticle.isPresentInInfoBox('Website', 'www.wbmason.com');
    });
});