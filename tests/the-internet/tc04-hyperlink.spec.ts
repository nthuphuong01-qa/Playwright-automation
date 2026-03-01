import { test, expect } from '@playwright/test';

test('Verify that hyperlink function work well', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/status_codes');
 
  await page.getByRole('link', { name: '200' }).click();
  await expect(page.getByText('This page returned a 200')).toBeVisible();

  await page.getByRole('link', { name: 'here' }).click();
  await page.getByRole('link', { name: '301' }).click();
  await expect(page.getByText('This page returned a 301')).toBeVisible();

  await page.getByRole('link', { name: 'here' }).click();
  await page.getByRole('link', { name: '404' }).click();
  await expect(page.getByText('This page returned a 404')).toBeVisible();

  await page.getByRole('link', { name: 'here' }).click();
  await page.getByRole('link', { name: '500' }).click();
  await expect(page.getByText('This page returned a 500')).toBeVisible();

  await page.getByRole('link', { name: 'here' }).click();
});