import { test, expect } from '@playwright/test';

test('JS Alert popup is displayed when clicking the button', async ({ page }) => {

  // 1. Open browser & 2. Navigate to URL
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // 3 & 4. Click button and verify popup appears
  const [dialog] = await Promise.all([
    page.waitForEvent('dialog'), // wait for popup
    page.getByRole('button', { name: 'Click for JS Alert' }).click()
  ]);

  // Verify popup text
  expect(dialog.message()).toBe('I am a JS Alert');

  // Accept popup
  await dialog.accept();
});