sap.ui.define(
    [
        'sap/fe/core/PageController',
        'sap/ui/model/json/JSONModel' 
    ],
    function(PageController,JSONModel) {
        'use strict';

        return PageController.extend('hack2build.myapplication.ext.main.Worklist', {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf hack2build.myapplication.ext.main.Main
             */
             onInit: function () {
       
             },

             onVehiclePress: function (oEvent) {
                const oItem = oEvent.getParameter("listItem");
                const sID = oItem.getBindingContext().getProperty("ID");
              
                if (!sID) {
                  console.error("❌ ID do veículo não encontrado.");
                  return;
                }
              
                sap.ui.core.UIComponent.getRouterFor(this).navTo("vehicleDetail", {
                  ID: sID
                });
              }
             //,

            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf hack2build.myapplication.ext.main.Main
             */
            //  onBeforeRendering: function() {
            //
            //  },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf hack2build.myapplication.ext.main.Main
             */
            //  onAfterRendering: function() {
            //
            //  },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf hack2build.myapplication.ext.main.Main
             */
            //  onExit: function() {
            //
            //  }
        });
    }
);
