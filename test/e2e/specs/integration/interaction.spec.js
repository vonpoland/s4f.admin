/* global describe, it, expect, browser, protractor */

const LoginPage = require('../../pageObjects/login.page');
const InteractionsPage = require('../../pageObjects/interactions.page');
const EditInteractionPage = require('../../pageObjects/interaction.edit.page');
const moment = require('moment');
const EC = protractor.ExpectedConditions;

describe('should check if login works', function () {
    it('should open interaction panel', function () {
        browser.ignoreSynchronization = true;
        LoginPage.go();
        LoginPage.login(browser.params.login.user, browser.params.login.password, true);
        InteractionsPage.interactionsLink.click();
    });

    it('should setup test-interaction-derby7 interaction', function () {
        InteractionsPage.editByName('test-interaction-derby7');
        EditInteractionPage.setStartDateManually('moment().subtract(\'minute\', 3)');
        EditInteractionPage.setStartFinishDateManually('moment().subtract(\'minute\', 4)');
        EditInteractionPage.saveBtn.click();
        expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
    });

    it('should setup test-interaction-question interaction', function () {
        InteractionsPage.editByName('test-interaction-question');
        EditInteractionPage.setStartDateManually('moment()');
        EditInteractionPage.setStartFinishDateManually('moment().add(\'minute\', 1)');
        EditInteractionPage.saveBtn.click();
        expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
    });

    it('should setup test-interaction-derby3 interaction', function () {
        InteractionsPage.editByName('test-interaction-derby3');
        EditInteractionPage.setStartDateManually('moment().add(\'minute\', 1)');
        EditInteractionPage.setStartFinishDateManually('moment().add(\'minute\', 2)');
        EditInteractionPage.saveBtn.click();
        expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
    });

    it('should setup test-interaction-derby6 interaction', function () {
        InteractionsPage.editByName('test-interaction-derby6');
        EditInteractionPage.setStartDateManually('moment().add(\'minute\', 2)');
        EditInteractionPage.setStartFinishDateManually('moment().add(\'minute\', 3)');
        EditInteractionPage.saveBtn.click();
        expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
    });

    it('should check if interaction are changing in correct time', function () {
        browser.get(browser.params.interactions.projectorDerbyLink);
        var template = element(by.css('[ng-include="step.template"]'));

        browser.wait(EC.visibilityOf(template));
        expect(browser.getCurrentUrl()).toContain('test-interaction-question');

        browser.sleep(60000);
        browser.refresh();
        template = element(by.css('[ng-include="step.template"]'));
        browser.wait(EC.visibilityOf(template));
        expect(browser.getCurrentUrl()).toContain('test-interaction-derby3');

        browser.sleep(60000);
        browser.refresh();
        template = element(by.css('[ng-include="step.template"]'));
        browser.wait(EC.visibilityOf(template));
        expect(browser.getCurrentUrl()).toContain('test-interaction-derby6');
    });
});
