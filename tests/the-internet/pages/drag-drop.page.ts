import { Page,Locator } from "@playwright/test";
import { Page, Locator } from "@playwright/test";

export class DragDropPage {
    readonly page: Page;
    readonly source: Locator;
    readonly target: Locator;

    constructor(page: Page) {
        this.page = page;
        this.source = page.locator("#source");
        this.target = page.locator("#target");
    }

    async dragAndDrop() {
        await this.source.waitFor({ state: "visible" });
        await this.target.waitFor({ state: "visible" });
        await this.source.dragTo(this.target);
    }

    async getSourceText(): Promise<string> {
        return (await this.source.textContent()) ?? "";
    }

    async getTargetText(): Promise<string> {
        return (await this.target.textContent()) ?? "";
    }
}

