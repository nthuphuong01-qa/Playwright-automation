---
name: gen-automation-test
description: >
  Generate Playwright test automation from website exploration. Use this whenever the user wants to test a website, 
  explore a web page and create test cases from it, or convert user workflows into automated Playwright tests. 
  Triggers when users mention exploring a site to write tests, testing a specific URL, automating web interactions, 
  or generating test coverage for a web application. Generates test files (.spec.ts), page objects (.page.ts), 
  test plans, test reports, and screenshots documenting the exploration and test scenarios.
---

# Generate Automation Tests with Playwright-CLI

Use this skill to explore websites interactively and generate comprehensive Playwright test cases, test plans, and execution reports automatically.

## Complete Workflow (9 Steps)

### Step 1: Create Test Plan Document

Generate comprehensive test plan documentation:

- **Test Plan Structure**:
  - Test Objective
  - Scope (In/Out of scope)
  - Test Environment
  - Test Data Requirements
  - Test Cases Summary
  - Entry/Exit Criteria
  - Risks and Assumptions
- **Test Case Details**:
  - Test Case ID
  - Test Scenario
  - Test Steps
  - Expected Results
  - Actual Results (initially blank)
  - Pass/Fail Status
  - Comments/Notes
- **Coverage Matrix**: Map requirements to test cases
  **File location:** `docs/test-plans/[feature]-test-plan.md`
  **Example structure:**

```markdown
# Test Plan: [Feature Name]

## Test Objective

Verify that [feature] works correctly under various conditions.

## Scope

**In Scope:**

- [List what's being tested]

**Out of Scope:**

- [List what's not being tested]

## Test Cases

| TC ID | Scenario   | Steps     | Expected Result | Status  |
| ----- | ---------- | --------- | --------------- | ------- |
| TC001 | [Scenario] | 1. [Step] | [Expected]      | Not Run |

## Entry Criteria

- Code is deployed to test environment
- Test data is prepared
- Test environment is stable

## Exit Criteria

- All critical test cases pass
- No open critical defects
- Test coverage meets requirements
```

### Step 2: Manual Test Case Documentation

Create a test plan documenting the manual test cases BEFORE generating code:

- **Test Name**: Descriptive name of what the test validates
- **URL**: Target page URL
- **Preconditions**: Initial state required
- **Steps**: Detailed user interaction steps
- **Expected Result**: What should happen after each interaction
- **Test Type**: Happy path / Edge case / Error scenario
  **Example:**

```
Test: Verify Checkbox Toggle
URL: https://the-internet.herokuapp.com/checkboxes
Preconditions: Page loaded, checkboxes in default state
Steps:
  1. Navigate to checkboxes page
  2. Check first checkbox
  3. Verify first checkbox is checked
  4. Check second checkbox
  5. Verify second checkbox is checked
Expected Result: Both checkboxes are in checked state
```

### Step 3: Create Test Spec File (tests/\*.spec.ts)

Generate initial test file with direct Playwright assertions:

- Import `@playwright/test`
- Navigate to URL in test
- Perform user interactions
- Add assertions for each action
- Use accessibility roles (`getByRole`) for element selection
  **File location:** `tests/[feature].spec.ts`
  **Example:**

```typescript
import { test, expect } from "@playwright/test";
test("Checkboxes", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/checkboxes");
  await page.getByRole("checkbox").first().check();
  await expect(page.getByRole("checkbox").first()).toBeChecked();
  await page.getByRole("checkbox").nth(1).check();
  await expect(page.getByRole("checkbox").nth(1)).toBeChecked();
});
```

### Step 4: Create Page Object File (tests/pages/\*.page.ts)

Extract page-specific logic into reusable page object:

- Define page class with constructor taking `Page` instance
- Create `goto()` method for navigation
- Create action methods for user interactions (e.g., `checkFirstCheckbox()`)
- Create verification methods that return state (e.g., `isFirstCheckboxChecked()`)
- Use `getByRole()` for accessible element selection
  **File location:** `tests/pages/[PageName].page.ts`
  **Example:**

