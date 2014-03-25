/* *****************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2014 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Richard Sternagel (rsternagel)

***************************************************************************** */

'use strict';

module.exports = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  getManifestContents: function (test) {
    var libraries = require('../lib/libraries.js');
    var testManifestPaths = [
      "./test/data/myapp/Manifest.json",
      "./test/data/framework/Manifest.json"
    ];

    console.log(libraries.getPathsFromManifest(testManifestPaths));

    console.log(libraries.getPathsFor("class", testManifestPaths, {withKeys: true}));
    console.log(libraries.getPathsFor("resource", testManifestPaths, {withKeys: true}));
    console.log(libraries.getPathsFor("translation", testManifestPaths, {withKeys: true}));

    console.log(libraries.getPathsFor("class", testManifestPaths));
    console.log(libraries.getPathsFor("resource", testManifestPaths));
    console.log(libraries.getPathsFor("translation", testManifestPaths));

    test.ok(true);
    test.done();
  }
};
