import { test, expect, Page } from '@playwright/test';

// Helper สำหรับ Login ผ่านหน้าเว็บจริงของ SauceDemo
async function loginThroughRealUI(page: Page) {
  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // ตรวจสอบว่า Login สำเร็จและเข้าสู่หน้า Inventory
  await expect(page).toHaveURL(/inventory\.html/);
}

test.describe('Bottom-Up REAL - no Driver / no Stub', () => {

  test('BU-01: Integrate B Inventory -> E Add Cart -> F Cart', async ({ page }) => {

    // Login จริง
    await loginThroughRealUI(page);

    // B REAL: Inventory
    await expect(page.locator('.inventory_list')).toBeVisible();

    // E REAL: Add Cart
    await page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();

    await expect(page.locator('.shopping_cart_badge'))
      .toHaveText('1');

    // F REAL: Cart
    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');
  });


  test('BU-02: Add A Login to the already-tested B-E-F flow', async ({ page }) => {

    // A REAL: Login
    await page.goto('/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // A -> B
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();

    // B -> E
    await page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();

    // E -> F
    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');
  });

});