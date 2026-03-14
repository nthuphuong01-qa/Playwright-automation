import { test, expect } from '@playwright/test';

test('Test login with locator css: Can login with correct username and password', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator("#username").fill('tomsmith');
  await page.locator("#password").fill('SuperSecretPassword!');
  await page.locator("#login").click();
  await expect(page.locator(`div:has-text("You logged into a secure area!")`)).toBeVisible();
});

test('Test login with xpath: Can login with correct username and password', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.locator("//input[@id='username']").fill('tomsmith');
    await page.locator("//input[@id='password']").fill('SuperSecretPassword!');
    await page.locator("//button[@id='login']").click();
    await expect(page.locator(`//div[contains(text(),"You logged into a secure area!")]`)).toBeVisible();
});

test('Test login with getByRole: Can login with correct username and password', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();
    await expect(page.getByText('You logged into a secure area')).toBeVisible();
});