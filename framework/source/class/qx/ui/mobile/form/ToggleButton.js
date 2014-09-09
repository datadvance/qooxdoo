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
     * Christopher Zuendorf (czuendorf)

************************************************************************ */

/**
 * A toggle Button widget
 *
 * If the user tap the button, the button toggles between the <code>ON</code>
 * and <code>OFF</code> state.
 *
 * Here is a little example of how to use the widget.
 *
 * <pre class='javascript'>
 *   var button = new qx.ui.mobile.form.ToggleButton(false,"YES","NO");
 *
 *   button.on("changeValue", function(value) {
 *     alert(value);
 *   }, this);
 *
 *   this.getRoot.append(button);
 * </pre>
 *
 * This example creates a toggle button and attaches an
 * event listener to the {@link #changeValue} event.
 */
qx.Bootstrap.define("qx.ui.mobile.form.ToggleButton",
{
  extend : qx.ui.mobile.Widget,
  include : [
    qx.ui.mobile.form.MValue,
    qx.ui.form.MForm,
    qx.ui.form.MModelProperty,
    qx.ui.mobile.form.MState
  ],
  implement : [
    qx.ui.form.IForm,
    qx.ui.form.IModel
  ],


  /**
   * @param value {Boolean?null} The value of the button
   * @param labelChecked {Boolean?"ON"} The value of the text display when toggleButton is active
   * @param labelUnchecked {Boolean?"OFF"} The value of the text display when toggleButton is inactive
   */
  construct : function(value, labelChecked, labelUnchecked)
  {
    this.base(qx.ui.mobile.Widget, "constructor");

    if(labelChecked && labelUnchecked) {
       this.__labelUnchecked = labelUnchecked;
       this.__labelChecked = labelChecked;
    }

    this.setData("label-checked", this.__labelChecked);
    this.setData("label-unchecked", this.__labelUnchecked);

    this.__switch = this._createSwitch();
    this.append(this.__switch);

    if (value) {
      this.value = value;
    }

    this.on("tap", this._onTap, this);
    this.on("swipe", this._onSwipe, this);

    this.addClass("gap");
    this.initMValue(value);
    this.initMForm();
  },


  properties :
  {
    // overridden
    defaultCssClass :
    {
      init : "togglebutton"
    }
  },


  members :
  {
    __switch : null,
    __value : false,
    __labelUnchecked : "OFF",
    __labelChecked : "ON",
    __lastToggleTimestamp : 0,


    /**
     * Returns the child control of the toggle button.
     *
     * @return {qx.ui.mobile.Widget} the child control.
     */
    _getChild : function() {
      return this.__switch;
    },


    /**
     * Creates the switch control of the widget.
     * @return {qx.ui.mobile.Widget} The switch control.
     */
    _createSwitch : function() {
      var toggleButtonSwitch = new qx.ui.mobile.Widget();
      toggleButtonSwitch.addClass("togglebutton-switch");
      return toggleButtonSwitch;
    },


    /**
     * Sets the value [true/false] of this toggle button.
     * It is called by setValue method of qx.ui.mobile.form.MValue mixin
     * @param value {Boolean} the new value of the toggle button
     */
    _setValue : function(value)
    {
      if(typeof value !== 'boolean') {
        throw new Error("value for "+this+" should be boolean");
      }
      if (value) {
        this.addClass("checked");
      } else {
        this.removeClass("checked");
      }
       this.__value = value;
    },

    /**
     * Gets the value [true/false] of this toggle button.
     * It is called by getValue method of qx.ui.mobile.form.MValue mixin
     * @return {Boolean} the value of the toggle button
     */
    _getValue : function() {
      return this.__value;
    },


    /**
     * Toggles the value of the button.
     */
    toggle : function() {
      this.setValue(!this.getValue());
    },


    /**
     * Event handler. Called when the tap event occurs.
     * Toggles the button.
     *
     * @param evt {qx.event.type.Tap} The tap event.
     */
    _onTap : function(evt)
    {
      if(this._checkLastPointerTime()) {
        this.toggle();
      }
    },


    /**
     * Event handler. Called when the swipe event occurs.
     * Toggles the button, when.
     *
     * @param evt {qx.event.type.Swipe} The swipe event.
     */
    _onSwipe : function(evt)
    {
      if (this._checkLastPointerTime()) {
        var direction = evt.getDirection();
        if (direction == "left") {
          if (this.__value == true) {
            this.toggle();
          }
        } else {
          if (this.__value == false) {
            this.toggle();
          }
        }
      }
    },


    /**
     * Checks if last touch event (swipe,tap) is more than 500ms ago.
     * Bugfix for several simulator/emulator, when tap is immediately followed by a swipe.
     * @return {Boolean} <code>true</code> if the last event was more than 500ms ago
     */
    _checkLastPointerTime : function() {
      var elapsedTime = new Date().getTime() - this.__lastToggleTimestamp;
      this.__lastToggleTimestamp = new Date().getTime();
      return elapsedTime>500;
    },

    dispose : function() {
      this.base(qx.ui.mobile.Widget, "dispose");
      this.off("tap", this._onTap, this);
      this.off("swipe", this._onSwipe, this);

      this.__switch && this.__switch.dispose();
      this.disposeMForm();
    }
  }
});
