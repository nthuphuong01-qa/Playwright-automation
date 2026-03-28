import { Page, Locator, expect } from "@playwright/test";

export class MarkAsCompletePage {
    readonly page: Page;
    readonly todoItems: Locator;
    readonly todoInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.todoInput = page.getByPlaceholder('What needs to be done?');
        // Mỗi item trong danh sách Todo
        this.todoItems = page.getByTestId('todo-item');
    }

    async goTo() {
        await this.page.goto('https://todomvc.com/examples/react/dist/');
    }

    async addToDo(name: string) {
        await this.todoInput.fill(name);
        await this.todoInput.press('Enter');
    }

    async markComplete(todoName: string) {
        // Tìm đúng dòng chứa todo cần hoàn thành
        const todoItem = this.todoItems.filter({ hasText: todoName });
        // Click vào checkbox (toggle) của dòng đó
        await todoItem.getByRole('checkbox').check();
    }

    async verifyIsCompleted(todoName: string) {
        const todoItem = this.todoItems.filter({ hasText: todoName });
        // Kiểm tra xem phần tử đó có class 'completed' hay không
        await expect(todoItem).toHaveClass(/completed/);
        // Hoặc kiểm tra checkbox đã được check
        await expect(todoItem.getByRole('checkbox')).toBeChecked();
    }
}