import { test, expect } from '@playwright/test';

test('Test checkbox', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

await page.getByRole('checkbox').first().check();
await expect(page.getByRole('checkbox').first()).toBeChecked();

await page.getByRole('checkbox').nth(1).check();
await expect(page.getByRole('checkbox').nth(1)).toBeChecked();
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
