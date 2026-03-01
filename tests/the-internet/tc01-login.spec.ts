/**
1.Open browser
2.Navigate to https://the-internet.herokuapp.com/login
3.Fill in username with tomsmith
4.Fill in the password with SuperSecretPassword!
5.Click on Login button
6.And the home page is appear
 */
import { test, expect } from '@playwright/test';

test('Can login with correct username and password', async ({ page }) => {
    //arrange
  await page.goto('https://the-internet.herokuapp.com/login');
  //actions
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  //assertions
  await expect(page.getByText('You logged into a secure area')).toBeVisible();
  await expect(page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
});