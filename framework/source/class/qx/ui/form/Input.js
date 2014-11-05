"use strict";
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2014 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tino Butz (tbtz)
     * Christopher Zuendorf (czuendorf)

************************************************************************ */

/**
 * Abstract class for all input fields.
 * @require(qx.module.AnimationFrame)
 */
qx.Class.define("qx.ui.form.Input",
{
  // ABSTRACT
  extend : qx.ui.Widget,

  include : [
    qx.ui.form.MForm,
    qx.ui.container.MScrollHandling
  ],
  implement : [
    qx.ui.form.IForm
  ],


  construct : function(element)
  {
    this.super(qx.ui.Widget, "constructor", element);
    this._applyRequired(this.required);
    this.addClass("gap");

    this.on("focus", this._onSelected, this);
    this.initMForm();
  },

  events: {
    changeModel: null
  },


  properties :
  {
    /**
     * Model property for storing additional information for the input
     * widget. It can act as value property for example.
     *
     * Be careful using that property as this is used for the
     * {@link qx.ui.form.MModelSelection} it has some restrictions:
     *
     * * Don't use equal models in one widget using the
     *     {@link qx.ui.form.MModelSelection}.
     *
     * * Avoid setting only some model properties if the widgets are added to
     *     a {@link qx.ui.form.MModelSelection} widget.
     *
     * Both restrictions result of the fact, that the set models are deputies
     * for their widget.
     */
    model :
    {
      nullable : true,
      event : true
    },

    type: {
      check: "String",
      apply: "_applyType"
    }
  },


  members :
  {

    // overridden
    _getTagName : function() {
      return "input";
    },


    _applyType: function(value) {
      this.setAttribute("type", value);
      if (this.value) {
        this.validate();
      }
    },


    // overridden
    setValue: function(value) {
      this.value = value;
    },


    // overridden
    getValue: function() {
      return this.value;
    },


    /**
     * Points the focus of the form to this widget.
     */
    focus : function() {
      if(this.readOnly || this.enabled === false) {
        return;
      }

      var targetElement = this[0];
      if(targetElement) {
        targetElement.focus();
      }
    },


    /**
     * Removes the focus from this widget.
     */
    blur : function() {
      var targetElement = this[0];
      if(targetElement) {
        targetElement.blur();
      }
    },


    /**
     * Handles the <code>focus</code> event on this input widget.
     * @param evt {Event} <code>click</code> or <code>focus</code> event
     */
    _onSelected : function(evt) {
      var scrollContainer = this._getParentScrollContainer();
      if(scrollContainer === null) {
        return;
      }

      setTimeout(function() {
        scrollContainer.scrollToWidget(this._getParentWidget(), 0);

        // Refresh caret position after scrolling.
        this.setStyle("position", "relative");
        qxWeb.requestAnimationFrame(function() {
          this.setStyle("position", null);
        }, this);
      }.bind(this), 300);
    },


    dispose : function() {
      this.super(qx.ui.Widget, "dispose");
      this.off("focus", this._onSelected, this);
      this.disposeMForm();
    }
  },


  classDefined : function(statics) {
    qxWeb.$attachWidget(statics);
  }
});