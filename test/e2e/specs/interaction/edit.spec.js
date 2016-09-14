/* global describe, it, expect, browser, protractor */

const LoginPage = require('../../pageObjects/login.page');
const InteractionsPage = require('../../pageObjects/interactions.page');
const EditInteractionPage = require('../../pageObjects/interaction.edit.page');

describe('should check edit page', function () {
	it('should open interaction panel', function () {
		browser.ignoreSynchronization = true;
		LoginPage.go();
		LoginPage.login(browser.params.login.user, browser.params.login.password, true);
		InteractionsPage.interactionsLink.click();
		InteractionsPage.editByName('kto-wygra');
	});

	it('should set interaction as active', function () {
		EditInteractionPage.setStartDate(2009, 1, 5);
		EditInteractionPage.setFinishDate(2099, 1, 7);
		EditInteractionPage.saveBtn.click();
		expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
		expect(InteractionsPage.liveIcon(0).isDisplayed()).toBe(true);
		InteractionsPage.editByName('kto-wygra');
	});

	it('should set interaction as finished', function () {
		EditInteractionPage.setStartDate(2009, 2, 1);
		EditInteractionPage.setFinishDate(2009, 3, 1);
		EditInteractionPage.saveBtn.click();
		expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
		expect(InteractionsPage.notLiveIcon(0).isDisplayed()).toBe(true);
		InteractionsPage.editByName('kto-wygra');
	});

	it('should set interaction as not started', function () {
		EditInteractionPage.setStartDate(2039, 4, 1);
		EditInteractionPage.setFinishDate(2040, 5, 2);
		EditInteractionPage.saveBtn.click();
		expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
		expect(InteractionsPage.notLiveIcon(0).isDisplayed()).toBe(true);
		InteractionsPage.editByName('kto-wygra');
	});

	it('should revert interaction', function () {
		EditInteractionPage.setStartDate(2000, 6, 27);
		EditInteractionPage.setFinishDate(2040, 6, 27);
		EditInteractionPage.saveBtn.click();
		expect(InteractionsPage.saveSuccess.isDisplayed()).toBe(true);
		expect(InteractionsPage.liveIcon(0).isDisplayed()).toBe(true);
	});

	it('should log out user', function () {
		LoginPage.logout();
	});
});
