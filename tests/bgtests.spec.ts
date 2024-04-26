import { test, expect } from '@playwright/test';

const baseUrl = 'https://www.bailliegifford.com';

test('bg', async ({ page }) => {
    await page.goto(baseUrl);

    await expect(page).toHaveTitle(/Investment Managers | Baillie Gifford/);
    await page.getByText('Your privacy matters to us').isVisible();
    await page.getByRole('button', { name: 'Accept all' }).click();

    await page.getByText('Your privacy matters to us').isHidden();

    //this scenario may work only for PL IPs
    const audienceSelector = await page.locator("#audience-selector");

    const userLocationMessage = audienceSelector.getByText('01. Your location');
    await userLocationMessage.isVisible();
    await audienceSelector.getByRole('button', { name: 'Change' }).click();
    await audienceSelector.getByRole('button', { name: 'Europe, Middle East & Africa' }).click();
    await audienceSelector.getByRole('listitem').filter({ hasText: "Ireland" }).click();
    await audienceSelector.getByRole('button', { name: 'Professional investor', exact: false }).click();
    await userLocationMessage.isHidden();
    //the site stores user selection and sometimes if things happen too fast, after a redirect to a subpage the popup may appear again
    //it's worth further investigation if we can avoid that wait    
    await page.waitForTimeout(1000);

    await page.getByRole('link', { name: 'View all insights' }).click();

    //--------------------
    await expect(page).toHaveTitle(/Insights | Investment Managers | Baillie Gifford/, { timeout: 5000 });
    await page.getByRole('heading', { name: 'Insights', level: 1 }).isVisible();

    const searchInput = page.getByPlaceholder('Search insights');
    await searchInput.fill('the');
    await page.locator('.search-button').click();
    const searchResultsContainer = page.locator('.insightsSearchResults').first();

    await expect(page.getByText("Viewing 15 of")).toBeVisible();
    await expect(searchResultsContainer.getByText("Viewing 15 of")).toBeVisible();
    await expect(searchResultsContainer.getByRole('listitem')).toHaveCount(15);

    await searchInput.fill('the o');
    await page.locator('.search-button').click();

    await expect(page.getByText("Viewing 12 of")).toBeVisible();
    await expect(searchResultsContainer.getByText("Viewing 12 of")).toBeVisible();
    await expect(searchResultsContainer.getByRole('listitem')).toHaveCount(12);
});