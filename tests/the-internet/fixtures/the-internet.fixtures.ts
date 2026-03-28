import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CheckboxesPage } from '../pages/checkboxes.page';
import { TablePage } from '../pages/table.page';
import { DropdownPage } from '../pages/dropdown.page';
import { DropdownMultiplePage } from '../pages/dropdown-multiple.page';
import { HyperlinkPage } from '../pages/hyperlink.page';


type TheInternetFixtures = {
    loginPage: LoginPage,
    checkboxesPage: CheckboxesPage,
    tablePage: TablePage,
    dropdownPage: DropdownPage,
    dropdownMultiplePage: DropdownMultiplePage
    hyperlinkPage: HyperlinkPage
}

export const test = base.extend<TheInternetFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        // FIX: Always await use()
        await use(loginPage);
    },

    checkboxesPage: async ({ page }, use) => {
        const checkboxesPage = new CheckboxesPage(page);
        await use(checkboxesPage);
    },

    tablePage: async ({ page }, use) => {
        const tablePage = new TablePage(page);
        await use(tablePage);
    },

    dropdownPage: async ({ page }, use) => {
        const dropdownPage = new DropdownPage(page);
        await use(dropdownPage);
    },

    dropdownMultiplePage: async ({ page }, use) => {
        const dropdownMultiplePage = new DropdownMultiplePage(page);
        await use(dropdownMultiplePage);
    },
    hyperlinkPage: async ({ page }, use) => {
        const hyperlinkPage = new HyperlinkPage(page);
        await use(hyperlinkPage);
    }
});

export { expect } from '@playwright/test';