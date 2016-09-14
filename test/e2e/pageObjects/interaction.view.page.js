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
            var button = element(by.css('#saveInteractionResults'));

            browser.wait(EC.elementToBeClickable(button));

            return button;
        }
    },
    oldResult: {
        value: function (text) {
            var button = element(by.partialButtonText(text));

            browser.wait(EC.elementToBeClickable(button));

            return button;
        }
    },
    oldResultDirectly: {
        value: function (text) {
            var button = element(by.partialButtonText(text));

            browser.wait(EC.stalenessOf(button));

            return button;
        }
    },
    removePreviousButtonByIndex: {
        value: function (index) {
            var button = element(by.css('[data-link="remove-previous' + index +'"]'));

            return button;
        }
    },
    confirmDelete: {
        get: function () {
            var button = element(by.css('#dashboardModal .modal-footer .btn-primary'));

            browser.wait(EC.elementToBeClickable(button));

            return button;
        }
    }
});