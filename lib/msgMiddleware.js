'use strict';

const http = require('http');
const compose = require('koa-compose');
const eggUtil = require('egg-core').utils;

module.exports = (app, request, packetMiddlewares, next) => {
  const ctx = app.createContext(request, new http.ServerResponse(request));
  ctx.method = request.method;
  ctx.url = request.topic;
  ctx.userId = request.userId;
  ctx.starttime = Date.now();

  packetMiddlewares = packetMiddlewares.map(mw => eggUtil.middleware(mw));
  const composed = compose(packetMiddlewares);

  composed(ctx, async () => {
    next();
  })
    .catch(e => {
      next(e);
      app.coreLogger.error(e);
    });
};
