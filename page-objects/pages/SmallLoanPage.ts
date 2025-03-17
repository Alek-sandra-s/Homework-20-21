import { expect, Locator, Page } from '@playwright/test'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import { Slider } from '../atoms/Slider'

const url = 'https://loan-app.tallinn-learning.ee/small-loan'

export class SmallLoanPage {
  readonly page: Page
  readonly applyButton: Button
  readonly applyImage1: Button
  readonly applyImage2: Button
  readonly amountInput: Input
  readonly periodSelect: Locator
  readonly periodOptions: Locator
  readonly usernameInput: Input
  readonly passwordInput: Input
  readonly continueButton: Button
  readonly calculateHeader: Locator
  readonly monthlyAmountSpan: Locator
  readonly calculatorFieldError: Locator
  readonly sliderAmount: Slider
  readonly sliderPeriod: Slider

  constructor(page: Page) {
    this.page = page
    this.applyButton = new Button(page, 'id-small-loan-calculator-field-apply')
    this.applyImage1 = new Button(page, 'id-image-element-button-image-1')
    this.applyImage2 = new Button(page, 'id-image-element-button-image-2')
    this.amountInput = new Input(page, 'id-small-loan-calculator-field-amount')
    this.periodSelect = page.getByTestId('ib-small-loan-calculator-field-period')
    this.periodOptions = this.periodSelect.locator('option')
    this.usernameInput = new Input(page, 'login-popup-username-input')
    this.passwordInput = new Input(page, 'login-popup-password-input')
    this.continueButton = new Button(page, 'login-popup-continue-button')
    this.calculateHeader = page.getByText('Calculate your monthly payment')
    this.monthlyAmountSpan = page.getByTestId('ib-small-loan-calculator-field-monthlyPayment')
    this.calculatorFieldError = page.getByTestId('id-small-loan-calculator-field-error')
    this.sliderAmount = new Slider(page, 'id-small-loan-calculator-field-amount-slider')
    this.sliderPeriod = new Slider(page, 'ib-small-loan-calculator-field-period-slider')
  }

  async open(): Promise<void> {
    await this.page.goto(url)
  }

  async getFirstPeriodOption(): Promise<string> {
    const allOptions = await this.periodOptions.all()

    return await allOptions[0].innerText()
  }

  async scrollToTitle1(): Promise<void> {
    await this.applyImage1.click()
  }

  async scrollToTitle2(): Promise<void> {
    await this.applyImage2.click()
  }

  async checkMonthlyAmount(expected: number): Promise<void> {
    const innerText = await this.monthlyAmountSpan.innerText()
    const sum = +innerText.split(' ')[0]
    expect(expected).toEqual(sum)
  }
}
