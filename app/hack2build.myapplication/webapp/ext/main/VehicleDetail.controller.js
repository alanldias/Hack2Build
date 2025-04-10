sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], function (Controller) {
    "use strict";
  
    return Controller.extend("hack2build.myapplication.ext.main.VehicleDetail", {
      onInit: function () {
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("vehicleDetail").attachPatternMatched(this._onObjectMatched, this);
      },
  
      _onObjectMatched: function (oEvent) {
        const sID = oEvent.getParameter("arguments").ID;
        this.getView().bindElement({
          path: "/Vehicle('" + sID + "')"
        });
      },
  
      onNavBack: function () {
        window.history.go(-1);
      }
    });
  });
  