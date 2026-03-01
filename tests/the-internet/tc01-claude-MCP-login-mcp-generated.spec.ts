/**
 * Generated Login Test Using Playwright MCP
 * This test was generated using Playwright's code generation capabilities
 * Recorded steps:
 * 1. Navigate to https://the-internet.herokuapp.com/login
 * 2. Fill in username field with "tomsmith"
 * 3. Fill in password field with "SuperSecretPassword!"
 * 4. Click the login button
 * 5. Verify success message appears
 */

import { test, expect } from '@playwright/test';

test.describe('Login Test - Generated with Playwright MCP', () => {
  test('Should successfully login with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Take screenshot at login page
    await page.screenshot({ path: 'screenshots/mcp-step1-login-page.png' });

    // Fill username field - using the most reliable selector
    await page.locator('input[name="username"]').fill('tomsmith');

    // Take screenshot after username filled
    await page.screenshot({ path: 'screenshots/mcp-step2-username-filled.png' });

    // Fill password field
    await page.locator('input[name="password"]').fill('SuperSecretPassword!');

    // Take screenshot after password filled
    await page.screenshot({ path: 'screenshots/mcp-step3-password-filled.png' });

    // Click login button
    await page.locator('button[type="submit"]').click();

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');

    // Take screenshot after login clicked
    await page.screenshot({ path: 'screenshots/mcp-step4-login-clicked.png' });

    // Verify success - check for success message
    const successMessage = page.locator('.flash.success');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('You logged into a secure area');

    // Verify we're on the secure area page
    const heading = page.locator('h2');
    await expect(heading).toContainText('Secure Area');

    // Verify the welcome message
    const welcomeText = page.locator('h4');
    await expect(welcomeText).toContainText('Welcome to the Secure Area');

    // Take final screenshot
    await page.screenshot({ path: 'screenshots/mcp-step5-success.png' });

    // Verify logout button exists
    const logoutButton = page.locator('a[href="/logout"]');
    await expect(logoutButton).toBeVisible();
  });

  test('Should display error with invalid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Fill username field with invalid credentials
    await page.locator('input[name="username"]').fill('invalid_user');

    // Fill password field with invalid credentials
    await page.locator('input[name="password"]').fill('invalid_password');

    // Click login button
    await page.locator('button[type="submit"]').click();

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Verify error message appears
    const errorMessage = page.locator('.flash.error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Your username is invalid!');
  });

  test('Should require both username and password', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Try to submit without filling fields
    await page.locator('button[type="submit"]').click();

    // The form validation should prevent submission or show error
    // Depending on browser, we might see browser validation
    await page.waitForTimeout(500);

    // Try filling only username
    await page.locator('input[name="username"]').fill('tomsmith');
    await page.locator('button[type="submit"]').click();

    // Should still fail without password
    await page.waitForTimeout(500);
  });
});
