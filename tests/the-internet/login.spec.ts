/**
1.Open browser
2.Navigate to https://the-internet.herokuapp.com/login
3.Fill in username with tomsmith
4.Fill in the password with SuperSecretPassword!
5.Click on Login button
6.And the home page is appear
 */
/* answer 3 questions:
   * 1. tagname (E): input
   * 2. attributes(name-> A, value -> t ) 
   *      name=username, id=username, type=text
   * 3. text?
   * n/a
   * 
   * Css selector: E[A=t] or [A=t] if A=id => E#t or #t, if A=class => E.t or .t
   * * //E[@A='t'] or //*[@A='t'] 
   * //E[contains(@A,t)] or //*[contains(@A,t)]
*/
import { test, expect } from '@playwright/test';

test('TC01: Can login with correct username and password by codegen', async ({ page }) => {
    //arrange
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator("#username").fill('tomsmith');
  //actions
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  //assertions
  await expect(page.getByText('You logged into a secure area')).toBeVisible();
  await expect(page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
});

test('TC01: Test login with locator css: Can login with correct username and password', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.locator('button[type="submit"]').click();
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});

test('TC01: Test login with xpath: Can login with correct username and password', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator("//input[@id='username']").fill('tomsmith');
  await page.locator("//input[@id='password']").fill('SuperSecretPassword!');

  await page.locator("//button[@type='submit']").click();

  await expect(page.locator("//div[contains(text(),'You logged into a secure area!')]")).toBeVisible();
});