import { test, expect } from '@playwright/test';

test('Top-Down STUB: Login REAL -> Inventory STUB', async ({ page }) => {

  // Login จริง
  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');

  await Promise.all([
    page.waitForURL(/inventory\.html/),
    page.locator('#login-button').click(),
  ]);

  console.log('Current URL:', page.url());

  // Inventory Stub
  await page.setContent(`
    <!doctype html>
    <html lang="th">
      <head>
        <meta charset="utf-8">
        <title>Stub Inventory</title>
      </head>

      <body>

        <h1>Stub Inventory</h1>

        <div
          class="inventory_list"
          data-test="stub-inventory"
        >
          Fake Inventory from Stub
        </div>

        <div data-test="student-info">
          <p data-test="student-name">
            ชื่อ: วชิรวิชญ์ ทนันไชย 
          </p>
        </div>

      </body>
    </html>
  `);

  // ตรวจสอบ Inventory
  await expect(
    page.locator('[data-test="stub-inventory"]')
  ).toBeVisible();

  await expect(
    page.locator('[data-test="stub-inventory"]')
  ).toContainText('Fake Inventory from Stub');

  // ตรวจสอบชื่อและนามสกุล
  await expect(
    page.locator('[data-test="student-name"]')
  ).toBeVisible();

  await expect(
    page.locator('[data-test="student-name"]')
  ).toContainText('วชิรวิชญ์ ทนันไชย');
});