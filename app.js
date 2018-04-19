'use strict';

const emqtt = require('./lib/emqtt');

module.exports = app => {
    if (app.config.emqtt) emqtt(app);
};
