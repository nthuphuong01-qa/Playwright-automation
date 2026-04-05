import { test, expect } from './fixtures';

test.describe('Context Menu Tests', () => {
  test('TC01: Should handle right-click context menu and verify alert', async ({ contextMenuPage }) => {
    // Verify the hot-spot element is visible
    await contextMenuPage.expectHotSpotVisible();

    // Right-click on the hot-spot and handle the alert
    const alertMessage = await contextMenuPage.handleContextMenuAlert();

    // Verify the alert message
    contextMenuPage.expectAlertMessage('You selected a context menu', alertMessage);
  });

  test('TC02: Should display hot-spot element on page load', async ({ contextMenuPage }) => {
    // Verify the hot-spot element is visible after page load
    const isVisible = await contextMenuPage.isHotSpotVisible();
    expect(isVisible).toBe(true);
  });
});
