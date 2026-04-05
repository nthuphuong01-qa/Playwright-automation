import { test as base } from '@playwright/test';
import { ContextMenuPage } from '../src/pages/ContextMenuPage';

type ContextMenuFixtures = {
  contextMenuPage: ContextMenuPage;
};

export const test = base.extend<ContextMenuFixtures>({
  contextMenuPage: async ({ page }, use) => {
    const contextMenuPage = new ContextMenuPage(page);
    await contextMenuPage.goto();
    await use(contextMenuPage);
  },
});

export { expect } from '@playwright/test';
