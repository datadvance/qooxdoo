/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/* ************************************************************************

#module(ui_core)
#optional(qx.ui.form.Button)
#embed(qx.icontheme/16/apps/preferences-desktop-theme.png)

************************************************************************ */

/** This singleton manage the global image path (prefix) and allowes themed icons. */
qx.Class.define("qx.manager.object.ImageManager",
{
  type : "singleton",
  extend : qx.manager.object.ObjectManager,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // Themes
    this._iconThemes = {};
    this._widgetThemes = {};

    // Contains known image sources (all of them, if loaded or not)
    // The value is a number which represents the number of image
    // instances which use this source
    this._sources = {};

    // Change event connection to AliasManager
    qx.manager.object.AliasManager.getInstance().addEventListener("change", this._onaliaschange, this);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    iconTheme :
    {
      _legacy  : true,
      type     : "object"
    },

    widgetTheme :
    {
      _legacy  : true,
      type     : "object"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      REGISTRATION
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @param vThemeClass {var} TODOC
     * @return {void}
     */
    registerIconTheme : function(vThemeClass)
    {
      this._iconThemes[vThemeClass.name] = vThemeClass;

      if (vThemeClass.name == qx.core.Setting.get("qx.iconTheme")) {
        this.setIconTheme(vThemeClass);
      }
    },


    /**
     * TODOC
     *
     * @type member
     * @param vThemeClass {var} TODOC
     * @return {void}
     */
    registerWidgetTheme : function(vThemeClass)
    {
      this._widgetThemes[vThemeClass.name] = vThemeClass;

      if (vThemeClass.name == qx.core.Setting.get("qx.widgetTheme")) {
        this.setWidgetTheme(vThemeClass);
      }
    },


    /**
     * TODOC
     *
     * @type member
     * @param vId {var} TODOC
     * @return {void}
     */
    setIconThemeById : function(vId) {
      this.setIconTheme(this._iconThemes[vId]);
    },


    /**
     * TODOC
     *
     * @type member
     * @param vId {var} TODOC
     * @return {void}
     */
    setWidgetThemeById : function(vId) {
      this.setWidgetTheme(this._widgetThemes[vId]);
    },




    /*
    ---------------------------------------------------------------------------
      EVENTS
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    _onaliaschange : function() {
      this._updateImages();
    },




    /*
    ---------------------------------------------------------------------------
      MODIFIERS
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @param propValue {var} Current value
     * @param propOldValue {var} Previous value
     * @param propData {var} Property configuration map
     * @return {boolean} TODOC
     */
    _modifyIconTheme : function(propValue, propOldValue, propData)
    {
      propValue ? qx.manager.object.AliasManager.getInstance().add("icon", propValue.icons.uri) : qx.manager.object.AliasManager.getInstance().remove("icon");
      return true;
    },


    /**
     * TODOC
     *
     * @type member
     * @param propValue {var} Current value
     * @param propOldValue {var} Previous value
     * @param propData {var} Property configuration map
     * @return {boolean} TODOC
     */
    _modifyWidgetTheme : function(propValue, propOldValue, propData)
    {
      propValue ? qx.manager.object.AliasManager.getInstance().add("widget", propValue.widgets.uri) : qx.manager.object.AliasManager.getInstance().remove("widget");
      return true;
    },




    /*
    ---------------------------------------------------------------------------
      PRELOAD API
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getPreloadImageList : function()
    {
      var vPreload = {};

      for (var vSource in this._sources)
      {
        if (this._sources[vSource]) {
          vPreload[vSource] = true;
        }
      }

      return vPreload;
    },


    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getPostPreloadImageList : function()
    {
      var vPreload = {};

      for (var vSource in this._sources)
      {
        if (!this._sources[vSource]) {
          vPreload[vSource] = true;
        }
      }

      return vPreload;
    },




    /*
    ---------------------------------------------------------------------------
      INTERNAL HELPER
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @return {boolean} TODOC
     */
    _updateImages : function()
    {
      var vAll = this.getAll();
      var vPreMgr = qx.manager.object.ImagePreloaderManager.getInstance();
      var vAliasMgr = qx.manager.object.AliasManager.getInstance();
      var vObject;

      // Recreate preloader of affected images
      for (var vHashCode in vAll)
      {
        vObject = vAll[vHashCode];
        vObject.setPreloader(vPreMgr.create(vAliasMgr.resolvePath(vObject.getSource())));
      }

      return true;
    },




    /*
    ---------------------------------------------------------------------------
      UTILITY
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @param vPath {var} TODOC
     * @return {void}
     */
    preload : function(vPath) {
      qx.manager.object.ImagePreloaderManager.getInstance().create(qx.manager.object.AliasManager.getInstance().resolvePath(vPath));
    }
  },




  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */

  settings :
  {
    /*
      Make sure to select an icon theme that is compatible to the license you
      chose to receive the qooxdoo code under. For more information, please
      see the LICENSE file in the project's top-level directory.
     */

    "qx.iconTheme"   : "qx.theme.icon.Nuvola",
    "qx.widgetTheme" : "qx.theme.widget.Windows"
  },



  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeFields("_sources", "_iconThemes", "_widgetThemes");
  }
});
