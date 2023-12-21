import { Page, chromium } from "playwright-core";
import * as dotenv from 'dotenv';

class MyScrape {
    page: Page|undefined;
    url: string;
    user: string;
    pass: string;

    constructor(url: string) {
        this.page = undefined;
        this.url = url;

        dotenv.config();
        this.user = process.env.USER_NAME === undefined ? `` : process.env.USER_NAME;
        this.pass = process.env.PASSWORD === undefined ? `` : process.env.PASSWORD;
    }

    async run() {
        this.page = await this.launch();
        await this.page!.goto(this.url);

        await this.page.click(`#left_container > div.left-module-top.bg_color > div > div > a`);
        
        await this.page.locator(`#i0116`).fill(this.user);
        await this.page.locator(`#idSIButton9`).click();

        await this.page.locator(`#i0118`).fill(this.pass);
        await this.page.locator(`#idSIButton9`).click();

        await this.page.locator(`#idBtn_Back`).click();

        await this.page.locator(`body > main > section > form > fieldset > label:nth-child(3)`).click();
        await this.page.locator(`body > main > section > form > div.grid.md-2 > div:nth-child(1) > button`).click();

        await this.page.locator(`#container > div > form > div:nth-child(2) > div.access_env > div.note > ul > li:nth-child(1) > input[type=checkbox]`).click();
        await this.page.locator(`#container > div > form > div:nth-child(2) > div:nth-child(2) > a > span > span`).click();
    }

    async launch(): Promise<Page> {
        const browser = await chromium.launch({
            channel: "chrome",
            headless: false
        });
        return browser.newPage();
    }
}

const url = 'https://gakujo.shizuoka.ac.jp/portal/';
const ms = new MyScrape(url);
ms.run();




