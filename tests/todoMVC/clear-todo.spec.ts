/*import { test, expect } from "@playwright/test";

test("Add 2 todos and delete 'Buy milk'", async ({ page }) => {
  // Step 1: Navigate
  await page.goto("https://todomvc.com/examples/react/dist/");

  const todoInput = page.locator(".new-todo");
  const todoItems = page.locator(".todo-list li");

  // Step 2: Add "Buy milk"
  await todoInput.fill("Buy milk");
  await todoInput.press("Enter");

  // Step 3: Add "learn english"
  await todoInput.fill("learn english");
  await todoInput.press("Enter");

  // Verify 2 todos added
  await expect(todoItems).toHaveCount(2);

  // Step 4: Find "Buy milk"
  const buyMilkItem = page.locator(".todo-list li", {
    hasText: "Buy milk",
  });

  // Hover để hiện nút delete
  await buyMilkItem.hover();

  // Click delete
  await buyMilkItem.locator("button.destroy").click();

  // Step 5: Verify "Buy milk" deleted
  await expect(page.locator(".todo-list li", { hasText: "Buy milk" }))
    .toHaveCount(0);

  // Verify còn lại "learn english"
  await expect(page.locator(".todo-list li", { hasText: "learn english" }))
    .toHaveCount(1);
});
*/
import { expect, test } from "./fixtures/todo.fixtures";
test ("Add 2 todos and delete 'Buy milk'", async ({ clearToDoPage }) => {
    await clearToDoPage.goTo();
    await clearToDoPage.addToDo("Buy milk");
    await clearToDoPage.addToDo("learn english");
    await clearToDoPage.verifyTodoExists("Buy milk");
    await clearToDoPage.verifyTodoExists("learn english");
    await clearToDoPage.deleteToDo("Buy milk");
    await clearToDoPage.verifyTodoDeleted("Buy milk");
    await clearToDoPage.verifyTodoExists("learn english");
});
