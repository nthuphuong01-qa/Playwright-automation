/*import { test, expect } from '@playwright/test';
test('create new to do', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/react/dist/');
   
    await page.locator('.new-todo').fill('Buy milk');
    await page.locator('.new-todo').press('Enter');
    
    const todoText = await page.locator('.todo-list li .view').textContent();
    await expect(todoText).toBe('Buy milk');
});
*/
import  { test, expect } from './fixtures/todo.fixtures';
test('create new to do', async ({ addNewToDoPage }) => {
    await addNewToDoPage.goto();
    await addNewToDoPage.addTodo('Buy milk');
    const todoText = await addNewToDoPage.todoItems.first().textContent();
    await expect(todoText).toBe('Buy milk');
});