"use strict";
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tino Butz (tbtz)

************************************************************************ */


/**
 * Root widget for the mobile application.
 */
qx.Bootstrap.define("qx.ui.mobile.core.Root",
{
  extend : qx.ui.mobile.Widget,


  /**
   * @param root {Element?null} Optional. The root DOM element of the widget. Default is the body of the document.
   * @param layout {qx.ui.mobile.layout.Abstract ? qx.ui.mobile.layout.VBox} The layout of the root widget.
   */
  construct : function(root, layout)
  {
    this.__root = root || document.body;
    this.base(qx.ui.mobile.Widget, "constructor", this.__root);
    this.layout = layout || new qx.ui.mobile.layout.VBox();
  },


  properties :
  {
    // overridden
    defaultCssClass :
    {
      init : "root"
    },


    /**
     * Whether the native scrollbar should be shown or not.
     */
    showScrollbarY :
    {
      check : "Boolean",
      init : true,
      apply : "_applyShowScrollbarY"
    }
  },


  members :
  {
    __root : null,

    // overridden
    _createContainerElement : function() {
      return this.__root;
    },


    // property apply
    _applyShowScrollbarY : function(value, old) {
      this.setStyle("overflow-y", value ? "auto" : "hidden");
    },


    _preventDefault : function(evt) {
      evt.preventDefault();
    },


    dispose : function() {
      this.base(qx.ui.mobile.Widget, "dispose");
      this.off("touchmove", this._preventDefault);
      qxWeb(window).off("orientationchange", this._onOrientationChange, this);
    }
  }
});
