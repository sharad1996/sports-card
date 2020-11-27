exports.triggerEvent = async (driver, eventName, query) => {
  if (query.indexOf("'") > -1) {
    throw new Error(`Unable to dispatch ${eventName} event`);
  }
  return await driver.executeScript(`
    var event = new MouseEvent('${eventName}', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    document.querySelector('${query}').dispatchEvent(event);
  `);
};
