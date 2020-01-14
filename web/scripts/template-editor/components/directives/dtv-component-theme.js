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

          $scope.registerDirective({
            type: 'rise-data-theme',
            iconType: 'streamline',
            icon: 'theme',
            element: element,
            show: function () {
              element.show();
              $scope.componentId = $scope.factory.selected.id;
            }
          });

        }
      };
    }
  ]);
