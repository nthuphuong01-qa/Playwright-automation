import { Page, Locator, expect } from "@playwright/test";

export class ClearToDoPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate
    async goTo() {
        await this.page.goto("https://todomvc.com/examples/react/dist/");
    }

    // Locators
    get todoInput(): Locator {
        return this.page.locator(".new-todo");
    }

    get todoItems(): Locator {
        return this.page.locator(".todo-list li");
    }

    // Add todo (có default value)
    async addToDo(todo: string = "Buy milk") {
        await this.todoInput.fill(todo);
        await this.todoInput.press("Enter");
    }

    // Delete todo theo text
    async deleteToDo(todo: string = "Buy milk") {
        const todoItem = this.page.locator(".todo-list li", {
            hasText: todo,
        });
        await todoItem.hover(); // cần để hiện nút delete
        await todoItem.locator("button.destroy").click();
    }

    // Verify todo tồn tại
    async verifyTodoExists(todo: string) {
        await expect(
            this.page.locator(".todo-list li", { hasText: todo })
        ).toHaveCount(1);
    }

    // Verify todo bị xoá
    async verifyTodoDeleted(todo: string) {
        await expect(
            this.page.locator(".todo-list li", { hasText: todo })
        ).toHaveCount(0);
    }
}