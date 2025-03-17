import { test, expect } from '@playwright/test'
import { SmallLoanPage } from '../page-objects/pages/SmallLoanPage'
import { LoanDecisionPage } from '../page-objects/pages/LoanDecisionPage'

test.describe('Loan app tests', async () => {
  test('TL-20-1 base test', async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page)
    const loanDecisionPage = new LoanDecisionPage(page)
    await smallLoanPage.open()
    const prefilledAmount = await smallLoanPage.amountInput.getCurrentValue()
    const prefilledPeriod = await smallLoanPage.getFirstPeriodOption()
    await smallLoanPage.applyButton.click()
    await smallLoanPage.usernameInput.fill('test')
    await smallLoanPage.passwordInput.fill('test')
    await smallLoanPage.continueButton.click()
    const finalAmount = await loanDecisionPage.getFinalAmountValue()
    const finalPeriod = await loanDecisionPage.getFinalPeriodValue()

    expect(finalAmount).toEqual(prefilledAmount)
    expect(finalPeriod).toEqual(prefilledPeriod)
  })

  test('TL-20-2 Check that page scrolls to the top of the page by clicking on "Apply for loan" button', async ({
    page,
  }) => {
    const smallLoanPage = new SmallLoanPage(page)
    await smallLoanPage.open()
    await smallLoanPage.scrollToTitle1()

    await expect(smallLoanPage.calculateHeader).toBeInViewport()
  })

  test('TL-20-3 Check that page scrolls to the top of the page by clicking on "Apply for loan" button', async ({
    page,
  }) => {
    const smallLoanPage = new SmallLoanPage(page)
    await smallLoanPage.open()
    await smallLoanPage.scrollToTitle2()

    await expect(smallLoanPage.calculateHeader).toBeInViewport()
  })

  test('TL-20-4 Check amount slider functionality', async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page)
    await smallLoanPage.open()
    await expect(smallLoanPage.sliderAmount.slider).toBeVisible()
    await smallLoanPage.sliderAmount.moveToTheEnd()

    expect(await smallLoanPage.amountInput.getCurrentValue()).toBe('10000')
  })

  test('TL-20-5 Check period slider functionality', async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page)
    await smallLoanPage.open()
    await expect(smallLoanPage.sliderPeriod.slider).toBeVisible()
    await smallLoanPage.sliderPeriod.moveToTheEnd()

    expect(await smallLoanPage.sliderPeriod.getCurrentValue()).toBe('36')
  })
})
