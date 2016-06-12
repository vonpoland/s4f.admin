/* global describe, it, expect, browser, beforeEach, protractor */

const LoginPage = require('../../pageObjects/login.page');
const EC = protractor.ExpectedConditions;

describe('should check if login works', function () {
    beforeEach(function () {
        browser.ignoreSynchronization = true;
        LoginPage.go();
    });

    it('should login and logout user', function () {
        LoginPage.login(browser.params.login.user, browser.params.login.password, true);
        expect(LoginPage.loggedUserTxt.isDisplayed()).toBe(true);
        expect(browser.getCurrentUrl()).toContain('dashboard');
        LoginPage.logout();
        expect(LoginPage.loginBtn.isPresent()).toBe(true);
    });

    it('should inform user when bad login or password is set', function () {
        LoginPage.login('test', 'test');
        browser.wait(EC.visibilityOf(LoginPage.loggingFailedTxt));
        expect(LoginPage.loggingFailedTxt.isDisplayed()).toBe(true);
    });
});
