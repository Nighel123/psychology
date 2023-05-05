#!/usr/bin/env node 

const repl = require("repl");
const {Björn, Klaus, Rumo} = require("./modules/Helpers").helpers
const c = console.log

//var first = await helpers.Björn.Fragen("Why did you never showed me that you loved me?")
//
//c(first)
//
c(Björn.Fragen('\nMe: "Would you like to know how I feel?"'))
//
//c(second)
//Object.assign(repl.start().context, helpers)

