import { test, expect } from '@playwright/test';

const baseUrl = 'https://www.bailliegifford.com';

test('bg', async ({ page }) => {
    await page.goto(baseUrl);

    await expect(page).toHaveTitle(/Investment Managers | Baillie Gifford/);
    const privacyMessage = page.getByText('Your privacy matters to us'); //todo: or role?
    await privacyMessage.isVisible();
    await page.getByRole('button', { name: 'Accept all' }).click();
    await expect(privacyMessage).toBeHidden();

    const userLocationMessage = page.getByText('We detected you are in a location which is outside our licensed jurisdictions.');
    await userLocationMessage.isVisible();
    await page.getByRole('button', { name: 'Existing investors', exact: false }).click();
    await userLocationMessage.isHidden();

    //the site stores user selection and sometimes things happen to fast
    await page.waitForTimeout(1000); // await new Promise( r => setTimeout(r, 1000) );

    await page.getByRole('link', { name: 'View all insights' }).click();

    //--------------------
    await expect(page).toHaveTitle(/Insights | Investment Managers | Baillie Gifford/, { timeout: 5000});
    await page.getByRole('heading', { name: 'Insights', level: 1 }).isVisible();

    const searchInput = page.getByPlaceholder('Search insights'); //   await page.getByLabel('search label').fill('the');

    await searchInput.fill('the');
    await searchInput.press('Enter');
    // await page.locator('.search-button').click(); //todo: send enter key instead
    const searchResultsContainer = page.locator('.insightsSearchResults').first();

    // const result = await page.getByRole('heading', { name: 'Insights', level: 2 }).;
    await expect(page.getByText("Viewing 15 of")).toBeVisible();
    await expect(searchResultsContainer.getByText("Viewing 15 of")).toBeVisible();
    await expect(searchResultsContainer.getByRole('listitem')).toHaveCount(15);

    await searchInput.fill('the o');
    await searchInput.press('Enter');
    // await page.locator('.search-button').click(); //todo: send enter key instead
    
    await expect(page.getByText("Viewing 6 of")).toBeVisible();
    await expect(searchResultsContainer.getByText("Viewing 6 of")).toBeVisible();
    await expect(searchResultsContainer.getByRole('listitem')).toHaveCount(6);

    const itemToPick = searchResultsContainer.getByRole('listitem')
        //.nth(2);
        .filter({ hasText: 'Ocado'}); //.first();
        
    await itemToPick.click();
});