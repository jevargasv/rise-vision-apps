'use strict';

angular.module('risevision.common.components.logging')
  .value('PRESENTATION_EVENTS_TO_BQ', [
    'Presentation Created',
    'New Presentation',
    'Template Copied',
    'HTML Template Copied'
  ])
  .factory('presentationTracker', ['userState', 'analyticsFactory',
    'bigQueryLogging', 'PRESENTATION_EVENTS_TO_BQ',
    function (userState, analyticsFactory, bigQueryLogging,
      PRESENTATION_EVENTS_TO_BQ) {
      return function (eventName, presentationId, presentationName) {
        if (eventName) {
          analyticsFactory.track(eventName, {
            presentationId: presentationId,
            presentationName: presentationName,
            companyId: userState.getSelectedCompanyId()
          });
          if (PRESENTATION_EVENTS_TO_BQ.indexOf(eventName) !== -1) {
            bigQueryLogging.logEvent(eventName, presentationId);
          }
        }
      };
    }
  ]);
