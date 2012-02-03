Overview
========
Build.spec is a dev tool for creating a Jasmine-based test runner for your specs.
From a list of app, spec, and include .js files it creates a runner HTML file.


Settings
========
Configure your spec project in a buildspec.json file. These settings can be configured:

- runner_file (optional, default=buildspec_runner.html)

- app_src

- spec_src

- includes



runner_file
-----------
By default, Build.spec creates a runner file named 'buildspec_runner.html' in the same
directory as the buildspec.json settings file. You can override the default with the
runner_file setting.


app_src
-------
An array of the JavaScript files that must be tested.


spec_src
--------
An array of the Jasmine specs that will be exercised by the runner. 


includes
--------
An optional array of JavaScript files that the JavaScript files in app_src depend on.
For example, your JavaScript application files may depend on JQuery, Ember.js, etc.



Usage
=====
Run bin/buildspec to generate a runner HTML file that will execute all the specs
as described in the buildspec.json file.

Open the runner HTML file to run the specs.


Example
=======
See examples/simple.