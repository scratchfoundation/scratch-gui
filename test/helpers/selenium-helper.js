jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // eslint-disable-line no-undef

import bindAll from 'lodash.bindall';
import 'chromedriver'; // register path
import webdriver from 'selenium-webdriver';

const {By, until, Button} = webdriver;

const USE_HEADLESS = process.env.USE_HEADLESS !== 'no';

class SeleniumHelper {
    constructor () {
        bindAll(this, [
            'clickText',
            'clickButton',
            'clickXpath',
            'elementIsVisible',
            'findByText',
            'findByXpath',
            'getDriver',
            'getSauceDriver',
            'getLogs',
            'loadUri',
            'rightClickText',
            'waitUntilGone'
        ]);
    }

    elementIsVisible (element) {
        return this.driver.wait(until.elementIsVisible(element));
    }

    get scope () {
        // List of useful xpath scopes for finding elements
        return {
            blocksTab: "*[@id='react-tabs-1']",
            costumesTab: "*[@id='react-tabs-3']",
            modal: '*[@class="ReactModalPortal"]',
            reportedValue: '*[@class="blocklyDropDownContent"]',
            soundsTab: "*[@id='react-tabs-5']",
            spriteTile: '*[starts-with(@class,"react-contextmenu-wrapper")]',
            monitors: '*[starts-with(@class,"stage_monitor-wrapper")]'
        };
    }

    getDriver () {
        // It's not safe to replace an existing driver since there may be outstanding async chains already in progress.
        // Alternative solution: remove/replace all async code in this class which mentions `this.driver`
        if (!this.driver) {
            const chromeCapabilities = webdriver.Capabilities.chrome();
            const args = [];
            if (USE_HEADLESS) {
                args.push('--headless');
            }

            // Stub getUserMedia to always not allow access
            args.push('--use-fake-ui-for-media-stream=deny');

            chromeCapabilities.set('chromeOptions', {args});
            chromeCapabilities.setLoggingPrefs({
                performance: 'ALL'
            });
            this.driver = new webdriver.Builder()
                .forBrowser('chrome')
                .withCapabilities(chromeCapabilities)
                .build();
        }
        return this.driver;
    }

    getSauceDriver (username, accessKey, configs) {
        // It's not safe to replace an existing driver since there may be outstanding async chains already in progress.
        // Alternative solution: remove/replace all async code in this class which mentions `this.driver`
        if (!this.driver) {
            this.driver = new webdriver.Builder()
                .withCapabilities({
                    browserName: configs.browserName,
                    platform: configs.platform,
                    version: configs.version,
                    username: username,
                    accessKey: accessKey
                })
                .usingServer(`http://${username}:${accessKey
                }@ondemand.saucelabs.com:80/wd/hub`)
                .build();
        }
        return this.driver;
    }

    findByXpath (xpath) {
        return this.driver.wait(until.elementLocated(By.xpath(xpath), 5 * 1000));
    }

    findByText (text, scope) {
        return this.findByXpath(`//body//${scope || '*'}//*[contains(text(), '${text}')]`);
    }

    async loadUri (uri) {
        const WINDOW_WIDTH = 1024;
        const WINDOW_HEIGHT = 768;

        // there's no meaningful common element rendered in all GUI pages, but we use "box" on all of them :)
        // this just indicates that React has rendered something at least once
        // this is the only Xpath I could find that works on all: index, player, blocks-only, compatibility-testing
        const somethingRenderedXpath = '//body//*[starts-with(@class,"box_box_") or contains(@class," box_box_")]';
        const loaderBackgroundXpath = '//body//*[starts-with(@class,"loader_background_")]';

        await this.driver.get(`file://${uri}`);
        const window = await this.driver.manage().window();
        await window.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
        await this.driver.executeScript('window.onbeforeunload = undefined;');

        // wait for the app to exist
        await this.findByXpath(somethingRenderedXpath);

        // look for loader background(s), which if present will be in front of the editor wrapper
        const loaderBackgrounds = await this.driver.findElements(By.xpath(loaderBackgroundXpath));

        // if any were found, wait for it/them to go away
        return Promise.all(loaderBackgrounds.map(
            loaderBackground => this.waitUntilGone(loaderBackground)
        ));
    }

    clickXpath (xpath) {
        return this.findByXpath(xpath).then(el => el.click());
    }

    clickText (text, scope) {
        return this.findByText(text, scope).then(el => el.click());
    }

    rightClickText (text, scope) {
        return this.findByText(text, scope).then(el => this.driver.actions()
            .click(el, Button.RIGHT)
            .perform());
    }

    clickButton (text) {
        return this.clickXpath(`//button//*[contains(text(), '${text}')]`);
    }

    waitUntilGone (element) {
        return this.driver.wait(until.stalenessOf(element));
    }

    getLogs (whitelist) {
        if (!whitelist) {
            // Default whitelist
            whitelist = [
                'The play() request was interrupted by a call to pause()'
            ];
        }
        return this.driver.manage()
            .logs()
            .get('browser')
            .then(entries => entries.filter(entry => {
                const message = entry.message;
                for (let i = 0; i < whitelist.length; i++) {
                    if (message.indexOf(whitelist[i]) !== -1) {
                        return false;
                    } else if (entry.level !== 'SEVERE') {
                        return false;
                    }
                }
                return true;
            }));
    }
}

export default SeleniumHelper;
