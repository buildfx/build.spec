var buildfx = require('../build.fx/core');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

var possibleSettings = ['runner_file', 'includes', 'app_src', 'spec_src', 'stylesheets'];
var settings;
var settingsFile = 'buildspec.json';
var templateFilename = 'runner.handlebars';
var template;


function applyDefaultSettings(theSettings) {
  theSettings.runner_file = theSettings.runner_file || 'buildspec_runner.html';
  return theSettings;
}


function buildSpecRunner(after) {
  console.log('\nBuilding spec runner...');
  var jasmineCoreDir = getJasmineCoreDir();
  var context = {
    jasmine_stylesheet_href: path.join(jasmineCoreDir, 'jasmine.css'),
    jasmine_js_src: path.join(jasmineCoreDir, 'jasmine.js'),
    jasmine_html_js_src: path.join(jasmineCoreDir, 'jasmine-html.js'),
    includes: settings.includes,
    appfiles: settings.app_src,
    specfiles: settings.spec_src,
    stylesheets: settings.stylesheets
  };

  var runnerHtml = template(context);
  var outdir = path.dirname(path.resolve(process.cwd(), settings.runner_file));
  
  buildfx.ensureDir(outdir);
  fs.writeFileSync(settings.runner_file, runnerHtml);
  console.log('Spec runner at: %s', settings.runner_file);  
}


function loadTemplate(templateFilepath) {
  var source;
  var template;
  console.log('Loading runner template file: %s', templateFilepath);
  source = fs.readFileSync(templateFilepath).toString();
  template = handlebars.compile(source);
  return template;
}


function getJasmineCoreDir() {
  var moduleDir = path.dirname(module.filename);
  var jasmineCoreDir = path.resolve(moduleDir, '../jasmine/lib/jasmine-core');
  return jasmineCoreDir;
}

function makeTemplateFilepath() {
  var moduleDir = path.dirname(module.filename);
  var templateFilepath = path.join(moduleDir, templateFilename);
  return templateFilepath;
}


function main() {
  var hasWatchCommandlineArg = buildfx.hasCommandlineArg('watch');
  
  console.log('\nbuild.spec \t\t\t version %s', exports.version);
  console.log('Copyright (c) 2012, Joubert Nel');

  try {
    template = loadTemplate(makeTemplateFilepath());
    handlebars.compile(template);
  } catch (e) {
    console.error(e.toString());
    process.exit(1);
  }

  settings = applyDefaultSettings(buildfx.loadSettings(settingsFile));
  buildfx.printSettings(settings, possibleSettings);

  if (hasWatchCommandlineArg) {
    buildSpecRunner(function() {
      var appAndSpecFiles = settings.app_src.concat(settings.spec_src, settings.stylesheets);
      buildfx.watchForUpdates(appAndSpecFiles, buildSpecRunner);
    });
  } else {
    buildSpecRunner();
  }
}



exports.version = '0.0.3';
exports.main = main;
exports.getJasmineCoreDir = getJasmineCoreDir;
exports.loadTemplate = loadTemplate;
exports.makeTemplateFilepath = makeTemplateFilepath;
