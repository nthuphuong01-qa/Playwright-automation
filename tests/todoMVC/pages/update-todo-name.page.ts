import { Page, Locator } from "@playwright/test";

export class UpdateToDoNamePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto('https://todomvc.com/examples/react/dist/');
    }

    // Trả về Locator để file Test tự dùng expect
    get todoLabel(): Locator {
        return this.page.getByTestId('todo-item-label');
    }

    async addToDo(name: string) {
        const input = this.page.getByTestId('text-input');
        await input.fill(name);
        await input.press('Enter');
    }

    async updateToDo(newName: string) {
        await this.todoLabel.dblclick();
        const editInput = this.page.getByTestId('todo-item').getByTestId('text-input');
        await editInput.fill(newName);
        await editInput.press('Enter');
    }
}