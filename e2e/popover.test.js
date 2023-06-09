import puppeteer from "puppeteer";
import { fork } from 'child_process';

jest.setTimeout(50000);

describe('test popover', () => {
    let browser;
    let page;
    let server;
    const baseUrl = 'http://localhost:9000';

    beforeEach(async () => {

        server = fork(`${__dirname}/e2e.server.js`);
        await new Promise((resolve, reject) => {
            server.on('error', reject);
            server.on('message', (message) => {
                if (message === 'ok') {
                    resolve();
                }
            });
        });


        browser = await puppeteer.launch()

        // browser = await puppeteer.launch({
        //     // headless: false, 
        //     // slowMo: 100,
        //     // devtools: true,
        // });  

        page = await browser.newPage(); 
    })

    test('open popup of popover', async () => {
        await page.goto(baseUrl);

        await page.waitForSelector('.container');

        const button = await page.$('.popover-button');

        await button.click();

        await page.screenshot({path: 'screenshot-open.png'})

        await page.waitForSelector('.container .popover__wr-popup.active');
    })

    test('close popup of popover', async () => {
        await page.goto(baseUrl);

        await page.waitForSelector('.container');

        const button = await page.$('.popover-button'); 

        await button.click();
        await button.click();

        await page.screenshot({path: 'screenshot-close.png'})
    })

    afterEach(async () => {
        await browser.close();
        server.kill();
    })
})
