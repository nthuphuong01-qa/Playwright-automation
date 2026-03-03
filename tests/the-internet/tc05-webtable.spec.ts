import { test, expect } from '@playwright/test';

  test('largest due in table 1 belongs to Doe Jacson', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
    const rows = page.locator('#table1 tbody tr');
    let maxDue = -Infinity;
    let maxPerson = '';
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const cols = rows.nth(i).locator('td');
      const last = (await cols.nth(0).textContent())?.trim() ?? '';
      const first = (await cols.nth(1).textContent())?.trim() ?? '';
      const dueText = (await cols.nth(3).textContent())?.trim() ?? '$0';
      const due = parseFloat(dueText.replace('$', ''));
      if (due > maxDue) {
        maxDue = due;
        maxPerson = `${last} ${first}`;
      }
    }

    expect(maxPerson).toBe('Doe Jacson');
  });
