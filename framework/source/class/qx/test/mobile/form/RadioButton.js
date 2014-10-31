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

qx.Class.define("qx.test.mobile.form.RadioButton",
{
  extend : qx.test.mobile.MobileTestCase,

  members :
  {

    testConstruct : function() {
      var radio1 = new qx.ui.form.RadioButton();
      var radio2 = new qx.ui.form.RadioButton();
      var radio3 = new qx.ui.form.RadioButton();
      var group = new qx.ui.form.RadioGroup(radio1,radio2,radio3);

      this.getRoot().append(radio1);
      this.getRoot().append(radio2);
      this.getRoot().append(radio3);

      // Verify: allow empty selection can only be false in this case,
      // so radio1 has to be true.
      this.assertEquals(true, radio1.getValue(),"Radio1 is expected to be true.");
      this.assertEquals(false, radio2.getValue(),"Radio2 is expected to be false.");
      this.assertEquals(false, radio3.getValue(),"Radio3 is expected to be false.");

      this.assertEquals(3, group.getItems().length);

       // Clean up tests
      radio1.dispose();
      radio2.dispose();
      radio3.dispose();
      group.dispose();
    },

    testValue : function()
    {
      var radio1 = new qx.ui.form.RadioButton();
      var radio2 = new qx.ui.form.RadioButton();
      var radio3 = new qx.ui.form.RadioButton();

      var group = new qx.ui.form.RadioGroup();
      group.allowEmptySelection = true;
      group.add(radio1,radio2,radio3);

      this.getRoot().append(radio1);
      this.getRoot().append(radio2);
      this.getRoot().append(radio3);

      // Verify: inital all radios buttons should be disabled.
      this.assertEquals(false, radio1.getValue());
      this.assertEquals(false, radio2.getValue());
      this.assertEquals(false, radio3.getValue());

      this.assertEquals(false, radio1.hasClass("checked"));
      this.assertEquals(false, radio2.hasClass("checked"));
      this.assertEquals(false, radio3.hasClass("checked"));

      // Radio 1 enabled
      radio1.setValue(true);

      // Verify
      this.assertEquals(true, radio1.getValue());
      this.assertEquals(true, radio1.hasClass("checked"));
      this.assertEquals(false, radio2.getValue());
      this.assertEquals(false, radio3.getValue());

      // Radio 3 enabled
      radio3.setValue(true);

      // Verify
      this.assertEquals(true, radio3.getValue());
      this.assertEquals(false, radio2.getValue());
      this.assertEquals(false, radio1.getValue());

      // Clean up tests
      radio1.dispose();
      radio2.dispose();
      radio3.dispose();
      group.dispose();
    },

    testEnabled : function()
    {
      var radio1 = new qx.ui.form.RadioButton();
      this.getRoot().append(radio1);

      radio1.enabled = false;

      this.assertEquals(false, radio1.enabled);
      this.assertEquals(true, qx.bom.element.Class.has(radio1[0],'disabled'));

      radio1.dispose();
    }

  }
});
