import { test, expect } from '@playwright/test';

test('Verify that hyperlink function work well', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/status_codes');
 //cach 1: dung getByRole (generate from codegen)
  await page.getByRole('link', { name: '200' }).click();
  await expect(page.getByText('This page returned a 200')).toBeVisible();

  await page.getByRole('link', { name: 'here' }).click();
  await page.getByRole('link', { name: '301' }).click();
  await expect(page.getByText('This page returned a 301')).toBeVisible();

  await page.getByRole('link', { name: 'here' }).click();
  await page.getByRole('link', { name: '404' }).click();
  await expect(page.getByText('This page returned a 404')).toBeVisible();

  await page.getByRole('link', { name: 'here' }).click();
  await page.getByRole('link', { name: '500' }).click();
  await expect(page.getByText('This page returned a 500')).toBeVisible();

  await page.getByRole('link', { name: 'here' }).click();


});
//cach 2: dung locator
test('Verify that hyperlink function work well using locator', async ({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/status_codes')

    await page.getByRole('link').filter({ hasText: '200' }).click();
    
    // await page.getByRole('link', { name: '200' }).click();
    expect(page.url()).toContain('status_codes/200');
    await page.getByRole('link', { name: 'here' }).click();

    await page.getByRole('link', { name: '301' }).click();
    expect(page.url()).toContain('status_codes/301');
    await page.getByRole('link', { name: 'here' }).click();

    await page.getByRole('link', { name: '404' }).click();
    expect(page.url()).toContain('status_codes/404');
    await page.getByRole('link', { name: 'here' }).click();

    await page.getByRole('link', { name: '500' }).click();
    expect(page.url()).toContain('status_codes/500');
    await page.getByRole('link', { name: 'here' }).click();
});;
