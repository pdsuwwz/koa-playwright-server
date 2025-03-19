import type { RouterQuery } from '@/controllers/generate-simple-pdf'
import playwright from 'playwright'

/**
 * @example

curl --location --request GET \
'http://localhost:5000/simple-pdf?url=https://www.google.com/' \
--output test-simple-pdf.pdf

 */

export default class GenerateSimplePdfService {
  generate = async (params: RouterQuery): Promise<Buffer> => {
    const {
      url,
      isLandscape = '1',
    } = params

    const browser = await playwright.chromium.launch({
      headless: true,
      args: [
        '--disable-extensions',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
      ],
    })


    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()

    await page.setDefaultNavigationTimeout(100000)

    await page.goto(encodeURI(url), {
      waitUntil: 'networkidle',
    })

    const buffer = await page.pdf({
      format: 'a4',
      landscape: isLandscape === '1',
      printBackground: true,
    })

    await page.close()

    return buffer
  }
}
