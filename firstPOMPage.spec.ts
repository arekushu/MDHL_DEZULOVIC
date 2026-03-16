import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
/*import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'*/


test.beforeEach(async({page}) =>{   
    await page.goto("http://localhost:4200/")
})

test('Navigate to Form page', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().toolTipPage()

})

test ('Using Parametrized methods', async({page}) =>{
    const pm = new PageManager(page)
    

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com','Welcome1!', 'Option 1')
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox('Alexander Dezulovic', 'alexander@test.com', true)
    await pm.navigateTo().datePickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(1)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(1,10)
})