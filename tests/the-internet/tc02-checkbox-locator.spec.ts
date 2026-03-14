import { test, expect } from '@playwright/test';
test('Test checkbox with css locator: Verify able to check the checkbox', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.locator('input[type="checkbox"]').first().check();
    await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
    await page.locator('input[type="checkbox"]').nth(1).check();
    await expect(page.locator('input[type="checkbox"]').nth(1)).toBeChecked();

});

test('Test checkbox with xpath locator: Verify able to check the checkbox', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.locator('//*[@id="checkboxes"]/input[1]').check();
    await expect(page.locator('//*[@id="checkboxes"]/input[1]')).toBeChecked();
    await page.locator('//*[@id="checkboxes"]/input[2]').check();
    await expect(page.locator('//*[@id="checkboxes"]/input[2]')).toBeChecked();
});
