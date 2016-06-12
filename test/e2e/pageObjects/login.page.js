/* global browser, by, element, protractor */

var Page = require('astrolabe').Page;
const EC = protractor.ExpectedConditions;

module.exports = Page.create({
    url: {value: browser.params.login.url},
    loginBtn: {
        get: function () {
            return element(by.buttonText('Login'));
        }
    },
    loginTxt: {
        get: function () {
            return element(by.id('txtLogin'));
        }
    },
    passwordTxt: {
        get: function () {
            return element(by.id('txtPassword'));
        }
    },
    loggedUserTxt: {
        get: function () {
            return element(by.id('loginStatusUser'));
        }
    },
    loggingFailedTxt: {
        get: function () {
            return element(by.id('loginFailedTxt'));
        }
    },
    logoutBtn: {
        get: function () {
            return element(by.id('btnLogout'));
        }
    },
    login: {
        value: function (user, password, waitForDashboard) {
            browser.wait(EC.visibilityOf(this.loginBtn));
            this.loginTxt.sendKeys(user);
            this.passwordTxt.sendKeys(password);
            this.loginBtn.click();

            if(waitForDashboard) {
                browser.wait(EC.visibilityOf(this.loggedUserTxt));
            }
        }
    },
    logout: {
        value: function () {
            this.loggedUserTxt.click();
            this.logoutBtn.click();
            browser.wait(EC.visibilityOf(this.loginBtn));
        }
    }
});