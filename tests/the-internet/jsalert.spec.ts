import { test, expect } from '@playwright/test';

test('TC07: JS Alert popup is displayed when clicking the button', async ({ page }) => {

  // Step 1: Open browser & navigate to the website
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // Step 2: Set up listener for dialog before clicking button
  page.once('dialog', async dialog => {
    // Step 4: Verify popup is displayed and check the message
    expect(dialog.message()).toBe('I am a JS Alert');
    expect(dialog.type()).toBe('alert');

    // Accept the popup
    await dialog.accept();
  });

  // Step 3: Click on "Click For JS Alert" button
  await page.getByRole('button', { name: 'Click for JS Alert' }).click();

  // Wait a moment for the dialog to be handled
  await page.waitForTimeout(500);
});
