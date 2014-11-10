// Copyright (C) DATADVANCE, 2012-2014

/**
 * "Fake" inline table cell editor modal window. Looks like ordinary cell editor container
 */
qx.Class.define("qx.ui.table.pane.InlineTableEditorModalWindow", {
  extend : qx.ui.window.Window,
  events : {
    /** Editor data changed event */
    "stopEditing" : "qx.event.type.Event",
    /** Editor cancel editing event */
    "cancelEditing" : "qx.event.type.Event"
  },

  /**
   * Constructor
   *
   * @param bounds {Object} Editing cell bounds (cell focus indicator inner bounds in fact) {left, top, height, width}
   * @param cellEditor {Object} Cell editor object instance
   */
  construct : function(bounds, cellEditor) {
    this.base(arguments);
    this.__bounds = bounds;
    this.__cellEditor = cellEditor || null;
    if (this.__cellEditor === null) {
      throw new Error("Cell editor incorrect");
    }

    this.getChildControl("captionbar", true).setVisibility("excluded");
    this.set({
      // We need to use modal window to correct zIndex placement
      modal : true,
      resizable : false,
      allowMinimize : false,
      allowMaximize : false,
      allowGrowX : false,
      allowGrowY : false,
      allowShrinkX : false,
      allowShrinkY : false,
      width : this.__bounds.width,
      height : this.__bounds.height,
      contentPadding : 0,
      layout : p7.Dispose.add(this, new qx.ui.layout.Canvas)
    });
    this.add(this.__cellEditor, {top: 0, right: 0, bottom: 0, left: 0});

    this.addListenerOnce("appear", this.__onWindowFirstAppear, this);
    this.__cellEditor.addListener("keypress", this.__onCellEditorKeypress, this);
  },

  destruct : function() {
    this.__documentRoot.removeListener("resize", this.__onDocumentRootResize, this);
    this.__blocker.removeListener("click", this.__onBlockerClick, this);
    delete this.__cellEditor;
    this.__blocker.exclude();
    p7.Dispose.remove(this);
  },

  members : {
    /** Editing cell bounds (cell focus indicator inner bounds in fact) {left, top, height, width} */
    __bounds : null,
    /** Cell editor object instance */
    __cellEditor : null,
    /** 
     * Custom blocker.
     * Standard modal window blocker do not fire "click" events, but we need it
     */
    __blocker : null,
    /** Application document root. Used as custom blocker parent */
    __documentRoot : null,

    /**
     * Window "changeZIndex" event handler. Extra modal windows can change zIndex of this window on show/hide.
     * We need to correct custom blocker zIndex in this case
     */
    __onWindowChangeZIndex : function() {
      this.__blocker.setStyle("zIndex", this.getZIndex() - 1);
    },

    /**
     * Window "appear" event handler. Used for init window position, custom blocker zIndex. Activate cell editor
     */
    __onWindowFirstAppear : function() {
      this.moveTo(this.__bounds.left, this.__bounds.top);

      this.__documentRoot = qx.core.Init.getApplication().getRoot();
      this.__blocker = p7.Dispose.add(this, new qx.html.Blocker(null, 1));
      this.__documentRoot.getContentElement().add(this.__blocker);
      this.__onWindowChangeZIndex();
      this.__onDocumentRootResize();
      this.addListener("changeZIndex", this.__onWindowChangeZIndex, this);

      this.__documentRoot.addListener("resize", this.__onDocumentRootResize, this);
      this.__blocker.addListener("click", this.__onBlockerClick, this);
      this.__blocker.addListener("keypress", this.__onBlockerKeypress, this);

      this.__cellEditor.focus();
      this.__cellEditor.activate();
    },

    __onBlockerKeypress : function(event) {
      return this.__onCellEditorKeypress(event);
    },

    /**
     * Cell editor "keypress" event handler.
     * Used for stop editing on Enter and cancel editing on Escape
     *
     * @param event {qx.event.type.KeySequence} Event object
     */
    __onCellEditorKeypress : function(event) {
      var iden = event.getKeyIdentifier();
      if (iden === "Escape") {
        this.fireEvent("cancelEditing");
      } else if (iden === "Enter") {
        this.fireEvent("stopEditing");
      }
    },

    /**
     * Custom blocker "click" event handler.
     * Cancel editing on custom blocker click
     */
    __onBlockerClick : function(){
      this.fireEvent("stopEditing");
    },

    /**
     * Set the blocker's size and position
     * @param bounds {Map} Map with the new width, height, left and top values
     */
    __updateBlockerBounds : function(bounds) {
      this.__blocker.setStyles({
        width: bounds.width + "px",
        height: bounds.height + "px",
        left: bounds.left + "px",
        top: bounds.top + "px"
      });
    },

    /**
     * Application document root "resize" event hndler.
     * Used for change custom blocker bounds on application window resize
     */
    __onDocumentRootResize : function() {
      var bounds = this.__documentRoot.getBounds();
      if (bounds) {
        this.__updateBlockerBounds(bounds);
      }
    }
  }
});
