"use strict";
import Koa from "koa";
import KoaRouter from "koa-router";
import { scopePerRequest, makeInvoker } from "awilix-koa";
import container from "./awilix.js";
import koaBodyImport from "koa-body";
import cors from "koa2-cors";
import fs from 'fs';
import path from 'path'
import serve from 'koa-static';
//TO REMOVE IN FUTURE
if (process.env.UPLOAD_PATH) {
  if (!fs.existsSync(process.env.UPLOAD_PATH)) {
    console.log('CREATE FOLDER');
    fs.mkdirSync(process.env.UPLOAD_PATH);
  }
}
// @ts-ignore
let koaBody = koaBodyImport();
//const cqrsPreprocess =require( './Architecture/cqrsPreprocess');
const app = new Koa();
const router = new KoaRouter();

app.use(serve(__dirname + '/web'));
//app.use(cors());
app.use(cors({
  origin: 'http://localhost:8080',
  allowMethods: ['GET', 'POST', 'DELETE'],
}));

// This installs a scoped container into our
// context - we will use this to register our current user!
// @ts-ignore
app.use(scopePerRequest(container));
// Let's do that now!
app.use((ctx, next) => {
  ctx.state.container.registerValue({
    // Imagine some auth middleware somewhere...
    // This makes currentUser available to all services!
    // currentUser: ctx.state.user
  });
  return next();
});

const cqrsPreprocess = () => {
  const commandExec = async ctx => {
    const body = ctx.request.body;
    const action = ctx.state.container.resolve(body.action);
    action.init(body.model);
    await cqrsHandler(action, ctx);
  };
  const queryExec = async ctx => {
    const query = JSON.parse(ctx.request.query.action);
    const action = ctx.state.container.resolve(query.action);
    action.init(query.model);
    return await cqrsHandler(action, ctx);
  };

  const cqrsHandler = async (action, ctx) => {
    let result = null;
    try {
      let token = ctx.request.header.authorization;
      let lang = ctx.request.header.language;
      action.token = token;
      action.language = lang;
      action.context.language = lang;
      result = await action.run();
      ctx.body = result;
      ctx.status = 200;
    } catch (exception) {
      ctx.body = exception;
      ctx.status = 400; // Number(exception.Status);
    }
    return ctx;
  };
  return {
    queryExecAsync: async ctx => {
      return await queryExec(ctx);
    },
    queryExec,
    commandExec,
    commandExecAsync: async ctx => {
      return await commandExec(ctx);
    },
    cqrsHandler
  };
};

const api = makeInvoker(cqrsPreprocess);
router.get("/query", api("queryExecAsync"));
router.post("/command", koaBody, api("commandExecAsync"));
app.use(router.routes());
app.listen(process.env.PORT || 1337);

module.exports = cqrsPreprocess;
