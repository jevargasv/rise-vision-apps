'use strict';

describe('directive: TemplateComponentImage', function() {
  var $scope,
      element,
      factory,
      timeout;

  beforeEach(function() {
    factory = { selected: { id: "TEST-ID" } };
  });

  beforeEach(module('risevision.template-editor.directives'));
  beforeEach(module('risevision.template-editor.controllers'));
  beforeEach(module('risevision.template-editor.services'));
  beforeEach(module('risevision.editor.services'));
  beforeEach(module(mockTranlate()));
  beforeEach(module(function ($provide) {
    $provide.service('templateEditorFactory', function() {
      return factory;
    });

    $provide.service('storageAPILoader', function() {
      return function() {
        return Promise.resolve({
          files: {
            get: function() {
              return {
                result: {
                  result: true,
                  files: [{
                    metadata: {
                      thumbnail: "http://thumbnail.png"
                    }
                  }]
                }
              };
            }
          }
        });
      };
    });
  }));

  beforeEach(inject(function($compile, $rootScope, $templateCache, $timeout){
    $templateCache.put('partials/template-editor/components/component-image.html', '<p>mock</p>');
    $scope = $rootScope.$new();

    $scope.registerDirective = sinon.stub();
    $scope.setAttributeData = sinon.stub();
    $scope.showNextPanel = sinon.stub();

    timeout = $timeout;
    element = $compile("<template-component-image></template-component-image>")($scope);
    $scope.$digest();
  }));

  it('should exist', function() {
    expect($scope).to.be.ok;
    expect($scope.factory).to.be.ok;
    expect($scope.factory).to.deep.equal({ selected: { id: "TEST-ID" } })
    expect($scope.registerDirective).to.have.been.called;

    var directive = $scope.registerDirective.getCall(0).args[0];
    expect(directive).to.be.ok;
    expect(directive.type).to.equal('rise-data-image');
    expect(directive.icon).to.equal('fa-image');
    expect(directive.show).to.be.a('function');
    expect(directive.onBackHandler).to.be.a('function');
  });

  it('should set image lists when available as attribute data', function() {
    var directive = $scope.registerDirective.getCall(0).args[0];
    var sampleImages = [
      { "file": "image.png", "thumbnail-url": "http://image" }
    ];

    $scope.getAttributeData = function() {
      return sampleImages;
    }

    directive.show();

    expect($scope.selectedImages).to.deep.equal(sampleImages);

    timeout.flush();
  });

  it('should get thumbnail URLs when not available as attribute data', function(done) {
    var TEST_FILE = 'risemedialibrary-7fa5ee92-7deb-450b-a8d5-e5ed648c575f/file1.png';
    var directive = $scope.registerDirective.getCall(0).args[0];

    $scope.getAttributeData = function() {
      return null;
    }
    $scope.getBlueprintData = function() {
      return TEST_FILE;
    }

    directive.show();
    timeout.flush();

    setTimeout(function() {
      var expectedMetadata = [
        {
          'file': TEST_FILE,
          'thumbnail-url': 'http://thumbnail.png'
        }
      ];

      expect($scope.selectedImages).to.deep.equal(expectedMetadata);

      expect($scope.setAttributeData).to.have.been.called.twice;

      expect($scope.setAttributeData.calledWith(
        'TEST-ID', 'metadata', expectedMetadata
      )).to.be.true;

      expect($scope.setAttributeData.calledWith(
        'TEST-ID', 'files', TEST_FILE
      )).to.be.true;

      done();
    }, 100);
  });

});
