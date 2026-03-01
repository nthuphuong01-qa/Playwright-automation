/**
 * Open browser

1.Navigate to https://the-internet.herokuapp.com/login
2.Fill in username with tomsmith
3.Fill in the password with SuperSecretPassword!
4.Click on Login button
5.And the home page is appear
 */
import { test, expect } from '@playwright/test';

test('Can login with correct username and password - with screenshots', async ({ page }) => {
    //arrange
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.screenshot({ path: 'screenshots/step1-login-page.png' });

  //actions
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.screenshot({ path: 'screenshots/step2-username-filled.png' });

  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.screenshot({ path: 'screenshots/step3-password-filled.png' });

  await page.getByRole('button', { name: ' Login' }).click();
  await page.screenshot({ path: 'screenshots/step4-login-clicked.png' });

  //assertions
  await expect(page.getByText('You logged into a secure area')).toBeVisible();
  await expect(page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
  await page.screenshot({ path: 'screenshots/step5-success.png' });
});
