'use strict';

const debug = require('debug')('egg-emqtt:lib:loader.js');
const path = require('path');

module.exports = app => {
  let dirs = app.loader.getLoadUnits().map(unit => path.join(unit.path, 'app', 'mqtt', 'middleware'));

  app.mqtt.middleware = app.mqtt.middleware || {};
  new app.loader.FileLoader({
    directory: dirs,
    target: app.mqtt.middleware,
    inject: app,
  }).load();

  /* istanbul ignore next */
  app.mqtt.__defineGetter__('middlewares', () => {
    app.deprecate('app.mqtt.middlewares has been deprecated, please use app.mqtt.middleware instead!');
    return app.mqtt.middleware;
  });

  debug('[egg-mqtt] app.mqtt.middleware:', app.mqtt.middleware);

  dirs = app.loader.getLoadUnits().map(unit => path.join(unit.path, 'app', 'mqtt', 'controller'));

  app.mqtt.controller = app.mqtt.controller || {};
  app.loader.loadController({
    directory: dirs,
    target: app.mqtt.controller,
  });

  /* istanbul ignore next */
  app.mqtt.__defineGetter__('controllers', () => {
    app.deprecate('app.mqtt.controllers has been deprecated, please use app.mqtt.controller instead!');
    return app.mqtt.controller;
  });
  debug('[egg-mqtt] app.mqtt.controller:', app.mqtt.controller);
};
