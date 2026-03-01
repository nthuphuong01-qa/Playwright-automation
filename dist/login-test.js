"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
const fs = require("fs");
const path = require("path");
class LoginTestScript {
    constructor() {
        this.results = [];
        this.screenshotDir = './exported-screenshots';
        // Create screenshot directory if it doesn't exist
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
        }
    }
    /**
     * Run login test with all steps
     */
    async runLoginTest() {
        const browsers = [
            { name: 'chromium', launcher: playwright_1.chromium },
            { name: 'firefox', launcher: playwright_1.firefox },
            { name: 'webkit', launcher: playwright_1.webkit },
        ];
        for (const browserConfig of browsers) {
            const result = await this.testWithBrowser(browserConfig.name, browserConfig.launcher);
            this.results.push(result);
        }
        return this.results;
    }
    /**
     * Test with specific browser
     */
    async testWithBrowser(browserName, launcher) {
        const startTime = Date.now();
        const screenshots = [];
        let browser = null;
        let page = null;
        try {
            console.log(`\n🌐 Testing with ${browserName}...`);
            // Step 1: Open browser
            browser = await launcher.launch();
            if (!browser)
                throw new Error('Failed to launch browser');
            page = await browser.newPage();
            if (!page)
                throw new Error('Failed to create page');
            console.log(`✓ Step 1: Open browser [${browserName}]`);
            // Step 2: Navigate to login page
            await page.goto('https://the-internet.herokuapp.com/login');
            let screenshotPath = path.join(this.screenshotDir, `${browserName}-step1-login-page.png`);
            await page.screenshot({ path: screenshotPath });
            screenshots.push(screenshotPath);
            console.log(`✓ Step 2: Navigate to https://the-internet.herokuapp.com/login`);
            console.log(`  📸 Screenshot: ${screenshotPath}`);
            // Step 3: Fill in username
            await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
            screenshotPath = path.join(this.screenshotDir, `${browserName}-step2-username-filled.png`);
            await page.screenshot({ path: screenshotPath });
            screenshots.push(screenshotPath);
            console.log(`✓ Step 3: Fill in username with 'tomsmith'`);
            console.log(`  📸 Screenshot: ${screenshotPath}`);
            // Step 4: Fill in password
            await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
            screenshotPath = path.join(this.screenshotDir, `${browserName}-step3-password-filled.png`);
            await page.screenshot({ path: screenshotPath });
            screenshots.push(screenshotPath);
            console.log(`✓ Step 4: Fill in password with 'SuperSecretPassword!'`);
            console.log(`  📸 Screenshot: ${screenshotPath}`);
            // Step 5: Click login button
            await page.getByRole('button', { name: ' Login' }).click();
            screenshotPath = path.join(this.screenshotDir, `${browserName}-step4-login-clicked.png`);
            await page.screenshot({ path: screenshotPath });
            screenshots.push(screenshotPath);
            console.log(`✓ Step 5: Click Login button`);
            console.log(`  📸 Screenshot: ${screenshotPath}`);
            // Step 6: Verify success message
            await page.waitForSelector('text=You logged into a secure area');
            const successMessage = await page.getByText('You logged into a secure area').isVisible();
            const welcomeText = await page.locator('h4').textContent();
            screenshotPath = path.join(this.screenshotDir, `${browserName}-step5-success.png`);
            await page.screenshot({ path: screenshotPath });
            screenshots.push(screenshotPath);
            console.log(`✓ Step 6: Verify success message`);
            console.log(`  ✅ Success message visible: ${successMessage}`);
            console.log(`  ✅ Welcome message: "${welcomeText}"`);
            console.log(`  📸 Screenshot: ${screenshotPath}`);
            const duration = Date.now() - startTime;
            return {
                status: 'PASS',
                browser: browserName,
                message: `Login test passed on ${browserName}`,
                screenshots,
                duration,
            };
        }
        catch (error) {
            const duration = Date.now() - startTime;
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`❌ Test failed on ${browserName}: ${errorMessage}`);
            return {
                status: 'FAIL',
                browser: browserName,
                message: `Login test failed on ${browserName}`,
                screenshots,
                duration,
                error: errorMessage,
            };
        }
        finally {
            if (page)
                await page.close();
            if (browser)
                await browser.close();
        }
    }
    /**
     * Print test summary
     */
    printSummary() {
        console.log('\n' + '='.repeat(70));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(70));
        const passed = this.results.filter((r) => r.status === 'PASS').length;
        const failed = this.results.filter((r) => r.status === 'FAIL').length;
        const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0);
        console.log(`\n✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`📝 Total Tests: ${this.results.length}`);
        console.log(`⏱️  Total Duration: ${(totalDuration / 1000).toFixed(2)}s`);
        console.log('\n' + '-'.repeat(70));
        console.log('DETAILED RESULTS:');
        console.log('-'.repeat(70));
        this.results.forEach((result, index) => {
            console.log(`\n${index + 1}. [${result.status}] ${result.browser.toUpperCase()}`);
            console.log(`   Message: ${result.message}`);
            console.log(`   Duration: ${(result.duration / 1000).toFixed(2)}s`);
            console.log(`   Screenshots: ${result.screenshots.length}`);
            if (result.error) {
                console.log(`   Error: ${result.error}`);
            }
            result.screenshots.forEach((screenshot) => {
                console.log(`   - ${screenshot}`);
            });
        });
        console.log('\n' + '='.repeat(70));
        console.log(`OVERALL RESULT: ${failed === 0 ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
        console.log('='.repeat(70) + '\n');
    }
    /**
     * Export results to JSON
     */
    exportToJSON(filename = 'test-results.json') {
        const jsonResults = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTests: this.results.length,
                passed: this.results.filter((r) => r.status === 'PASS').length,
                failed: this.results.filter((r) => r.status === 'FAIL').length,
                totalDuration: this.results.reduce((sum, r) => sum + r.duration, 0),
            },
            results: this.results,
        };
        fs.writeFileSync(filename, JSON.stringify(jsonResults, null, 2));
        console.log(`📄 Results exported to: ${filename}`);
    }
}
/**
 * Main execution
 */
async function main() {
    console.log('🚀 Starting Login Test Script');
    console.log('Test URL: https://the-internet.herokuapp.com/login');
    console.log('Username: tomsmith');
    console.log('Password: SuperSecretPassword!');
    const tester = new LoginTestScript();
    try {
        await tester.runLoginTest();
        tester.printSummary();
        tester.exportToJSON('login-test-results.json');
    }
    catch (error) {
        console.error('Fatal error:', error);
        process.exit(1);
    }
}
// Run if this is the main module
main().catch(console.error);
