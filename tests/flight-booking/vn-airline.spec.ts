/*
 * Navigate https://www.vietnamairlines.com/vn/vi/
 * Chon depart la SGN -> HAN, Ngay di 25/3/2026 -> 31/3/2026
 * Verify  từ: SGN đến là HAN, ngày đi là 25/3/2026, ngày về là 31/3/2026
 * 
 */
import { test, expect } from '@playwright/test';

test.skip('test flight booking flow', async ({ page }) => {
  await page.goto('https://www.vietnamairlines.com/vn/vi/');

  // Handle Cookie/Privacy Pop-up
  const cookieButton = page.getByRole('button', { name: 'Đồng ý' });
  if (await cookieButton.isVisible()) {
    await cookieButton.click();
  }

  // 1. Select departure (SGN)
  // Clicking the departure box triggers the dropdown
  await page.getByRole('button', { name: /Hà Nội|Chọn điểm đi/ }).click(); 
  // Select by the specific airport code "SGN" to avoid name casing issues
  await page.getByRole('listitem').filter({ hasText: 'SGN' }).click();

  // 2. Select destination (HAN)
  // Once departure is picked, the destination dropdown usually opens automatically 
  // or requires a click on "Chọn điểm đến"
  await page.getByRole('button', { name: 'Chọn điểm đến' }).click();
  await page.getByRole('listitem').filter({ hasText: 'HAN' }).click();

  // 3. Select dates (25/03/2026 -> 31/03/2026)
  // It is safer to use a regex to ensure we pick the right day button
  await page.getByRole('button', { name: /^25$/ }).click();
  await page.getByRole('button', { name: /^31$/ }).click();

  // Confirm date
  await page.getByRole('button', { name: 'Chọn', exact: true }).click();

  // 4. Verify route
  // Using .textContent() or checking the button text is more reliable for these custom components
  await expect(page.locator('button', { hasText: 'SGN' })).toBeVisible();
  await expect(page.locator('button', { hasText: 'HAN' })).toBeVisible();

  // 5. Verify date
  // Note: Ensure the ID #booking-date-trigger-0 is stable, or use a text-based locator
  await expect(page.locator('#booking-date-trigger-0'))
    .toContainText('25/03/2026 - 31/03/2026');
});