#!/usr/bin/env node 

const repl = require("repl");
const helpers = require("./modules/Helpers").helpers
const c = console.log

//var first = await helpers.Björn.Fragen("Why did you never showed me that you loved me?")
//
//c(first)
//
c(helpers.Björn.Fragen("Why did you never showed me that you loved me?"))
//
//c(second)
//Object.assign(repl.start().context, helpers)

