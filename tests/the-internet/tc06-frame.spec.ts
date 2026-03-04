import { test, expect } from '@playwright/test';

test('verify texts in nested frames', async ({ page }) => {
  // navigate to nested frames page
  await page.goto('https://the-internet.herokuapp.com/nested_frames');

  // Validate that the expected frames exist
  const frameTop = page.frame({ name: 'frame-top' });
  expect(frameTop).not.toBeNull();

  const frameBottom = page.frame({ name: 'frame-bottom' });
  expect(frameBottom).not.toBeNull();

  // use frameLocator for robust lookup (no null chaining required)
  await expect(
    page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-left"]').locator('body')
  ).toContainText('LEFT');

  await expect(
    page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-right"]').locator('body')
  ).toContainText('RIGHT');

  await expect(
    page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-middle"]').locator('#content')
  ).toContainText('MIDDLE');

  await expect(
    page.frameLocator('frame[name="frame-bottom"]').locator('body')
  ).toContainText('BOTTOM');
});

// new test for JS alert popup

test('verify JS alert popup appears when clicking button', async ({ page }) => {
  // 1. Open browser and navigate to page
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // Prepare to capture the dialog event
  let dialogMessage: string | null = null;
  page.on('dialog', dialog => {
    dialogMessage = dialog.message();
    // accept the alert so it doesn't block
    dialog.accept();
  });

  // 3. Click the button
  await page.click('text=Click for JS Alert');

  // 4. Verify the popup displayed by checking we captured a message
  expect(dialogMessage).not.toBeNull();
  expect(dialogMessage).toContain('I am a JS Alert');
});