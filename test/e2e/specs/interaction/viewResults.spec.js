/* global describe, it, expect, browser, protractor */

const LoginPage = require('../../pageObjects/login.page');
const InteractionsPage = require('../../pageObjects/interactions.page');
const ViewInteractionPage = require('../../pageObjects/interaction.view.page');
const generateName = require('sillyname');
const saveName = generateName();

describe('should check view page', function () {
    it('should open interaction panel', function () {
        browser.ignoreSynchronization = true;
        LoginPage.go();
        LoginPage.login(browser.params.login.user, browser.params.login.password, true);
        InteractionsPage.interactionsLink.click();
        InteractionsPage.resultsByName(browser.params.interactions.pollWithResults);
    });

    it('should add new results name and save it', function () {
        ViewInteractionPage.setStartDate.sendKeys(saveName);
        ViewInteractionPage.saveResultsAs.click();
    });

    it('should find new result on list', function () {
        expect(ViewInteractionPage.oldResult(saveName).isDisplayed()).toBe(true);
    });

    it('should remove from the list', function () {
		ViewInteractionPage.removePreviousButtonByIndex(0).click();
		ViewInteractionPage.confirmDelete.click();
    });


	it('should not find new result on list', function () {
		expect(ViewInteractionPage.oldResultDirectly(saveName).isPresent()).toBe(false);
	});
	
	it('should log out user', function () {
        LoginPage.logout();
    });
});
