/*import { test, expect } from '@playwright/test';

test('TC02:Test checkbox with codegen', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

await page.getByRole('checkbox').first().check();
await expect(page.getByRole('checkbox').first()).toBeChecked();

await page.getByRole('checkbox').nth(1).check();
await expect(page.getByRole('checkbox').nth(1)).toBeChecked();
});

test('TC02: Test checkbox with css locator: Verify able to check the checkbox', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.locator('input[type="checkbox"]').first().check();
    await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
    await page.locator('input[type="checkbox"]').nth(1).check();
    await expect(page.locator('input[type="checkbox"]').nth(1)).toBeChecked();

});

test('TC02: Test checkbox with xpath locator: Verify able to check the checkbox', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.locator('//*[@id="checkboxes"]/input[1]').check();
    await expect(page.locator('//*[@id="checkboxes"]/input[1]')).toBeChecked();
    await page.locator('//*[@id="checkboxes"]/input[2]').check();
    await expect(page.locator('//*[@id="checkboxes"]/input[2]')).toBeChecked();
});
/*
Dung locator de viet testscript
import { test, expect } from '@playwright/test';

test('verify able to check the checkbox', async ({page}) =>{
    await page.goto('https://the-internet.herokuapp.com/checkboxes')

    await page.getByRole('checkbox').first().check(); // accessibility role
    await page.locator("#checkboxes input:nth-child(1)").check(); //css locator string => request unique value
    await page.locator("//*[@id='checkboxes']/input[1]").check(); //xpath
    await page.locator("//*[@id='checkboxes']/input[1]").isChecked(); //xpath

    expect(await page.getByRole('checkbox').first()).toBeChecked();

    await page.getByRole('checkbox').nth(1).check();
    expect(await page.getByRole('checkbox').nth(1)).toBeChecked();
});
*/
import { test, expect } from './fixtures/the-internet.fixtures';

test('verify able to check the checkbox', async ({checkboxesPage}) =>{
    await checkboxesPage.goto();

    await checkboxesPage.checkFirstCheckbox(); // accessibility role
    await checkboxesPage.checkSecondCheckbox(); // accessibility role

    expect(await checkboxesPage.isFirstCheckboxChecked()).toBe(true);
    expect(await checkboxesPage.isSecondCheckboxChecked()).toBe(true);
});