/* global describe, it, expect, browser, protractor */

const LoginPage = require('../../pageObjects/login.page');
const InteractionsPage = require('../../pageObjects/interactions.page');
const EditInteractionPage = require('../../pageObjects/interaction.edit.page');

describe('should check if login works', function () {
    it('should open interaction panel', function () {
        browser.ignoreSynchronization = true;
        LoginPage.go();
        LoginPage.login(browser.params.login.user, browser.params.login.password, true);
        InteractionsPage.interactionsLink.click();
        InteractionsPage.edit(0);
    });

    it('should set interaction as active', function () {
        var startDate = '06/27/2009';
        var finishDate = '06/27/2099';

        EditInteractionPage.setStartDate(startDate);
        EditInteractionPage.setFinishDate(finishDate);
        EditInteractionPage.saveBtn.click();
        expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
        expect(InteractionsPage.liveIcon(0).isDisplayed()).toBe(true);
        InteractionsPage.edit(0);
    });

    it('should set interaction as finished', function () {
        var startDate = '06/27/2009';
        var finishDate = '06/27/2011';

        EditInteractionPage.setStartDate(startDate);
        EditInteractionPage.setFinishDate(finishDate);
        EditInteractionPage.saveBtn.click();
        expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
        expect(InteractionsPage.notLiveIcon(0).isDisplayed()).toBe(true);
        InteractionsPage.edit(0);
    });

    it('should set interaction as not started', function () {
        var startDate = '06/27/2039';
        var finishDate = '06/27/2040';

        EditInteractionPage.setStartDate(startDate);
        EditInteractionPage.setFinishDate(finishDate);
        EditInteractionPage.saveBtn.click();
        expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
        expect(InteractionsPage.notLiveIcon(0).isDisplayed()).toBe(true);
        InteractionsPage.edit(0);
    });

    it('should revert interaction', function () {
        var startDate = '06/27/2000';
        var finishDate = '06/27/2040';

        EditInteractionPage.setStartDate(startDate);
        EditInteractionPage.setFinishDate(finishDate);
        EditInteractionPage.saveBtn.click();
        expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
        expect(InteractionsPage.liveIcon(0).isDisplayed()).toBe(true);
    });

    it('should log out user', function () {
        LoginPage.logout();
    });
});
