/* global browser, by, element, protractor */

var Page = require('astrolabe').Page;
const EC = protractor.ExpectedConditions;

module.exports = Page.create({
    setStartDate: {
        get: function () {
            return element(by.css('#saveAs'))
        }
    },
    saveResultsAs: {
        get: function () {
            var button = element(by.css('.btn-primary'));

            browser.wait(EC.elementToBeClickable(button));

            return button;
        }
    },
    oldResult: {
        value: function (text) {
            var button = element(by.partialButtonText('text'));

            browser.wait(EC.elementToBeClickable(button));

            return button;
        }
    }
});