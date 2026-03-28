import { expect, type Locator, type Page } from '@playwright/test';

export class AddNewToDoPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('https://todomvc.com/examples/react/dist/');
    }
    get todoInput(): Locator {
        return this.page.getByTestId('text-input');
    }
    get todoItems(): Locator {
        return this.page.getByTestId('todo-item');
    }
    async addTodo(todo: string) {
        await this.todoInput.fill(todo);
        await this.todoInput.press('Enter');
    }

}
    