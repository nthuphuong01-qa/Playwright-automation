import { test as base } from '@playwright/test';

import { AddNewToDoPage } from '../pages/add-new-to-do.page';
import { ClearToDoPage } from '../pages/clear-todo.page';
import { MarkAsCompletePage } from '../pages/mark-as-complete.page';
import { UpdateToDoNamePage } from '../pages/update-todo-name.page';

// 1. Khai báo kiểu dữ liệu cho các Page Object
type MyFixtures = {
    addNewToDoPage: AddNewToDoPage;
    clearToDoPage: ClearToDoPage;
    markAsCompletePage: MarkAsCompletePage;
    updateToDoNamePage: UpdateToDoNamePage; 
};

// 2. Mở rộng (extend) fixture gốc của Playwright
export const test = base.extend<MyFixtures>({
    
    addNewToDoPage: async ({ page }, use) => {
        await use(new AddNewToDoPage(page));
    },

    clearToDoPage: async ({ page }, use) => {
        await use(new ClearToDoPage(page));
    },

    markAsCompletePage: async ({ page }, use) => {
        const markCompletePage = new MarkAsCompletePage(page);
        await use(markCompletePage);
    },

    updateToDoNamePage: async ({ page }, use) => {
    const updatePage = new UpdateToDoNamePage(page); 
    await use(updatePage);
    }
});

// Xuất bản hàm expect để dùng chung trong các file test
export { expect } from '@playwright/test';