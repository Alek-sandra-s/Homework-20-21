import { Locator, Page } from '@playwright/test'

export class Slider {
  readonly page: Page
  readonly dataTestId: string

  constructor(page: Page, dataTestId: string) {
    this.page = page
    this.dataTestId = dataTestId
  }

  get slider(): Locator {
    return this.page.getByTestId(this.dataTestId)
  }

  async moveToTheEnd(): Promise<void> {
    const sliderWidth = (await this.slider.boundingBox())?.width || 0
    await this.slider.dragTo(this.slider, {
      sourcePosition: { x: 0, y: 0 },
      targetPosition: { x: sliderWidth, y: 0 },
    })
  }

  async getCurrentValue(): Promise<string> {
    return (await this.slider.getAttribute('value')) || ''
  }
}
