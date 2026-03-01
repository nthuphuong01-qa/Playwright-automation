```bash
# Run all tests (headless by default)
npx playwright test

# Run with browser UI visible
npx playwright test --headed

# Run a specific file
npx playwright test tests/login.spec.ts

# Run tests matching a name
npx playwright test --grep "login"

# Run in a specific browser
npx playwright test --project=chromium

# Run in interactive UI mode (great for debugging)
npx playwright test --ui

# get report after running
npx playwright show-report

# Debug a specific test (step through with DevTools)
npx playwright test --debug
```