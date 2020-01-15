'use strict';

angular.module('risevision.template-editor.services')
  .factory('blueprintFactory', ['$http', 'BLUEPRINT_URL',
    function ($http, BLUEPRINT_URL) {
      var factory = {};

      factory.load = function (productCode) {
        var url = BLUEPRINT_URL.replace('PRODUCT_CODE', productCode);

        return $http.get(url)
          .then(function (response) {
            factory.blueprintData = response.data;

            return factory.blueprintData;
          });
      };

      factory.isPlayUntilDone = function () {
        return !!(factory.blueprintData && factory.blueprintData.playUntilDone);
      };

      factory.hasBranding = function () {
        return (!!factory.blueprintData && factory.blueprintData.branding === true);
      };

      factory.getComponent = function (componentId) {
        var components = factory.blueprintData.components;

        return _.find(components, {
          id: componentId
        });
      }

      factory.getBlueprintData = function (componentId, attributeKey) {
        var component = factory.getComponent(componentId);

        if (!component || !component.attributes) {
          return null;
        }

        var attributes = component.attributes;

        // if the attributeKey is not provided, it returns the full attributes structure
        if (!attributeKey) {
          return attributes;
        }

        var attribute = attributes[attributeKey];
        return attribute && attribute.value;
      };

      factory.getLogoComponents = function () {
        var components = factory.blueprintData.components;

        return _.filter(components, function (c) {
          return c.type === 'rise-image' && (c.attributes && c.attributes['is-logo'] && c
            .attributes['is-logo'].value === 'true');
        });
      };

      return factory;
    }
  ]);
