/*import { test, expect } from '@playwright/test';

test('update todo name', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('buy milk');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('todo-item-label').dblclick();
  await page.getByTestId('todo-item').getByTestId('text-input').fill('buy milk update');
  await page.getByTestId('todo-item').getByTestId('text-input').press('Enter');
  await expect(page.getByTestId('todo-item-label')).toContainText('buy milk update');
});
*/
// LƯU Ý: Import từ file fixture của bạn
import { test, expect } from './fixtures/todo.fixtures';

test.describe('TC14: Page Object Model - Todo MVC', () => {

    test('Verify user able to update a todo name', async ({ updateToDoNamePage }) => {
        // 1. Đi tới trang web
        await updateToDoNamePage.goTo();

        // 2. Thêm mới một todo
        const oldName = 'buy milk';
        const newName = 'buy milk update';
        await updateToDoNamePage.addToDo(oldName);

        // 3. Thực hiện hành động Update (Action)
        await updateToDoNamePage.updateToDo(newName);

        // 4. KIỂM CHỨNG (Assertion) - Viết ở đây là chuẩn nhất
        // Chúng ta lấy locator todoLabel từ Page Object để check text
        await expect(updateToDoNamePage.todoLabel).toContainText(newName);
    });

});
