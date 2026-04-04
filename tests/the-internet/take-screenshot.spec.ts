import { test, expect } from '@playwright/test';

test('visual test', async ({ page }) => {
  await page.goto('https://example.com');

  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  const element = page.locator('h1');
  await expect(element).toBeVisible();
  await element.screenshot({ path: 'element.png' });

  try {
    await expect(element).toHaveText('Example Domain');
  } catch (error) {
    await page.screenshot({ path: `failure-${test.info().title}.png` });
    throw error;
  }
});