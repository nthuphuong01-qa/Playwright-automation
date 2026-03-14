import { test, expect } from '@playwright/test';

  test('Cach1: Codegen Find largest due in table 1 belongs to Doe Jacson', async ({ page }) => {
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
test('Cach2: Verify fullname of max due person using locator', async ({page}) =>{
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
test('Table 1: verify John Smith and Tim Conway have the minimum due value', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/tables');

  // Get all "Due" values from Table 1 (4th column)
  const dueCells = page.locator('#table1 tbody tr td:nth-child(4)');
  const allDueValuesText = await dueCells.allTextContents();
  const dueValues = allDueValuesText.map(text =>
    parseFloat(text.replace('$', ''))
  );

  // Find the minimum due value
  const minDue = Math.min(...dueValues);
  console.log(`The minimum due value in the table is: $${minDue.toFixed(2)}`);

  const peopleWithMinDue = [];

  // Iterate through the due values to find people with the minimum due
  for (let i = 0; i < dueValues.length; i++) {
    if (dueValues[i] === minDue) {
      // Playwright uses 1-based indexing for nth-child
      const rowSelector = `#table1 tbody tr:nth-child(${i + 1})`;
      const firstName = await page.locator(`${rowSelector} td:nth-child(2)`).textContent();
      const lastName = await page.locator(`${rowSelector} td:nth-child(1)`).textContent();
      peopleWithMinDue.push(`${firstName?.trim()} ${lastName?.trim()}`);
    }
  }

  // Sort the array to ensure consistent order for comparison
  const sortedPeopleWithMinDue = peopleWithMinDue.sort();
  const expectedPeople = ['John Smith', 'Tim Conway'].sort();

  console.log('People found with minimum due:', sortedPeopleWithMinDue);
  console.log('Expected people with minimum due:', expectedPeople);

  // Assert that the found people match the expected list
  expect(sortedPeopleWithMinDue).toEqual(expectedPeople);
});