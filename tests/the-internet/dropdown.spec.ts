/*import { test, expect } from '@playwright/test';

test('TC03:Verify option 1 is selected from dropdown', async ({ page }) => {
    //arrange
  await page.goto('https://the-internet.herokuapp.com/dropdown');
    //actions
  await page.locator('#dropdown').selectOption('1');
  await page.locator('html').click();
  //assertions
  await expect(page.locator('#dropdown')).toBeVisible();
  await expect(page.locator('#dropdown')).toHaveValue('1');
});

test('TC03: Verify option 2 is selected from dropdown', async ({ page }) => {
    //arrange
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.locator('#dropdown').selectOption('2');
    await page.locator('html').click();
    await expect(page.locator('#dropdown')).toBeVisible();
  await expect(page.locator('#dropdown')).toHaveValue('2');
});
test('TC03:Dropdown with multiple options with locator', async ({ page }) => {
    await page.goto('https://output.jsbin.com/osebed/2');
    await page.locator('#fruits').selectOption(['apple', 'banana']);
    await expect(page.locator('#fruits > option:checked')).toHaveText(['Banana', 'Apple' ]);
    await page.locator('#fruits').selectOption([]);
    await expect(page.locator('#fruits > option:checked')).toHaveText([]);
});
*/
import { test, expect } from './fixtures/the-internet.fixtures';
test.describe('Dropdown tests', () => {
    test('TC03:Verify option 1 is selected from dropdown', async ({ dropdownPage }) => {
    await dropdownPage.goto();
    await dropdownPage.selectOption('1');
    
    // Fix: Add await inside the expect call
    expect(await dropdownPage.getSelectedOptionValue()).toBe('1');
    expect(await dropdownPage.getSelectedOptionText()).toBe('Option 1');
});
    test('TC03: Verify option 2 is selected from dropdown', async ({ dropdownPage }) => {
        await dropdownPage.goto();
        await dropdownPage.selectOption('2');
        expect(await dropdownPage.getSelectedOptionValue()).toBe('2');
        expect(await dropdownPage.getSelectedOptionText()).toBe('Option 2');
    });
  });
  test('TC03:Dropdown with multiple options with locator', async ({ dropdownMultiplePage }) => {
    await dropdownMultiplePage.goto();
    await dropdownMultiplePage.selectOption(['apple', 'banana']);
    expect(await dropdownMultiplePage.getSelectedOptionText()).toEqual(['Banana', 'Apple' ]);
    await dropdownMultiplePage.selectOption([]);
    expect(await dropdownMultiplePage.getSelectedOptionText()).toEqual([]);
});