/* global browser, by, element, protractor */

var Page = require('astrolabe').Page;
const EC = protractor.ExpectedConditions;

function createDateString(year, month, date) {
	var date = [year, month, date];
	return 'var tempDate = new Date(' + date.join(',') +')';
}

module.exports = Page.create({
    setStartDate: {
        value: function (year, month, day) {
            browser.executeScript(createDateString(year, month, day) + ';$("#datetimepicker1").data("DateTimePicker").date(tempDate)');
        }
    },
    setFinishDate: {
        value: function (year, month, day) {
            browser.executeScript(createDateString(year, month, day) + ';$("#datetimepicker2").data("DateTimePicker").date(tempDate)');
        }
    },
    setStartDateManually: {
        value: function (script) {
            browser.executeScript('$("#datetimepicker1").data("DateTimePicker").date(' + script + ')');
        }
    },
    setStartFinishDateManually: {
        value: function (script) {
            browser.executeScript('$("#datetimepicker2").data("DateTimePicker").date(' + script + ')');
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