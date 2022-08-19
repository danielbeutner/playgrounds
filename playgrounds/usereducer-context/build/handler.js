"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var express = require("express");
var node = require("@graphql-yoga/node");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var express__default = /* @__PURE__ */ _interopDefaultLegacy(express);
(function dedupeRequire(dedupe) {
  const Module = require("module");
  const resolveFilename = Module._resolveFilename;
  Module._resolveFilename = function(request, parent, isMain, options) {
    if (request[0] !== "." && request[0] !== "/") {
      const parts = request.split("/");
      const pkgName = parts[0][0] === "@" ? parts[0] + "/" + parts[1] : parts[0];
      if (dedupe.includes(pkgName)) {
        parent = module;
      }
    }
    return resolveFilename(request, parent, isMain, options);
  };
})(["react", "react-dom"]);
const app = express__default["default"]();
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;
const resolvers = {
  Query: {
    hello: (_, { name }) => {
      if (name)
        return `Hello, ${name}!`;
      return "Hello, World!";
    }
  }
};
const graphQLServer = node.createServer({
  schema: {
    typeDefs,
    resolvers
  }
});
app.use("/graphql", graphQLServer);
const handler = app;
exports.handler = handler;
