'use strict';
describe('directive: scheduleFields', function() {
  var $scope, $rootScope, playlistFactory, $modal;
  var classicPres1 = { name: 'classic1' };
  var classicPres2 = { name: 'classic2' };
  var htmlPres1 = { name: 'html1', presentationType: 'HTML Template' };
  var items = [ classicPres1, classicPres2, htmlPres1 ];
  var element;

  beforeEach(module('risevision.editor.services'));
  beforeEach(module('risevision.schedules.directives'));
  beforeEach(module(mockTranslate()));
  beforeEach(module(function ($provide) {
    $provide.service('$modal', function() {
      return {
        open: sinon.stub()
      };
    });
    $provide.service('playlistFactory', function() {
      return {
        getNewUrlItem: sinon.stub().returns('urlItem'),
        addPresentationItems: sinon.spy()
      };
    });
    $provide.service('scheduleFactory', function() {
      return {
        getPreviewUrl: function () {
          return 'previewUrl';
        }
      };
    });
  }));

  beforeEach(inject(function($compile, _$rootScope_, $templateCache, $injector){
    $modal = $injector.get('$modal');
    playlistFactory = $injector.get('playlistFactory');

    $templateCache.put('partials/schedules/schedule-fields.html', '<p>mock</p>');
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $scope.schedule = {};

    element = $compile('<schedule-fields></schedule-fields>')($scope);
    $rootScope.$digest();
  }));

  it('should exist', function() {
    expect($scope).to.be.ok;

    expect($scope.addUrlItem).to.be.a('function');
    expect($scope.addPresentationItem).to.be.a("function");
    expect($scope.isPreviewAvailable).to.be.a('function');

    expect($scope.previewUrl).to.equal('previewUrl');
  });

  it('addUrlItem:', function() {
    $scope.addUrlItem();

    $modal.open.should.have.been.calledWithMatch({
      templateUrl: 'partials/schedules/playlist-item.html',
      controller: 'playlistItemModal',
      size: 'md'
    });

    expect($modal.open.getCall(0).args[0].resolve.playlistItem()).to.equal('urlItem');
  });

  it('addPresentationItem:', function(done) {
    $modal.open.returns({result: Q.resolve('presentations')});

    $scope.addPresentationItem();

    $modal.open.should.have.been.calledWithMatch({
      templateUrl: 'partials/editor/presentation-multi-selector-modal.html',
      controller: 'PresentationMultiSelectorModal'
    });

    setTimeout(function() {
      playlistFactory.addPresentationItems.should.have.been.calledWith('presentations');

      done();
    }, 10);

  });

  describe('isPreviewAvailable:', function() {
    it('should have Preview button available', function() {
      $scope.schedule.content = [];
      expect($scope.isPreviewAvailable()).to.be.true;
      $scope.schedule.content = [ classicPres1, classicPres2 ];
      expect($scope.isPreviewAvailable()).to.be.true;
    });

    it('should not have Preview button available', function() {
      $scope.schedule.content = [ htmlPres1 ];
      expect($scope.isPreviewAvailable()).to.be.false;
      $scope.schedule.content = [ classicPres1, htmlPres1 ];
      expect($scope.isPreviewAvailable()).to.be.false;
      $scope.schedule.content = [ classicPres1, classicPres2, htmlPres1 ];
      expect($scope.isPreviewAvailable()).to.be.false;
    });
  });
});
