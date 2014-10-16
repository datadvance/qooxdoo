"use strict";
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christopher Zuendorf (czuendorf)

************************************************************************ */

/**
 * Mobile page responsible for showing all basic widgets available:
 * - Labels
 * - Atoms
 * - Images
 * - Buttons
 * - Collapsible
 * - Enabled / Disabled state
 */
qx.Class.define("mobileshowcase.page.Basic",
{
  extend : mobileshowcase.page.Abstract,

  construct : function()
  {
    this.base(mobileshowcase.page.Abstract, "constructor", false);
    this.title = "Basic Widgets";
    this._widgets = [];
  },


  members :
  {

    _widgets : null,

    // overridden
    _initialize : function()
    {
      this.base(mobileshowcase.page.Abstract, "_initialize");

      // TOGGLE BUTTON
      var toggleEnableButton = new qx.ui.mobile.form.ToggleButton(true,"Enable","Disable");

      toggleEnableButton.on("changeValue", function(e) {
        for (var i = 0; i < this._widgets.length; i++) {
          this._widgets[i].enabled = !this._widgets[i].enabled;
        }
      }, this);

      // TOGGLE LABEL WRAP BUTTON
      var toggleLabelWrapButton = new qx.ui.mobile.form.ToggleButton(true,"Wrap","Ellipsis");
      toggleLabelWrapButton.on("changeValue", function(e) {
        exLabel.textWrap = !exLabel.textWrap;
      }, this);

      // EXAMPLE WIDGETS
      var exButton = new qx.ui.mobile.Button("Button");

      var exToggleButton = new qx.ui.mobile.form.ToggleButton(false);

      var labelText = "qx.Mobile is a sophisticated HTML5 framework. It provides specific UI widgets for touch devices, handling of mobile events like swiping, custom theming and much more. It is suitable for mobile web browsers on platforms such as Android, iOS, WP8 or BlackBerry 10.";

      var exLabel = new qx.ui.mobile.basic.Label(labelText);
      exLabel.addClass("space-top");

      var exImage = new qx.ui.mobile.basic.Image("mobileshowcase/icon/mobile.png");

      // ATOMS
      var positions = [ "top", "left", "right", "bottom" ];
      var iconSrc = "mobileshowcase/icon/mobile.png";
      var atomRow = new qx.ui.mobile.form.Row().set({
        layout: new qx.ui.mobile.layout.VBox()
      });
      for (var i = 0; i < positions.length; i++) {
        var atomExample = new qx.ui.mobile.basic.Atom("Icon Position: "+positions[i], iconSrc);
        atomExample.iconPosition = positions[i];
        atomRow.append(atomExample);
        this._widgets.push(atomExample);
      }

      var exCollapsible = this._createCollapsible();

      var rating = new qx.ui.mobile.Rating();

      this._widgets.push(exButton);
      this._widgets.push(exToggleButton);
      this._widgets.push(exLabel);
      this._widgets.push(exImage);
      this._widgets.push(exCollapsible);
      this._widgets.push(rating);

      // BUILD VIEW

      var menuGroup = new qx.ui.mobile.form.Group("Widget Modes")
        .appendTo(this.getContent());
      new qx.ui.mobile.form.Row()
        .set({
          layout: new qx.ui.mobile.layout.VBox()
        })
        .appendTo(menuGroup)
        .append(toggleEnableButton)
        .append(toggleLabelWrapButton);

      new qx.ui.mobile.form.Group("Button")
        .appendTo(this.getContent())
        .append(exButton);

      new qx.ui.mobile.form.Group("ToggleButton")
        .appendTo(this.getContent())
        .append(new qx.ui.mobile.form.Row(exToggleButton));

      new qx.ui.mobile.form.Group("Label")
        .appendTo(this.getContent())
        .append(new qx.ui.mobile.form.Row(exLabel));

      new qx.ui.mobile.form.Group("Image")
        .appendTo(this.getContent())
        .append(exImage);

      new qx.ui.mobile.form.Group("Collapsible")
        .appendTo(this.getContent())
        .append(exCollapsible);

      new qx.ui.mobile.form.Group("Atoms")
        .appendTo(this.getContent())
        .append(atomRow);

      new qx.ui.mobile.form.Group("Rating")
        .appendTo(this.getContent())
        .append(new qx.ui.mobile.form.Row(rating));
    },


    _createCollapsible : function() {
      var collapsible = new qx.ui.mobile.container.Collapsible("Collapsible Header");
      var label = new qx.ui.mobile.basic.Label("This is the content of the Collapsible.");
      collapsible.append(label);
      return collapsible;
    }
  }
});
