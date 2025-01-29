import { test, expect } from '@playwright/test'

test ('buy the goods', async ( {page}) =>{
    
    await page.goto("https://www.saucedemo.com/")

    const pageTitle = page.title()
    await expect(page).toHaveTitle("Swag Labs")

    await page.locator('id=user-name').fill('standard_user')
    await page.locator('id=password').fill('secret_sauce')

    await page.locator('id=login-button').click()

    await page.locator('id=add-to-cart-sauce-labs-backpack').click()
    await page.locator('id=add-to-cart-sauce-labs-bolt-t-shirt').click()

    await page.locator('.shopping_cart_link').click()
    await page.locator('id=checkout').click()

    // different method how we can call the selectors
     await page.fill('id=first-name', 'Konstantin')
     await page.fill('id=last-name', 'Ushak')
     await page.fill('id=postal-code', '246000')

     
     await page.locator("id=continue").click()
     await page.locator("id=finish").click()
     await page.locator("id=back-to-products").click()

     
})
