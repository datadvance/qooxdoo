/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */

/**
 * Implements the dynamic behavior of the API viewer.
 * The GUI is defined in {@link Viewer}.
 */
qx.Bootstrap.define("apiviewer.TabViewController",
{
  extend : Object,
  include : [qx.event.MEmitter],

  construct : function(widgetRegistry)
  {
    apiviewer.TabViewController.instance = this;

    // TODO
    // this._tabView = widgetRegistry.getWidgetById("tabView");
    // this._tabView.on("changeSelection", this.__onChangeSelection, this);
  },


  events :
  {
    /** This event if dispatched if one of the internal links is tapped */
    "classLinkTapped" : "qx.event.type.Data",

    "changeSelection" : "qx.event.type.Data"
  },


  members :
  {
    showTabView : function() {
      this._tabView.show();
    },

    /**
     * Callback for internal links to other classes/items.
     * This code is called directly from the generated HTML of the
     * class viewer.
     */
    onSelectItem : function(itemName) {
      this.emit("classLinkTapped", itemName);
    },

    showItem : function(itemName) {
      qx.ui.core.queue.Manager.flush();

      var page = this._tabView.getSelection()[0];
      page.setUserData("itemName", itemName);

      return page.getChildren()[0].showItem(itemName);
    },

    openPackage : function(classNode, newTab)
    {
      this.__open(classNode, apiviewer.ui.tabview.PackagePage, newTab);
    },

    openClass : function(classNode, newTab) {
      this.__open(classNode, apiviewer.ui.tabview.ClassPage, newTab);
    },

    __open : function(classNode, clazz, newTab)
    {
      var currentPage = this._tabView.getSelection()[0];

      if (newTab == true || currentPage == null) {
        this.__createAndAdd(clazz, classNode);
      }
      else
      {
        if (currentPage instanceof clazz) {
          currentPage.setClassNode(classNode);
          currentPage.setUserData("itemName", null);
        }
        else
        {
          this.__createAndAdd(clazz, classNode);
          this.__destroyAndRemove(currentPage);
        }
      }
      apiviewer.LoadingIndicator.getInstance().hide();
    },

    __createAndAdd : function(clazz, classNode) {
      var page = new clazz(classNode);
      this._tabView.add(page);
      this._tabView.setSelection([page]);
    },

    __destroyAndRemove : function(page) {
      this._tabView.remove(page);
      page.destroy();
    },

    __onChangeSelection : function(event)
    {
      var oldData = event.getOldData();
      var data = event.getData();
      this.emit("changeSelection", data, oldData);
    },


    dispose : function()
    {
      this._tabView.dispose();
      this._tabView = null;
    }
  }
});
