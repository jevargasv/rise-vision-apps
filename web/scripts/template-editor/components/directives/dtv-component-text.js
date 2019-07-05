'use strict';

angular.module('risevision.template-editor.directives')
  .directive('templateComponentText', ['templateEditorFactory',
    function (templateEditorFactory) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/template-editor/components/component-text.html',
        link: function ($scope, element) {
          $scope.factory = templateEditorFactory;

          function _load() {
            $scope.value = $scope.getAvailableAttributeData($scope.componentId, 'value');
          }

          $scope.save = function () {
            $scope.setAttributeData($scope.componentId, 'value', $scope.value);
          };

          $scope.registerDirective({
            type: 'rise-text',
            iconType: 'svg',
            icon: '<g id="Group-2" transform="translate(13.000000, 0.000000)" fill="#4D4D4D" fill-rule="nonzero">' +
              '<path d="M9,1.82979622 L9,0.424139867 C9,0.193197802 8.81458594,0.00518164004 8.58367969,0.00229881931 C7.43980078,-0.0121152843 5.85242578,0.000365220041 4.5,1.3344784 C3.17341406,0.025853574 1.65160547,-0.00402932375 0.418816406,0.00398632413 C0.186960937,0.00549804719 0,0.194006398 0,0.425862528 L0,1.81963604 C0,2.05472655 0.191882812,2.24425444 0.426972656,2.24144193 C1.33983984,2.23054346 3.375,2.36399697 3.375,3.94388819 L3.375,7.87500098 L2.109375,7.87500098 C1.87639453,7.87500098 1.6875,8.06389605 1.6875,8.29687718 L1.6875,9.70313119 C1.6875,9.93611233 1.87639453,10.1250074 2.109375,10.1250074 L3.375,10.1250074 L3.375,14.0625186 C3.375,15.6421638 1.40361328,15.7511133 0.423632812,15.748582 C0.189984375,15.7479844 0,15.936563 0,16.1702122 L0,17.5758685 C0,17.8068106 0.185414062,17.9948267 0.416320312,17.9977096 C1.56019922,18.0120885 3.14757422,17.999608 4.5,16.6654948 C5.82658594,17.9741196 7.34839453,18.0040025 8.58118359,17.9959869 C8.81303906,17.9944752 9,17.8059668 9,17.5741107 L9,16.1803372 C9,15.9452467 8.80811719,15.7557188 8.57302734,15.7585313 C7.66016016,15.7694649 5.625,15.6424099 5.625,14.0625186 L5.625,10.1250074 L6.890625,10.1250074 C7.12360547,10.1250074 7.3125,9.93611233 7.3125,9.70313119 L7.3125,8.29687718 C7.3125,8.06389605 7.12360547,7.87500098 6.890625,7.87500098 L5.625,7.87500098 L5.625,3.94388819 C5.625,2.36424306 7.59638672,2.24889508 8.57636719,2.25139118 C8.81001562,2.25202399 9,2.06344533 9,1.82979622 Z" id="Shape"></path>' +
              '</g>' +
              '<path d="M0.564255319,3 L10.7208511,3 C11.0324963,3 11.2851064,3.19186607 11.2851064,3.42857143 L11.2851064,6 C11.2851064,6.23670536 11.0324963,6.42857143 10.7208511,6.42857143 L9.46905064,6.42857143 C9.15740537,6.42857143 8.90479532,6.23670536 8.90479532,6 L8.90479532,4.71428571 L6.97359622,4.71428571 L6.97359622,13.2857143 L8.18170213,13.2857143 C8.49334739,13.2857143 8.74595745,13.4775804 8.74595745,13.7142857 L8.74595745,14.5714286 C8.74595745,14.8081339 8.49334739,15 8.18170213,15 L3.10340426,15 C2.79175899,15 2.53914894,14.8081339 2.53914894,14.5714286 L2.53914894,13.7142857 C2.53914894,13.4775804 2.79175899,13.2857143 3.10340426,13.2857143 L4.31151016,13.2857143 L4.31151016,4.71428571 L2.38031106,4.71428571 L2.38031106,6 C2.38031106,6.23670536 2.12770101,6.42857143 1.81605574,6.42857143 L0.564255319,6.42857143 C0.252610053,6.42857143 0,6.23670536 0,6 L0,3.42857143 C0,3.19186607 0.252610053,3 0.564255319,3 Z" id="Shape" fill="#4D4D4D" fill-rule="nonzero"></path>',
            element: element,
            show: function () {
              element.show();
              $scope.componentId = $scope.factory.selected.id;
              _load();
            }
          });

        }
      };
    }
  ]);
