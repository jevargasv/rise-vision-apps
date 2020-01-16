'use strict';

angular.module('risevision.template-editor.directives')
  .directive('templateComponentTheme', ['templateEditorFactory',
    function (templateEditorFactory) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/template-editor/components/component-theme.html',
        link: function ($scope, element) {
          $scope.factory = templateEditorFactory;

          $scope.save = function () {
            $scope.setAttributeData($scope.componentId, 'theme', $scope.theme);
            $scope.setAttributeData($scope.componentId, 'override', $scope.override);
          };

          $scope.registerDirective({
            type: 'rise-data-theme',
            iconType: 'streamline',
            icon: 'theme',
            element: element,
            show: function () {
              element.show();
              $scope.componentId = $scope.factory.selected.id;
              $scope.load();
            }
          });

          $scope.load = function () {
            const themes = $scope.getAvailableAttributeData($scope.componentId, 'themes');

            $scope.themes = themes ? JSON.parse(themes) : [];
            $scope.theme = $scope.getAvailableAttributeData($scope.componentId, 'theme');
            $scope.override = $scope.getAvailableAttributeData($scope.componentId, 'override');
          };

        }
      };
    }
  ]);
