import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async login(username: string, password: string) {
        await this.page.locator('#user-name').fill(username);
        await this.page.locator('#password').fill(password);
        await this.page.locator('#login-button').click();
    }

    async getTitle() {
        return await this.page.title();
    }
}
