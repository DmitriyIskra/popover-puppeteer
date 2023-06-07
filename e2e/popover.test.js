import puppeteer from "puppeteer";

describe('test popover', () => {
    let browser;
    let page;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 100,
            // devtools: true,
        });

        page = await browser.newPage();
    })

    test('open popup of popover', async () => {
        await page.goto('http://localhost:9000');

        await page.waitForSelector('.container');

        const button = await page.$('.popover-button');

        await button.click();

        await page.screenshot({path: 'screenshot-open.png'})

        await page.waitForSelector('.container .popover__wr-popup.active');
    })

    test('close popup of popover', async () => {
        await page.goto('http://localhost:9000');

        await page.waitForSelector('.container');

        const button = await page.$('.popover-button');

        await button.click();
        await button.click();

        await page.screenshot({path: 'screenshot-close.png'})
    })

    afterEach(async () => {
        await browser.close()
    })
})
