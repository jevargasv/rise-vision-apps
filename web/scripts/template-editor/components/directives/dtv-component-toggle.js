'use strict';

angular.module('risevision.template-editor.directives')
  .directive('templateComponentToggle', ['templateEditorFactory', 'blueprintFactory',
    function (templateEditorFactory, blueprintFactory) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/template-editor/components/component-toggle.html',
        link: function ($scope, element) {
          $scope.factory = templateEditorFactory;

          function _load() {
            $scope.value = $scope.getAvailableAttributeData($scope.componentId, 'value');

            var component = blueprintFactory.getComponent($scope.componentId);
            $scope.label = component ? component.label : '??????';
          }

          $scope.save = function () {
            $scope.setAttributeData($scope.componentId, 'value', $scope.value);
          };

          $scope.registerDirective({
            type: 'rise-data-toggle',
            iconType: 'streamline',
            icon: 'text',
            element: element,
            show: function () {
              $scope.componentId = $scope.factory.selected.id;
              _load();
            }
          });

        }
      };
    }
  ]);
