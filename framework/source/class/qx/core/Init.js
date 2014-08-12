/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */

/**
 * This is the base class for all qooxdoo applications.
 *
 * @require(qx.module.Core)
 */
qx.Bootstrap.define("qx.core.Init",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Returns the instantiated qooxdoo application.
     *
     * @return {qx.core.Object} The application instance.
     */
    getApplication : qx.core.BaseInit.getApplication,


    /**
     * Runs when the application is loaded. Automatically creates an instance
     * of the class defined by the setting <code>qx.application</code>.
     *
     */
    ready : qx.core.BaseInit.ready,


    /**
     * Runs before the document is unloaded. Calls the application's close
     * method to check if the unload process should be stopped.
     *
     * @param e {qx.event.type.Native} Incoming beforeunload event.
     */
    __close : function(e)
    {
      var app = this.getApplication();
      if (app) {
        var ret = app.close();
        if (ret !== undefined) {
          e.returnValue = ret;
        }
      }
    },


    /**
     * Runs when the document is unloaded. Automatically terminates a previously
     * created application instance.
     *
     */
    __shutdown : function()
    {
      var app = this.getApplication();

      if (app) {
        app.terminate();
      }
    }
  },




  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function(statics)
  {
    q.ready(statics.ready, statics);
    qxWeb(window).on("beforeunload", statics.__close, statics)
      .on("unload", statics.__shutdown, statics);
  }
});
