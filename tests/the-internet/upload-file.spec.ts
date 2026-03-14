import {test, expect} from '@playwright/test';

test('upload a file bb', async ({page}) => {
    await page.goto('/upload');
    
    const filePath = 'tests/resource/upload/bb.txt';
    await page.setInputFiles('input[type="file"]', filePath);
    
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.locator('#uploaded-files')).toContainText('bb.txt');
});
test('upload another file', async ({page}) => {
    await page.goto('/upload');
    
    const filePath = 'tests/resource/upload/aa.txt';
    await page.setInputFiles('input[type="file"]', filePath);
    
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.locator('#uploaded-files')).toContainText('aa.txt');
});
// this web not allow to upload multiple file
