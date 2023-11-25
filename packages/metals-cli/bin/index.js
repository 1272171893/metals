#!/usr/bin/env node
console.log("tirion cli");

const { register } = require("esbuild-register/dist/node");
const { unregister } = register({
  // ...options
});

require("../src/index.ts");

unregister();
