'use strict';

angular.module('risevision.template-editor.directives')
  .directive('templateComponentLocalization', ['templateEditorFactory',
    function (templateEditorFactory) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/template-editor/components/component-localization.html',
        link: function ($scope, element) {
          $scope.factory = templateEditorFactory;

          function _load() {
            $scope.value = $scope.getAvailableAttributeData($scope.componentId, 'value');

            var languages = $scope.getAvailableAttributeData($scope.componentId, 'languages') || '?';
            $scope.languages = languages.split(',');
          }

          $scope.save = function () {
            $scope.setAttributeData($scope.componentId, 'value', $scope.value);
          };

          $scope.registerDirective({
            type: 'rise-data-localization',
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