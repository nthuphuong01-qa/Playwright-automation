import { expect, type Locator, type Page } from '@playwright/test';
export class DropdownMultiplePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('https://output.jsbin.com/osebed/2');
    }
    async selectOption(optionValues: string[]) {
        await this.page.locator('#fruits').selectOption(optionValues);
    }
    async getSelectedOptionText() {
        return await this.page.locator('#fruits > option:checked').allInnerTexts();
    }
        async getSelectedOptionValue() {
        return await this.page.locator('#fruits').inputValue();
    }
    
}
