---
name: gen-automation-test
description: "Generate automated test cases for web applications using Playwright. Use when you need to create, review, or debug test scripts for testing web functionality."
---

# Generate Automation Test

Your goal is to generate automated test cases for web applications using Playwright.

## Specific Instructions

1. **Manual Testcase**:
   - Gather requirements from the user about the web page to test
   - Create a manual test case documenting:
     - Test objectives and scope
     - Step-by-step user interactions
     - Expected results and assertions
     - Any preconditions or setup needed
   - Document locators and UI elements to be tested

2. **Create Testcase File (.spec.ts)**:
   - Create a new Playwright test file in `tests/` directory
   - Generate test cases based on manual test case
   - Use descriptive test names and comments
   - Set up proper imports and test structure

3. **Create Page Object**:
   - Design a Page Object Model (POM) for the tested page
   - Define page elements as properties (locators)
   - Create methods for user interactions
   - Create assertion methods for expected outcomes
   - Save in appropriate directory (e.g., `pages/` or `src/pages/`)

4. **Create Fixture**:
   - Create Playwright fixtures for reusable setup/teardown
   - Define page object instances if needed
   - Set up any common test data or configurations
   - Save fixtures file (e.g., `tests/fixtures.ts`)

5. **Update Testcase File (.spec.ts)**:
   - Refactor test file to use Page Object Model
   - Import and utilize fixtures
   - Replace hard-coded locators with page object methods
   - Clean up and optimize test code
   - Ensure tests are maintainable and scalable

6. **Run Tests Until Pass**:
   - Execute the test file
   - Identify and fix any failures
   - Debug failing assertions or locators
   - Re-run tests until all pass
   - Provide test execution report and summary

## Best Practices

- Use `page.getByRole()` for accessible locators when possible
- Avoid brittle selectors; prefer semantic HTML attributes
- Include setup and teardown where appropriate
- Keep tests focused on single user interactions
- Document complex test logic with comments
- Use meaningful variable and test names
