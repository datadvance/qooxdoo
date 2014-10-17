module.exports = function(grunt) {

  var fs = require('fs');
  var glob = require("glob");
  var testPath = 'tests/website/**/*.js'; // website tests only
  // var testPath = 'tests/framework/**/*.js'; // framework tests only
  // var testPath = 'tests/**/*.js'; // all tests

  // process test HTML
  grunt.registerTask('html', 'A task to preprocess the website.html', function() {
    // read index file
    var index = fs.readFileSync('index.html', {encoding: 'utf8'});

    var tests = glob.sync(testPath);
    var scriptTags = '  <!-- TESTS START -->\n';
    tests.forEach(function(path) {
      // ignore all files starting with lower letter like setup.js
      if (path.indexOf("setup.js") != -1) {
        return;
      }
      scriptTags += '  <script src="' + path + '"></script>\n';
    });
    scriptTags += '  <!-- TESTS END -->';

    index = index.replace(/\s\s<!--\sTESTS\sSTART\s-->((.|\n)*)<!--\sTESTS\sEND\s-->/g, scriptTags);

    // write index file
    fs.writeFileSync('index.html', index, {'encoding': 'utf8'});
  });
};