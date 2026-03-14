import { test, expect } from '@playwright/test';

test('Dropdown with multiple options with locator', async ({ page }) => {
    await page.goto('https://output.jsbin.com/osebed/2');
    await page.locator('#fruits').selectOption(['apple', 'banana']);
    await expect(page.locator('#fruits > option:checked')).toHaveText(['Banana', 'Apple' ]);
    await page.locator('#fruits').selectOption([]);
    await expect(page.locator('#fruits > option:checked')).toHaveText([]);
});