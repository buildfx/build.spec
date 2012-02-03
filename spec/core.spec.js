var buildspec = require('../lib/core');
var path = require('path');

describe('core', function() {

  describe('loadTemplate', function() {
    it('returns the runner (handlebars) template', function() {
      var template = buildspec.loadTemplate(buildspec.makeTemplateFilepath());
      expect(template).toBeTruthy();
    });
  });


  describe('getJasmineCoreDir', function() {
    it('contains the jasmine runtime and stylesheet', function() {
      var jasmineCoreDir = buildspec.getJasmineCoreDir();
      var jasmineFiles = [ path.join(jasmineCoreDir, 'jasmine.css'),
			   path.join(jasmineCoreDir, 'jasmine.js'),
			   path.join(jasmineCoreDir, 'jasmine-html.js') ];


      jasmineFiles.forEach(function(f) {
	expect(path.existsSync(f)).toBeTruthy();
      });
    });
  });
});