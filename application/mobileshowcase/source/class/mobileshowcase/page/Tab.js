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
 * Mobile page responsible for showing the "tab" showcase.
 */
qx.Bootstrap.define("mobileshowcase.page.Tab",
{
  extend : mobileshowcase.page.Abstract,


  construct : function()
  {
    this.base(mobileshowcase.page.Abstract, "constructor");
    this.title = "Tabs";
  },


  members :
  {
    // overridden
    _initialize : function()
    {
      this.base(mobileshowcase.page.Abstract, "_initialize");

      var tabBar = this.__createTabBar();

      // Default add TabBar after NavigationBar.
      this.addAfterNavigationBar(tabBar);
    },


    /**
     * Creates the tab bar.
     *
     * @return {qx.ui.mobile.tabbar.TabBar} created tab bar.
     */
    __createTabBar : function()
    {
      var tabBar = new qx.ui.mobile.tabbar.TabBar();

      var view1 = this.__createView("<b>qx.Desktop</b><br/><br/>Create desktop oriented applications. Features a rich and extendable set of widgets. No HTML/CSS knowledge required.");
      var view2 = this.__createView("<b>qx.Mobile</b><br/><br/>Create mobile apps that run on all major mobile operating systems, without writing any HTML.");
      var view3 = this.__createView("<b>qx.Server</b><br/><br/>Use the same OOP pattern known from the client side, reuse code and generate files you can deploy in your server environment.");
      var view4 = this.__createView("<b>qx.Website</b><br/><br/>A cross-browser DOM manipulation library to enhance websites with a rich user experience.");

      view1.addClass("view1");
      view2.addClass("view2");
      view3.addClass("view3");
      view4.addClass("view4");

      var tabButton1 = new qx.ui.mobile.tabbar.TabButton("Desktop");
      tabButton1.view = view1;

      var tabButton2 = new qx.ui.mobile.tabbar.TabButton("Mobile");
      tabButton2.view = view2;

      var tabButton3 = new qx.ui.mobile.tabbar.TabButton("Server");
      tabButton3.view = view3;

      var tabButton4 = new qx.ui.mobile.tabbar.TabButton("Website");
      tabButton4.view = view4;

      tabBar.add(tabButton4);
      tabBar.add(tabButton2);
      tabBar.add(tabButton3);
      tabBar.add(tabButton1);

      return tabBar;
    },


    /**
     * Creates the view for the tab.
     *
     * @param text {String} The text of the label used in this view.
     * @return {qx.ui.mobile.basic.Label} the created view.
     */
    __createView : function(text)
    {
      var label = new qx.ui.mobile.basic.Label(text);
      this.getContent().add(label);
      return label;
    }
  }
});