import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

test('Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    expect(await loginPage.getTitle()).toBe("Swag Labs");
});