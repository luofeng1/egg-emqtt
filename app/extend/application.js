'use strict';

const EmqttSymbol = Symbol('EGG-EMQTT#EMQTT');
const debug = require('debug')('egg-emqtt:app:extend:application.js');

module.exports = {
  get mqtt() {
    if (!this[EmqttSymbol]) {
      debug('[egg-emqtt] create Emqtt instance!');
      this[EmqttSymbol] = {};
    }
    return this[EmqttSymbol];
  },
};