```typescript
import { expect, type Locator, type Page } from "@playwright/test";
export class CheckboxesPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto("https://the-internet.herokuapp.com/checkboxes");
  }
  async checkFirstCheckbox() {
    await this.page.getByRole("checkbox").first().check();
  }
  async checkSecondCheckbox() {
    await this.page.getByRole("checkbox").nth(1).check();
  }
  async isFirstCheckboxChecked() {
    return await this.page.getByRole("checkbox").first().isChecked();
  }
  async isSecondCheckboxChecked() {
    return await this.page.getByRole("checkbox").nth(1).isChecked();
  }
}
```

### Step 5: Create Fixture File (tests/fixtures/the-internet.fixture.ts)

Create custom test fixture to inject page objects:

- Import `test as base` from `@playwright/test`
- Import all page object classes
- Define fixture type with all page objects
- Extend base test with custom fixtures
- Each fixture initializes page object and provides it to tests
  **File location:** `tests/fixtures/the-internet.fixture.ts`
  **Example:**

```typescript
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { CheckboxesPage } from "../pages/checkboxes.page";
import { TablePage } from "../pages/table.page";
import { ContextClickPage } from "../pages/contextClick.page";
import { DragDropPage } from "../pages/dragDrop.page";
import { DropdownPage } from "../pages/dropdown.page";
type TheInternetFixtures = {
  loginPage: LoginPage;
  checkboxesPage: CheckboxesPage;
  tablePage: TablePage;
  dropdownPage: DropdownPage;
  dragDropPage: DragDropPage;
  contextClickPage: ContextClickPage;
};
export const test = base.extend<TheInternetFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
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
  contextClickPage: async ({ page }, use) => {
    const contextClickPage = new ContextClickPage(page);
    await use(contextClickPage);
  },
  dragDropPage: async ({ page }, use) => {
    const dragDropPage = new DragDropPage(page);
    await use(dragDropPage);
  },
  dropdownPage: async ({ page }, use) => {
    const dropdownPage = new DropdownPage(page);
    await use(dropdownPage);
  },
});
export { expect } from "@playwright/test";
```

### Step 6: Update Test Spec to Use Fixtures

Refactor test file to use custom fixtures instead of direct page manipulation:

- DO NOT create a new file, update existing `tests/[feature].spec.ts` created in Step 2
- Import `test` and `expect` from fixture file
- Use fixture-injected page objects as test parameters
- Replace direct page interactions with page object methods
- Tests become more readable and maintainable
  **Updated example:**

```typescript
import { test, expect } from "./fixtures/the-internet.fixture";
test("verify able to check the checkbox", async ({ checkboxesPage }) => {
  await checkboxesPage.goto();
  await checkboxesPage.checkFirstCheckbox();
  await checkboxesPage.checkSecondCheckbox();
  expect(await checkboxesPage.isFirstCheckboxChecked()).toBe(true);
  expect(await checkboxesPage.isSecondCheckboxChecked()).toBe(true);
});
```

### Step 7: Run and Fix Until Tests Pass

Execute tests and fix any issues:

- Run: `npx playwright test tests/[feature].spec.ts`
- Review test output and error messages
- Adjust selectors if elements not found
- Fix timing issues with waits
- Update page object methods if needed
- Verify all assertions pass
- Check test execution in headed mode: `npx playwright test --headed`
  **Common fixes:**
- Element not found: Update selector in page object
- Timeout: Add explicit waits or adjust timeout
- State assertion fails: Verify initial page state before interactions
- Flaky tests: Add wait conditions or explicit waits

### Step 8: Generate Test Report

Create automated test execution reports:

