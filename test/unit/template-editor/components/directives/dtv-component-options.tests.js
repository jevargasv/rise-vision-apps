'use strict';

describe('directive: templateComponentOptions', function() {
  var $scope,
      element,
      factory;

  beforeEach(function() {
    factory = { selected: { id: "TEST-ID" } };
  });

  beforeEach(module('risevision.template-editor.directives'));
  beforeEach(module('risevision.template-editor.controllers'));
  beforeEach(module('risevision.template-editor.services'));
  beforeEach(module('risevision.editor.services'));
  beforeEach(module(mockTranslate()));
  beforeEach(module(function ($provide) {
    $provide.service('templateEditorFactory', function() {
      return factory;
    });
  }));

  beforeEach(inject(function($compile, $rootScope, $templateCache){
    $templateCache.put('partials/template-editor/components/component-options.html', '<p>mock</p>');
    $scope = $rootScope.$new();

    $scope.registerDirective = sinon.stub();
    $scope.setAttributeData = sinon.stub();

    element = $compile("<template-component-options></template-component-options>")($scope);
    $scope = element.scope();
    $scope.$digest();
  }));

  it('should exist', function() {
    expect($scope).to.be.ok;
    expect($scope.factory).to.be.ok;
    expect($scope.factory).to.deep.equal({ selected: { id: "TEST-ID" } })
    expect($scope.registerDirective).to.have.been.called;

    var directive = $scope.registerDirective.getCall(0).args[0];
    expect(directive).to.be.ok;
    expect(directive.type).to.equal('rise-data-options');
    expect(directive.iconType).to.equal('streamline');
    expect(directive.icon).to.exist;
    expect(directive.show).to.be.a('function');
  });

  it('should load value and options from attribute data', function() {
    var directive = $scope.registerDirective.getCall(0).args[0];

    $scope.getAvailableAttributeData = function(componentId, key) {
      switch(key) {
        case 'value': return 'left';
        case 'options': return 'left,right,middle';
      }
      return null;
    }

    directive.show();

    expect($scope.componentId).to.equal("TEST-ID");
    expect($scope.value).to.equal('left');
    expect($scope.options).to.deep.equal(['left', 'right', 'middle']);
  });

  it('should save value to attribute data', function() {
    var directive = $scope.registerDirective.getCall(0).args[0];

    $scope.getAvailableAttributeData = function() {
      return "left";
    }

    directive.show();

    $scope.value = "right";

    $scope.save();

    expect($scope.setAttributeData.calledWith(
      "TEST-ID", "value", "right"
    )).to.be.true;
  });

});
