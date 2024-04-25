import { test, expect } from '@playwright/test';

const baseUrl = 'https://www.bailliegifford.com';

test('bg', async ({ page }) => {
    await page.goto(baseUrl);

    await expect(page).toHaveTitle(/Investment Managers | Baillie Gifford/);
    await page.getByText('Your privacy matters to us').isVisible(); //todo: or role?
    await page.getByRole('button', { name: 'Accept all' }).click();

    await page.getByText('Your privacy matters to us').isHidden(); //todo: or role?

    await page.getByText('We detected you are in a location which is outside our licensed jurisdictions.').isVisible(); //todo: or role?
    await page.getByRole('button', { name: 'Existing investors', exact: false }).click();
    await page.getByText('We detected you are in a location which is outside our licensed jurisdictions.').isHidden(); //todo: or role?

    // await new Promise( r => setTimeout(r, 1000) );
    await page.waitForTimeout(1000);

    await page.getByRole('link', { name: 'View all insights' }).click();

    //--------------------
    await expect(page).toHaveTitle(/Insights | Investment Managers | Baillie Gifford/, { timeout: 5000});
    await page.getByRole('heading', { name: 'Insights', level: 1 }).isVisible();

    const searchInput = page.getByPlaceholder('Search insights');
        //   await page.getByLabel('search label').fill('the');

    await searchInput.fill('the');
    await page.locator('.search-button').click(); //todo: send enter key instead
    const searchResultsContainer = page.locator('.insightsSearchResults').first();

    // const result = await page.getByRole('heading', { name: 'Insights', level: 2 }).;
    await expect(page.getByText("Viewing 15 of")).toBeVisible();
    await expect(searchResultsContainer.getByText("Viewing 15 of")).toBeVisible();
    await expect(searchResultsContainer.getByRole('listitem')).toHaveCount(15);

    await searchInput.fill('the o');
    await page.locator('.search-button').click(); //todo: send enter key instead
    
    await expect(page.getByText("Viewing 6 of")).toBeVisible();
    await expect(searchResultsContainer.getByText("Viewing 6 of")).toBeVisible();
    await expect(searchResultsContainer.getByRole('listitem')).toHaveCount(6);
});