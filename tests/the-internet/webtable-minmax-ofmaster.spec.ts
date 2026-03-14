import {test,expect} from '@playwright/test'

test('TC05: verify fullname of max due person', async ({page}) =>{

  await page.goto('https://the-internet.herokuapp.com/tables');
    const table = await page.locator('#table1');
    const rows = await table.locator('tbody tr');

    const tableData = await rows.evaluateAll((rows) => {
        return rows.map((row) => {
            const cells = row.querySelectorAll('td');
            return {
                firstName: cells[1].innerText,
                lastName: cells[0].innerText,       
                due: cells[3].innerText.replace('$', ''),
            };
        });
    });
    console.log(tableData);
    // find the max due value
    tableData.sort((a, b) => parseFloat(b.due) - parseFloat(a.due));
    const maxDueValue = tableData[0].due;
    const maxDuePerson = tableData.find(person => person.due === maxDueValue);
    const firstName = maxDuePerson?.firstName;
    const lastName = maxDuePerson?.lastName;    
    expect(`${firstName} ${lastName}`).toBe('Jason Doe');
});

test('TC05: verify min due person full name', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
    const table = await page.locator('#table1');
    const rows = await table.locator('tbody tr');

    const tableData = await rows.evaluateAll((rows) => {
        return rows.map((row) => {
            const cells = row.querySelectorAll('td');
            return {
                firstName: cells[1].innerText,
                lastName: cells[0].innerText,       
                due: cells[3].innerText.replace('$', ''),
            };
        });
    });
    console.log(tableData);
    // find the min due value
    tableData.sort((a, b) => parseFloat(a.due) - parseFloat(b.due));
    const minDueValue = tableData[0].due;
    const minDuePersons = tableData.filter(person => person.due === minDueValue);
    const fullNames = minDuePersons.map(person => `${person.firstName} ${person.lastName}`);
    expect(fullNames).toEqual([ 'John Smith','Tim Conway']);
   })
