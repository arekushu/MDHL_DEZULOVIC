import {test, expect} from "@playwright/test"

test.beforeEach(async({page}) =>{
    await page.goto("http://localhost:4200/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()

})

test.skip ("the First test", async({page}) => {

    await page.getByText("Form Layouts").click()
})

test.skip ("navigate to date picker", async({page}) => {

    await page.getByText("Datepicker").click()
})

test ("Locator syntax rules", async({page}) => {
    //By tag
    page.locator("input")

    //By ID

    await page.locator("#inputEmail1").click()

    //By Class

    page.locator(".shape-rectangle")
    
})

test ("User Facing locators", async ({page})=>{

    await page.getByRole("textbox", {name:"Email"}).first().click()
    await page.getByRole("button", {name: "Sign in"}).first().click()
    await page.getByPlaceholder("Jane Doe").first().click()
    await page.getByText("Using the Grid").first().click()
})

test ("Locating Child elements", async ({page})=>{

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').nth(3).getByRole('button').click()

})

test ("locating parent elements", async ({page}) => {

await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole("textbox", {name:"Email"}).click()

await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole("textbox", {name:"Email"}).click()

await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()

await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()

await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Password"}).click()

})

test ("Reusing locators", async ({page}) => {

//testing the whole basic form section

const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
const emailField = basicForm.getByRole('textbox', {name: "Email"})
await emailField.fill("test@test.com")

await basicForm.getByRole('textbox', {name: "Password"}).fill("Etc1234!")

await basicForm.locator ('nb-checkbox').click()

await basicForm.getByRole('button').click()

await expect(emailField).toHaveValue("test@test.com")

})

test ("extracting values", async({page}) => {
const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
const buttonText = await basicForm.locator('button').textContent()
const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
const emailField = basicForm.getByRole('textbox', {name: "Email"})
const placeholderValue = await emailField.getAttribute('placeholder')
await emailField.fill('test@test.com')
const emailValue = await emailField.inputValue()

expect (buttonText).toEqual('Submit')
expect (allRadioButtonsLabels).toContain("Option 1")
expect (emailValue).toEqual('test@test.com')
expect (placeholderValue).toEqual("Email")

})
test ('assertions', async ({page}) =>{
//General assertions
const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
const value = 5
const text = await basicFormButton.textContent()

expect(value).toEqual(5)
expect(text).toEqual('Submit')
//Locator assertions

expect(basicFormButton).toHaveText("Submit")

//soft assertions

await expect.soft(basicFormButton).toHaveText('Submit')
await basicFormButton.click()
})
