import { expect, test } from '@playwright/test';

// I need to stick these in an .env file
// const baseURL = 'http://localhost:3000';
const baseURL = 'https://rpgsheet.games/';

test.describe('rpg sheet', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    // Login beforeAll that I will turn in to a helper function eventually
    await page.goto(`${baseURL}`);
    await page
      .locator('div')
      .filter({ hasText: /^Create a CharacterorAuthenticate$/ })
      .getByRole('link', { name: 'login' })
      .click();
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill('christest@test.com');
    await page.getByLabel('Email address').press('Tab');
    await page.getByLabel('Password').fill('2Dboneworld@');
    await page.getByLabel('Password').press('Enter');
  });

  test('should be titled "rpg sheet"', async ({ page }) => {
    await expect(page).toHaveTitle('rpg sheet');
  });
  test('can access characters', async ({ page }) => {
    await page
      .getByRole('link', { name: 'My Characters', exact: true })
      .click();
    await expect(page).toHaveURL(`${baseURL}users/20`);
  });
});
