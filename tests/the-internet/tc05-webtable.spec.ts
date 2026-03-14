import { test, expect } from '@playwright/test';

  test('Test1.1 Codegen Find largest due in table 1 belongs to Doe Jacson', async ({ page }) => {
    //cach 1: dung codegen
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
 //cach 2: Dung locator
 //thuat toan giai:
 //1. get table content => array[][]
 //2. get the index of max due
 //3. get the fullname of max due person
test('Test1.2 Verify fullname of max due person using locator', async ({page}) =>{
  await page.goto('https://the-internet.herokuapp.com/tables');
    // const tableContents =  await page.locator("#table1 tbody tr td").allTextContents();
    // //print table content
    // console.log(tableContents);

    const dueAmounts = await page.locator("#table1 tbody tr td:nth-child(4)").allTextContents();
    // console.log(dueAmounts);
    //Give array  [ '$50.00', '$51.00', '$100.00', '$50.00' ]  find the index of item has max value?
    const maxDueValue = Math.max(...dueAmounts.map(amount => parseFloat(amount.replace('$', ''))));
    const maxDueIndex = dueAmounts.indexOf('$' + maxDueValue.toFixed(2));
    // console.log(maxDueIndex);
    const firstName = await page.locator(`#table1 tbody tr:nth-child(${maxDueIndex + 1}) td:nth-child(2)`).textContent();
    const lastName = await page.locator(`#table1 tbody tr:nth-child(${maxDueIndex + 1}) td:nth-child(1)`).textContent();
    // console.log(`Full name of person with max due: ${firstName} ${lastName}`);
    expect(`${firstName} ${lastName}`).toBe('Jason Doe');

});

//homewrofk: //verify fullname of min due person + verify max due when having more than 1 value
test('Validate smallest due person', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/tables');
  
    const rows = await page.locator('#table1 tbody tr').all();
  
    const tableData: string[][] = [];
   
    // build 2D array
    for (const row of rows) {
      const cells = await row.locator('td').allTextContents();
      tableData.push(cells);
    }  
    // lấy danh sách due
    const dues = tableData.map(row => Number(row[3].replace('$', '')));
  
    // tìm giá trị nhỏ nhất
    const minDue = Math.min(...dues);
  
    // lấy tất cả person có due = min
    const personsWithMinDue = tableData
      .filter(row => Number(row[3].replace('$', '')) === minDue)
      .map(row => `${row[1]} ${row[0]}`);
  
    console.log(personsWithMinDue);
  
    // validate 2 người có due nhỏ nhất
    expect(personsWithMinDue).toStrictEqual(['John Smith','Tim Conway']);
    // expect(personsWithMinDue).toContain('Tim Conway');
});
