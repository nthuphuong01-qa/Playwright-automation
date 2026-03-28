import { expect, type Locator, type Page } from '@playwright/test';
export class DropdownPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async goto() { 
        await this.page.goto('https://the-internet.herokuapp.com/dropdown');
    }
    async selectOption(optionValue: string) {
        await this.page.locator('#dropdown').selectOption(optionValue);
        await this.page.locator('html').click();
    }
    async getSelectedOptionValue() {
        return await this.page.locator('#dropdown').inputValue();
    }
    async getSelectedOptionText() {
        return await this.page.locator('#dropdown option:checked').innerText();
    };
}