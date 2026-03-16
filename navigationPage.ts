import { Locator, Page } from "@playwright/test";


export class NavigationPage{
    private readonly page: Page
    readonly formLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly toolTipMenuItem: Locator

    constructor(page: Page){
        this.page = page
        this.formLayoutsMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.toolTipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        //await this.waitForNumberOfSeconds(2)
        await this.formLayoutsMenuItem.click()    
    }

    async datePickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenuItem.click()
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
        await this.page.waitForTimeout(3000)

    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()
        await this.page.waitForTimeout(3000)

    }

    async toolTipPage(){
       await this.selectGroupMenuItem('Modal & Overlays')
       await this.toolTipMenuItem.click() 
       await this.page.waitForTimeout(5000)

    }

    private async selectGroupMenuItem(groupItemTitle: string){
        await this.page.waitForTimeout(1000)
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
            await groupMenuItem.click()


    }

}   

    