/*import { test, expect } from '@playwright/test';

test('Mark task as complete', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('Buy Milk');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('homework');
  await page.getByTestId('text-input').press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'Buy Milk' }).getByTestId('todo-item-toggle').check();
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByTestId('todo-item-label')).toBeVisible();
  await page.locator('html').click();
});
*/
import { test, expect } from './fixtures/todo.fixtures';
test ('Mark task as complete', async ({ markAsCompletePage }) => {
    await markAsCompletePage.goTo();
    await markAsCompletePage.addToDo('Buy Milk');
    await markAsCompletePage.markComplete('Buy Milk');
    await markAsCompletePage.verifyIsCompleted('Buy Milk');
});

