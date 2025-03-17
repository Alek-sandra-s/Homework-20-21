import { test, expect } from '@playwright/test'
import { SmallLoanPage } from '../page-objects/pages/SmallLoanPage'

test.describe('Loan app mock tests', async () => {
  test('TL-21-1 positive test', async ({ page }) => {
    const expectedMonthlyAmount = 100005
    const smallLoanPage = new SmallLoanPage(page)

    await page.route('**/api/loan-calc*', async (request) => {
      const responseBody = { paymentAmountMonthly: expectedMonthlyAmount }
      await request.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(responseBody),
      })
    })
    const loanCalcResponse = page.waitForResponse('**/api/loan-calc*')
    await smallLoanPage.open()
    await loanCalcResponse
    await smallLoanPage.checkMonthlyAmount(expectedMonthlyAmount)
  })

  test('TL-21-2 status code 500 and empty response body', async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page)

    await page.route('**/api/loan-calc*', async (request) => {
      await request.fulfill({
        status: 500,
        contentType: 'application/json',
      })
    })
    const loanCalcResponse = page.waitForResponse('**/api/loan-calc*')
    await smallLoanPage.open()
    await loanCalcResponse
    await expect(smallLoanPage.calculatorFieldError).toBeVisible()
  })

  test('TL-21-3 status code 200 and empty response body', async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page)

    await page.route('**/api/loan-calc*', async (request) => {
      await request.fulfill({
        status: 200,
        contentType: 'application/json',
      })
    })
    const loanCalcResponse = page.waitForResponse('**/api/loan-calc*')
    await smallLoanPage.open()
    await loanCalcResponse
    await expect(smallLoanPage.monthlyAmountSpan).toHaveText('undefined €')
  })

  test('TL-21-4 status code 200 and wrong key name', async ({ page }) => {
    const expectedMonthlyAmount = 100005
    const smallLoanPage = new SmallLoanPage(page)

    await page.route('**/api/loan-calc*', async (request) => {
      const responseBody = { paymentAmountDaily: expectedMonthlyAmount }
      await request.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(responseBody),
      })
    })
    const loanCalcResponse = page.waitForResponse('**/api/loan-calc*')
    await smallLoanPage.open()
    await loanCalcResponse
    await expect(smallLoanPage.monthlyAmountSpan).toHaveText('undefined €')
  })
})
