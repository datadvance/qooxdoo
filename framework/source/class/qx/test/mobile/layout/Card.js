/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tino Butz (tbtz)

************************************************************************ */

qx.Bootstrap.define("qx.test.mobile.layout.Card",
{
  extend : qx.test.mobile.MobileTestCase,

  members :
  {
    testAdd : function()
    {
      var composite = new qx.ui.mobile.Widget();
      composite.layout = new qx.ui.mobile.layout.Card();
      this.getRoot().append(composite);

      this.assertTrue(composite.hasClass("layout-card"));

      var widget1 = new qx.ui.mobile.Widget();
      composite.append(widget1);
      this.assertTrue(widget1.hasClass("layout-card-item"));

      var widget2 = new qx.ui.mobile.Widget();
      composite.append(widget2);
      this.assertTrue(widget2.hasClass("layout-card-item"));

      widget1.dispose();
      widget2.dispose();
      composite.dispose();
    },


    testRemove : function() {
      var composite = new qx.ui.mobile.Widget();
      composite.layout = new qx.ui.mobile.layout.Card();
      this.getRoot().append(composite);

      var widget1 = new qx.ui.mobile.Widget();
      composite.append(widget1);
      widget1.remove();
      this.assertFalse(widget1.hasClass("layout-card-item"));

      var widget2 = new qx.ui.mobile.Widget();
      composite.append(widget2);
      widget2.remove();
      this.assertFalse(widget2.hasClass("layout-card-item"));


      composite.remove();
      this.assertTrue(composite.hasClass("layout-card"));

      widget1.dispose();
      widget2.dispose();
      composite.dispose();
    },


    testReset : function() {
      var composite = new qx.ui.mobile.Widget();
      composite.layout = new qx.ui.mobile.layout.Card();
      this.getRoot().append(composite);

      composite.layout = null;
      this.assertFalse(composite.hasClass("layout-card"));

      composite.dispose();
    },


    testShow : function() {
      var composite = new qx.ui.mobile.Widget();
      composite.layout = new qx.ui.mobile.layout.Card();
      this.getRoot().append(composite);

      var widget1 = new qx.ui.mobile.Widget();
      composite.append(widget1);

      var widget2 = new qx.ui.mobile.Widget();
      composite.append(widget2);

      widget1.show();
      widget2.show();

      widget1.dispose();
      widget2.dispose();
      composite.dispose();
    }
  }

});
