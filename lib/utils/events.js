'use strict';

exports.__esModule = true;
exports.default = {
  init: function init(VueComponentContext) {
    VueComponentContext.skipEvents = ['input', 'change', 'blur', 'focus'];
    VueComponentContext.userEvents = [];

    Object.keys(VueComponentContext.$options._parentListeners).forEach(function (e) {
      if (VueComponentContext.skipEvents.indexOf(e) === -1) {
        var obj = { event: e, handler: null };
        VueComponentContext.userEvents.push(obj);
      }
    });
  },
  registerUserEvents: function registerUserEvents(VueComponentContext, HTMLDOM) {
    var _loop = function _loop(i) {
      VueComponentContext.userEvents[i].handler = function (e) {
        VueComponentContext.$emit(VueComponentContext.userEvents[i].event, e);
      };
      HTMLDOM.addEventListener(VueComponentContext.userEvents[i].event, VueComponentContext.userEvents[i].handler);
    };

    // assumes component is mounted

    for (var i = 0; i < VueComponentContext.userEvents.length; i++) {
      _loop(i);
    }
  },
  unregisterUserEvents: function unregisterUserEvents(VueComponentContext, HTMLDOM) {
    for (var i = 0; i < VueComponentContext.userEvents.length; i++) {
      HTMLDOM.removeEventListener(VueComponentContext.userEvents[i].event, VueComponentContext.userEvents[i].handler);
    }
  }
};