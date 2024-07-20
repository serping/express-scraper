"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// app/middleware/index.ts
var middleware_exports = {};
__export(middleware_exports, {
  authByApiKey: () => authByApiKey
});
module.exports = __toCommonJS(middleware_exports);

// app/middleware/authByApiKey.ts
var authByApiKey = (req, res, next) => {
  let { token } = req.query;
  const apiTokenHeader = req.headers["x-api-key"];
  const apiToken = process.env.SECRET_API_KEY;
  if (!token) {
    token = apiTokenHeader;
  }
  if (!token) {
    return res.status(403).json({ error: "Unauthorized", message: "Missing x-api-key" });
  }
  if (apiToken !== token) {
    return res.status(403).json({ error: "Unauthorized", message: "x-api-key not match" });
  }
  delete req.headers["x-api-key"];
  next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authByApiKey
});
