import { test, expect } from '@playwright/test';

test('buy the goods with extended checks', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    
    // Checking Title of the Page
    await expect(page).toHaveTitle("Swag Labs");
    
    // Checking fields username/password
    const usernameField = page.locator('id=user-name');
    const passwordField = page.locator('id=password');
    const loginButton = page.locator('id=login-button');
    
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(loginButton).toBeVisible();
    
    await usernameField.fill('standard_user');
    await passwordField.fill('secret_sauce');
    await loginButton.click();
    
    // CHecking Success Login
    await expect(page).toHaveURL(/inventory/);
    
    // Adding the goods to the cart
    const backpack = page.locator('id=add-to-cart-sauce-labs-backpack');
    const tshirt = page.locator('id=add-to-cart-sauce-labs-bolt-t-shirt');
    
    await expect(backpack).toBeVisible();
    await expect(tshirt).toBeVisible();
    
    await backpack.click();
    await tshirt.click();
    
    // Redirect to cart and checking of adding goods
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);
    
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
    
    // Placing an order
    await page.locator('id=checkout').click();
    await expect(page).toHaveURL(/checkout-step-one/);
    
    await page.fill('id=first-name', 'Konstantin');
    await page.fill('id=last-name', 'Ushak');
    await page.fill('id=postal-code', '246000');
    
    await page.locator('id=continue').click();
    await expect(page).toHaveURL(/checkout-step-two/);
    
    // Checking the total order amount
    const totalPrice = await page.locator('.summary_total_label').textContent();
    expect(totalPrice).toContain('$'); // Проверяем, что в цене есть знак доллара
    
    await page.locator('id=finish').click();
    
    // Checking successful completion of the order
    const confirmationMessage = page.locator('.complete-header');
    await expect(confirmationMessage).toHaveText('Thank you for your order!');
    
    await page.locator('id=back-to-products').click();
    await expect(page).toHaveURL(/inventory/);
});
