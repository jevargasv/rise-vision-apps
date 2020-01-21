'use strict';

angular.module('risevision.template-editor.directives')
  .directive('templateComponentOptions', ['templateEditorFactory',
    function (templateEditorFactory) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/template-editor/components/component-options.html',
        link: function ($scope, element) {
          $scope.factory = templateEditorFactory;

          function _load() {
            $scope.value = $scope.getAvailableAttributeData($scope.componentId, 'value');

            var options = $scope.getAvailableAttributeData($scope.componentId, 'options') || '?';
            $scope.options = options.split(',');
          }

          $scope.save = function () {
            $scope.setAttributeData($scope.componentId, 'value', $scope.value);
          };

          $scope.registerDirective({
            type: 'rise-data-options',
            iconType: 'streamline',
            icon: 'options',
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
