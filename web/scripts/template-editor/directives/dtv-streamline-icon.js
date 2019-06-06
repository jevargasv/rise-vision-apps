/*jshint maxlen: false */

'use strict';

angular.module('risevision.template-editor.directives')
  .directive('streamlineIcon', ['streamlineIconsList',
    function (iconsList) {
      return {
        restrict: 'E',
        scope: {
          name: '@',
          width: '@',
          height: '@'
        },
        link: function ($scope, element) {
          var _path = function (name) {
            var iconDef = iconsList[name];
            var width = $scope.width || 32;
            var height = $scope.height || 32;
            var size = ' width="' + width + '" height="' + height + '"';
            var viewBox = ' viewBox="' + iconDef.viewBox + '"';
            var paths = iconDef.paths.map(function (p) {
              return '<path d="' + p + '" />';
            }).join('\n');

            return '<svg xmlns="http://www.w3.org/2000/svg"' + size + viewBox + '>' + paths + '</svg>';
          };

          $scope.$watch('name', function (name) {
            if (name) {
              element.html(_path(name));
            }
          });
        }
      };
    }
  ])
  .constant('streamlineIconsList', {
    checkmark: {
      viewBox: '0 0 14 12',
      paths: [
        'M13.9113869,1.85205399 L12.1803988,0.0923193158 C12.1222419,0.033216301 12.0432758,0 11.9609254,0 C11.8785749,0 11.7996089,0.033216301 11.741452,0.0923193158 L4.43063103,7.508344 C4.37247413,7.56744702 4.29350804,7.60066332 4.21115761,7.60066332 C4.12880718,7.60066332 4.04984109,7.56744702 3.99168419,7.508344 L2.26069606,5.74860933 C2.20253916,5.68950632 2.12357307,5.65629002 2.04122263,5.65629002 C1.9588722,5.65629002 1.87990611,5.68950632 1.82174921,5.74860933 L0.0907610809,7.508344 C-0.0302536936,7.63105403 -0.0302536936,7.82996699 0.0907610809,7.95267701 L3.99168419,11.9076807 C4.04984109,11.9667837 4.12880718,12 4.21115761,12 C4.29350804,12 4.37247413,11.9667837 4.43063103,11.9076807 L13.9113869,2.29198766 C14.0295377,2.16979812 14.0295377,1.97424352 13.9113869,1.85205399 Z'
      ]
    },
    sun: {
      viewBox: '0 0 60 60',
      paths: [
        'M18.75,30a11.25,11.25 0 1,0 22.5,0a11.25,11.25 0 1,0 -22.5,0',
        'M30,14.5675 C31.3807119,14.5675 32.5,13.4482119 32.5,12.0675 L32.5,2.5 C32.5,1.11928813 31.3807119,0 30,0 C28.6192881,0 27.5,1.11928813 27.5,2.5 L27.5,12.0675 C27.5,13.4482119 28.6192881,14.5675 30,14.5675 Z',
        'M30,45.4375 C28.6192881,45.4375 27.5,46.5567881 27.5,47.9375 L27.5,57.5 C27.5,58.8807119 28.6192881,60 30,60 C31.3807119,60 32.5,58.8807119 32.5,57.5 L32.5,47.9375 C32.5,46.5567881 31.3807119,45.4375 30,45.4375 Z',
        'M15.5475,19.09 C16.5336082,20.0418515 18.0963918,20.0418515 19.0825,19.09 C20.0584548,18.1137504 20.0584548,16.5312496 19.0825,15.555 L12.3325,8.7875 C11.3556463,7.80857528 9.77017472,7.80689635 8.79125,8.78375 C7.81232528,9.76060365 7.81064635,11.3460753 8.7875,12.325 L15.5475,19.09 Z',
        'M44.4475,40.915 C43.4665528,39.9675695 41.9072881,39.9811191 40.9429536,40.9454536 C39.9786191,41.9097881 39.9650695,43.4690528 40.9125,44.45 L47.6775,51.2175 C48.663082,52.1706532 50.226918,52.1706532 51.2125,51.2175 C52.1884548,50.2412504 52.1884548,48.6587496 51.2125,47.6825 L44.4475,40.915 Z',
        'M14.565,31.25 C14.565,29.8692881 13.4457119,28.75 12.065,28.75 L2.5,28.75 C1.11928813,28.75 0,29.8692881 0,31.25 C0,32.6307119 1.11928813,33.75 2.5,33.75 L12.065,33.75 C13.4457119,33.75 14.565,32.6307119 14.565,31.25 Z',
        'M57.5,28.75 L47.935,28.75 C46.5542881,28.75 45.435,29.8692881 45.435,31.25 C45.435,32.6307119 46.5542881,33.75 47.935,33.75 L57.5,33.75 C58.8807119,33.75 60,32.6307119 60,31.25 C60,29.8692881 58.8807119,28.75 57.5,28.75 Z',
        'M15.5475,40.915 L8.7975,47.6825 C7.82154515,48.6587496 7.82154515,50.2412504 8.7975,51.2175 C9.78308205,52.1706532 11.346918,52.1706532 12.3325,51.2175 L19.0825,44.4525 C20.0299305,43.4715528 20.0163809,41.9122881 19.0520464,40.9479536 C18.0877119,39.9836191 16.5284472,39.9700695 15.5475,40.9175 L15.5475,40.915 Z',
        'M42.68,19.8075424 C43.3408416,19.8113453 43.9763231,19.5533776 44.4475,19.09 L51.2125,12.325 C52.1893536,11.3488367 52.1899132,9.76560367 51.21375,8.78875004 C50.2375867,7.8118964 48.6543537,7.81133674 47.6775,8.7875 L40.9125,15.555 C40.1947829,16.2662723 39.9792189,17.3413125 40.3672332,18.2743029 C40.7552474,19.2072932 41.669569,19.812434 42.68,19.805 L42.68,19.8075424 Z'
      ]
    }
  });