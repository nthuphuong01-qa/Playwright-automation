import { Page,Locator } from "@playwright/test";
export class HyperlinkPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async goToHyperlinkPage() {
        await this.page.goto('https://the-internet.herokuapp.com/status_codes');
    }
    async clickLinkByName(name: string) {
        await this.page.getByRole('link', { name }).click();
    }
    async clickHereLink() {
        await this.page.getByRole('link', { name: 'here' }).click();
    }
    async getStatusCodeText() {
        return await this.page.getByText(/This page returned a \d+/).textContent();
    }
    async getCurrentUrl() {
        return this.page.url();
    }
    async verifyStatusCode(code: string) {
    await this.clickLinkByName(code);
    const text = await this.getStatusCodeText();
    return text;
}
}