'use strict';

angular.module('risevision.template-editor.directives')
  .directive('templateComponentRange', ['templateEditorFactory',
    function (templateEditorFactory) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/template-editor/components/component-range.html',
        link: function ($scope, element) {
          $scope.factory = templateEditorFactory;

          function _load() {
            $scope.min = $scope.getAvailableAttributeData($scope.componentId, 'min');
            $scope.max = $scope.getAvailableAttributeData($scope.componentId, 'max');
            $scope.value = $scope.getAvailableAttributeData($scope.componentId, 'value');
          }

          $scope.save = function () {
            $scope.setAttributeData($scope.componentId, 'value', $scope.value);
          };

          $scope.registerDirective({
            type: 'rise-data-range',
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