import { test, expect } from '@playwright/test';

test.use({
  geolocation: { longitude: 41.890221, latitude: 12.492348 },
  permissions: ['geolocation'],
});

test('my test with geolocation', async ({ page }) => {
  page.goto("https://the-internet.herokuapp.com/geolocation")
  page.getByRole('button', { name: 'Where am I?' }).click()
  
  const lat = await page.locator('#lat-value').textContent()
  const long = await page.locator('#long-value').textContent()
  
  expect(lat).toBe('12.492348')
  expect(long).toBe('41.890221')
});