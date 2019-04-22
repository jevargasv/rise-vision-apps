'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./../pages/homepage.js');
var SignInPage = require('./../pages/signInPage.js');
var WeeklyTemplatesPage = require('./../pages/weeklyTemplates.js');
var CommonHeaderPage = require('./../../../../web/bower_components/common-header/test/e2e/pages/commonHeaderPage.js');
var helper = require('rv-common-e2e').helper;

var WeeklyTemplatesScenarios = function() {
  
  browser.driver.manage().window().setSize(1400, 900);
  describe('Homepage', function() {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var homepage;
    var signInPage;
    var weeklyTemplatesPage;
    var commonHeaderPage;

    before(function (){
      homepage = new HomePage();
      signInPage = new SignInPage();
      weeklyTemplatesPage = new WeeklyTemplatesPage();
      commonHeaderPage = new CommonHeaderPage();

      homepage.get();
      signInPage.signIn();
    });

    // Jenkins account is not an Education company
    it('should not show Weekly Templates for Non-Education customers',function(){
      expect(weeklyTemplatesPage.getWeeklyTemplatesMainPanel().isPresent()).to.eventually.be.false;
      expect(weeklyTemplatesPage.getWeeklyTemplatesExpandedView().isPresent()).to.eventually.be.false;
      expect(weeklyTemplatesPage.getWeeklyTemplatesNoticeView().isPresent()).to.eventually.be.false;
    });

    it('should show Weekly Tempaltes for Education Customers',function(){
      //creates an Education sub-company
      var subCompanyName = 'E2E TEST EDUCATION SUBCOMPANY';
      commonHeaderPage.createSubCompany(subCompanyName,'PRIMARY_SECONDARY_EDUCATION');
      commonHeaderPage.selectSubCompany(subCompanyName);
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      
      browser.sleep(500);
      helper.wait(commonHeaderPage.getCommonHeaderMenuItems().get(1), 'Presentations Common Header Menu Item');
      helper.clickWhenClickable(commonHeaderPage.getCommonHeaderMenuItems().get(1), 'Presentations Common Header Menu Item');
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');

      helper.wait(weeklyTemplatesPage.getWeeklyTemplatesMainPanel(), 'Notice View');
      expect(weeklyTemplatesPage.getWeeklyTemplatesMainPanel().isDisplayed()).to.eventually.be.true;
      expect(weeklyTemplatesPage.getWeeklyTemplatesExpandedView().isDisplayed()).to.eventually.be.true;
      expect(weeklyTemplatesPage.getWeeklyTemplatesNoticeView().isPresent()).to.eventually.be.false;
    });

    it('should close Weekly Template Panel',function(){
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      expect(weeklyTemplatesPage.getWeeklyTemplatesCloseButton().isDisplayed()).to.eventually.be.true;
      
      weeklyTemplatesPage.getWeeklyTemplatesCloseButton().click();
      browser.sleep(500);

      expect(weeklyTemplatesPage.getWeeklyTemplatesExpandedView().isPresent()).to.eventually.be.false;
      expect(weeklyTemplatesPage.getWeeklyTemplatesNoticeView().isDisplayed()).to.eventually.be.true;
    });

    it('should persist Weekly Template Panel state on page reload',function(){
      browser.refresh();
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      helper.wait(weeklyTemplatesPage.getWeeklyTemplatesNoticeView(), 'Notice View');
      expect(weeklyTemplatesPage.getWeeklyTemplatesExpandedView().isPresent()).to.eventually.be.false;
      expect(weeklyTemplatesPage.getWeeklyTemplatesNoticeView().isDisplayed()).to.eventually.be.true;
    });

    it('should expand Weekly Template Panel',function(){
      weeklyTemplatesPage.getWeeklyTemplatesNoticeView().click();
      browser.sleep(500);
      expect(weeklyTemplatesPage.getWeeklyTemplatesExpandedView().isDisplayed()).to.eventually.be.true;
      expect(weeklyTemplatesPage.getWeeklyTemplatesNoticeView().isPresent()).to.eventually.be.false;
    });

    it('should promote subscribing to Weekly Playbook',function(){
      expect(weeklyTemplatesPage.getSubscribeToPlaybookLink().isDisplayed()).to.eventually.be.true;
      expect(weeklyTemplatesPage.getSubscribeToPlaybookLink().getAttribute('target')).to.eventually.equal('_blank');
      expect(weeklyTemplatesPage.getSubscribeToPlaybookLink().getAttribute('href')).to.eventually.equal('https://www.risevision.com/weekly-playbook');
    });

    after(function() {
      commonHeaderPage.deleteCurrentCompany();
    });
  });
};

module.exports = WeeklyTemplatesScenarios;
