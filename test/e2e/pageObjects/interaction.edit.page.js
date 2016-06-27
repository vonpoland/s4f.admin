/* global browser, by, element, protractor */

var Page = require('astrolabe').Page;
const EC = protractor.ExpectedConditions;

module.exports = Page.create({
    setStartDate: {
        value: function (value) {
            browser.executeScript('$("#datetimepicker1").data("DateTimePicker").date("' + value + '")');
        }
    },
    setFinishDate: {
        value: function (value) {
            browser.executeScript('$("#datetimepicker2").data("DateTimePicker").date("' + value + '")');
        }
    },
    saveBtn: {
        get: function () {
            var button = element(by.partialButtonText('Save'));

            browser.wait(EC.elementToBeClickable(button));

            return button;
        }
    },
    detailsPanel: {
        get: function () {
            return element.all(by.css('.input-group-addon')).last();
        }
    }
});