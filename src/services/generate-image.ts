import type { Context } from 'koa'
import playwright from 'playwright'

/**
 * @example

curl --location --request GET \
'http://localhost:5000/image?url=https://www.baidu.com' \
--output test-image.png

 */

export default class GenerateImageService {
  generate = async (ctx: Context): Promise<unknown> => {
    if (!ctx.query.url) {
      ctx.status = 404
      return {
        status: 'NOT-FOUND'
      }
    }

    const browser = await playwright.chromium.launch({
      args: [
        '--disable-extensions',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security'
      ]
    })

    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()

    await page.goto(ctx.query.url as string, {
      waitUntil: 'networkidle'
    })

    return await page.screenshot({
      omitBackground: true,
      fullPage: true,
      type: 'png'
    })
  }
}
