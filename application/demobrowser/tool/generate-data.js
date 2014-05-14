/*global module, process*/
(function () {
  'use strict';

  // core
  var fs = require('fs');

  // 3rd party
  var async = require('async');
  var argv = require('optimist').argv;

  // own packages
  var DataGenerator = require('./lib/DataGenerator');

  // get parameters from console input
  var demoDataJsonPath = argv._.hasOwnProperty(0) ? argv._[0] : null;
  var demoPath = argv._.hasOwnProperty(1) ? argv._[1] : null;

  // global vars
  var config = {
    demoPath: demoPath || 'source/demo/',
    demoDataJsonFile: (demoDataJsonPath || 'source/script') + '/demodata.json',
    classPath: 'source/class',
    jsSourcePath: 'source/class/demobrowser/demo',
    demoConfigJsonFile: 'config.demo.json',
    verbose: argv.v === true
  };

  // main
  var dataGenerator = new DataGenerator(config);
  async.series([

    // catches all the demos from config.demoPath
    dataGenerator.catchEntries.bind(dataGenerator),

    // Creates json file with all demos
    dataGenerator.createJsonDataFile.bind(dataGenerator),

    // Create config.demo.json file with all the jobs
    dataGenerator.createJsonConfigFile.bind(dataGenerator),

    // copy all javascript files to config.scriptDestinationPath
    dataGenerator.copyJsFiles.bind(dataGenerator)
  ], function () {
    console.log('Demos successfully created');
  });
}());