- **HTML Report**: `npx playwright show-report`
- **JSON Report**: Configure in `playwright.config.ts`
- **JUnit XML**: For CI/CD integration
- **Custom Report**: Include screenshots, videos, traces
- **Coverage Report**: If using coverage tools
  **Configuration in playwright.config.ts:**

```typescript
export default defineConfig({
  // ... other config
  reporter: [
    ["html"],
    ["json", { outputFile: "test-results/results.json" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
  ],
  use: {
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
});
```

### Step 9: Test Execution and Analysis

Execute tests and analyze results:

- **Run Tests**: `npx playwright test`
- **Run Specific Test**: `npx playwright test tests/[feature].spec.ts`
- **Run with Options**:
  - `--headed`: Run in browser (visible)
  - `--debug`: Debug mode with Playwright Inspector
  - `--grep "pattern"`: Run tests matching pattern
  - `--project chromium`: Run only in specific browser
- **Analyze Results**:
  - Review HTML report for visual results
  - Check JSON/XML reports for CI integration
  - Examine screenshots/videos for failed tests
  - Review traces for debugging
- **Performance Analysis**:
  - Test execution time
  - Memory usage
  - Browser performance metrics
- **Defect Reporting**:
  - Document failed test cases
  - Attach screenshots/videos
  - Provide steps to reproduce
  - Update test plan with actual results

## Best Practices

1. **Use accessibility roles** when clicking/filling/selecting (e.g., `getByRole('button', { name: 'Submit' })`)
   - Prefer `getByRole()` → `getByLabel()` → `getByPlaceholder()` → `getByText()` → `locator()`
2. **Page Object Pattern**
   - Keep page objects focused on single page
   - Methods return page state or void
   - No assertions in page objects (only in tests)
3. **Fixture Pattern**
   - Centralize page object initialization
   - DRY principle - avoid duplicating page instantiation
   - Easy to add new page objects
4. **Test Naming**
   - Describe user intent: `'verify able to check the checkbox'`
   - Avoid implementation details: `'should click checkbox element'`
5. **Test Structure**
   - Arrange (setup/navigate)
   - Act (perform user interaction)
   - Assert (verify expected outcome)
6. **Error Handling**
   - Document flaky or skipped tests
   - Add retry logic only for legitimate timing issues
   - Use explicit waits sparingly

## Commands Reference

### Test Execution

```bash
npx playwright test tests/[feature].spec.ts                    # Run specific test
npx playwright test --headed                                   # Run in headed mode (see browser)
npx playwright test --debug                                    # Debug mode with Inspector
npx playwright test --grep "test name pattern"                # Run tests matching pattern
```

### Element Inspection (using playwright-cli)

```bash
playwright-cli open https://example.com                       # Start exploration
playwright-cli snapshot                                       # Get element references
playwright-cli eval "document.title"                          # Run JavaScript
playwright-cli screenshot                                     # Take screenshot
playwright-cli close                                          # Close browser
```

## File Structure

```
tests/
├── [feature].spec.ts              # Main test file using fixtures
├── pages/
│   ├── [PageName].page.ts         # Page object for single page
│   └── [AnotherPage].page.ts
└── fixtures/
    └── the-internet.fixture.ts    # Custom test fixture with page objects
```

## Troubleshooting

**Test fails with "element not found"**

- Verify URL is correct
- Check element selector in page object
- Run in debug mode: `npx playwright test --debug`
- Use snapshot to verify element references
  **Test times out**
- Increase timeout: `test.setTimeout(60000)` (60 seconds)
- Verify page navigation completed
- Add explicit wait if needed: `await page.waitForLoadState()`
  **Flaky tests**
- Add explicit waits for state changes
- Avoid short sleep waits (`sleep(1000)`)
- Verify test doesn't have race conditions

## References

- Locator: https://playwright.dev/docs/locators
- Page Object Model: https://playwright.dev/docs/pom
- Fixtures: https://playwright.dev/docs/fixtures
- Test Reporting: https://playwright.dev/docs/test-reporters
