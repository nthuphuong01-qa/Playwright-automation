import {test,expect} from '@playwright/test';

test('verify broken image', async ({ page }) => {
  await page.goto('/broken_images');

  const images = page.locator('img');
  const count = await images.count();

  let brokenCount = 0;

  for (let i = 0; i < count; i++) {
    const image = images.nth(i);

    const isBroken = await image.evaluate((img: HTMLImageElement) => {
      return img.naturalWidth === 0;
    });

    if (isBroken) {
      brokenCount++;
    }
  }

  console.log('Broken images:', brokenCount);

  // Expect đúng theo thực tế: có 2 ảnh bị broken
  expect(brokenCount).toBe(2);
});


test('verify hover reveals user info', async ({ page }) => {
  await page.goto('/hovers');

  const figures = page.locator('.figure');

  await expect(figures).toHaveCount(3);

  for (const figure of await figures.all()) {
    await figure.hover();
    await expect(figure.locator('.figcaption')).toBeVisible();
  }
});