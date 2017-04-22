export default {
  init: (VueComponentContext) => {
    VueComponentContext.skipEvents = ['input', 'change', 'blur', 'focus'];
    VueComponentContext.userEvents = [];

    Object.keys(VueComponentContext.$options._parentListeners).forEach((e) => {
      if (VueComponentContext.skipEvents.indexOf(e) === -1) {
        let obj = {event: e, handler: null};
        VueComponentContext.userEvents.push(obj);
      }
    });
  },
  registerUserEvents: (VueComponentContext, HTMLDOM) => {
    // assumes component is mounted

    for (let i = 0; i < VueComponentContext.userEvents.length; i++) {
      VueComponentContext.userEvents[i].handler = (e) => {
        VueComponentContext.$emit(VueComponentContext.userEvents[i].event, e);
      };
      HTMLDOM.addEventListener(VueComponentContext.userEvents[i].event, VueComponentContext.userEvents[i].handler);
    }
  },
  unregisterUserEvents: (VueComponentContext, HTMLDOM) => {
    for (let i = 0; i < VueComponentContext.userEvents.length; i++) {
      HTMLDOM.removeEventListener(VueComponentContext.userEvents[i].event, VueComponentContext.userEvents[i].handler);
    }
  }
};
