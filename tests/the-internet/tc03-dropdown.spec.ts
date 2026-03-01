import { test, expect } from '@playwright/test';

test('Verify option 1 is selected from dropdown', async ({ page }) => {
    //arrange
  await page.goto('https://the-internet.herokuapp.com/dropdown');
    //actions
  await page.locator('#dropdown').selectOption('1');
  await page.locator('html').click();
  //assertions
  await expect(page.locator('#dropdown')).toBeVisible();
  await expect(page.locator('#dropdown')).toHaveValue('1');
})

test('Verify option 2 is selected from dropdown', async ({ page }) => {
    //arrange
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.locator('#dropdown').selectOption('2');
    await page.locator('html').click();
    await expect(page.locator('#dropdown')).toBeVisible();
  await expect(page.locator('#dropdown')).toHaveValue('2');
});