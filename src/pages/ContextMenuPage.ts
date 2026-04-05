import { Page, expect } from '@playwright/test';

export class ContextMenuPage {
  readonly page: Page;
  readonly hotSpot = '#hot-spot';
  readonly pageTitle = 'h3:has-text("Context Menu")';

  constructor(page: Page) {
    this.page = page;
  }

  // Navigation
  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/context_menu');
    await this.waitForPageLoad();
  }

  // Page element checks
  async waitForPageLoad() {
    await this.page.locator(this.pageTitle).waitFor({ state: 'visible' });
  }

  async isHotSpotVisible() {
    return await this.page.locator(this.hotSpot).isVisible();
  }

  // Context menu interactions
  async rightClickHotSpot() {
    await this.page.locator(this.hotSpot).click({ button: 'right' });
  }

  // Dialog/Alert handling
  async handleContextMenuAlert(): Promise<string> {
    let capturedMessage = '';

    // Set up dialog listener
    this.page.once('dialog', async (dialog) => {
      // Access the message property (it's a getter, so accessing it will call it)
      capturedMessage = (dialog.message as any)();
      await dialog.accept();
    });

    // Trigger the right-click
    await this.rightClickHotSpot();
    
    // Wait a moment for the dialog to be processed
    await this.page.waitForTimeout(100);

    return capturedMessage;
  }

  // Assertions
  async expectHotSpotVisible() {
    await expect(this.page.locator(this.hotSpot)).toBeVisible();
  }

  async expectAlertMessage(expectedMessage: string, actualMessage: string) {
    expect(actualMessage).toBe(expectedMessage);
  }
}
