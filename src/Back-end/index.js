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
import CircularJSON from 'circular-json';
import { URL } from "url";

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

app.use(cors());


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
    let model = {};
    if (typeof (body.model) == "object") {
      model = body.model
    } else {
      model = JSON.parse(unescape(body.model));
    }
    action.init(model);
    await cqrsHandler(action, ctx);
  };
  const queryExec = async ctx => {

    const query = JSON.parse(ctx.request.query.action);
    const action = ctx.state.container.resolve(query.action);
    let model = {};
    if (typeof (query.model) == "object") {
      model = query.model
    } else {
      model = JSON.parse(unescape(query.model));
    }
    action.init(model);
    return await cqrsHandler(action, ctx);
  };

  const cqrsHandler = async (action, ctx) => {
    let result = null;
    try {
      let token = ctx.request.header.authorization;
      let lang = ctx.request.header.language;
      action.token = token;
      action.referer = ctx.request.header.referer ? (new URL(ctx.request.header.referer)).origin : 'http://localhost.8080'
      action.language = lang;
      action.context.language = lang;
      result = await action.run();
      ctx.body = CircularJSON.stringify(result);;
      ctx.status = 200;
    } catch (exception) {
      ctx.body = CircularJSON.stringify(exception);;
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
