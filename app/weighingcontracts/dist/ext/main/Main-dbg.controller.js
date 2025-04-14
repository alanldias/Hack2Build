const { func } = require("@sap/cds/lib/ql/cds-ql");

sap.ui.define(
    [
        'sap/fe/core/PageController',
        'sap/ui/model/Filter'
    ],
    function(PageController,Filter) {
        'use strict';

        return PageController.extend('weighingcontracts.ext.main.Main', {

            onInit: function () {
                
              },
              onWeighingSelect: function (oEvent) {
                const oSelectedItem = oEvent.getParameter("listItem");
                const oContext = oSelectedItem.getBindingContext(); // contexto padrão ("")
            
                if (!oContext) return;
            
                const oSelectedData = oContext.getObject();
            
                const sProductCode = oSelectedData.material;
                const sSupplier = oSelectedData.supplier;
            
                // Acessa a tabela de contratos
                const oTable = this.byId("idContractsTableleft");
                const oBinding = oTable.getBinding("items");
            
                if (!oBinding) {
                    console.warn("Binding não encontrado.");
                    return;
                }
            
                // Cria os filtros com base no modelo vwModel
                const oFilterProduct = new sap.ui.model.Filter("material", sap.ui.model.FilterOperator.EQ, sProductCode);
                const oFilterSupplier = new sap.ui.model.Filter("supplier", sap.ui.model.FilterOperator.EQ, sSupplier);
                const oCombinedFilter = new sap.ui.model.Filter([oFilterProduct, oFilterSupplier], true); // AND
            
                // Aplica os filtros
                oBinding.filter([oCombinedFilter]);
            },

            onAddContract:function(){

            }
            
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf weighingcontracts.ext.main.Main
             */
            //  onInit: function () {
            //      PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
            //  },

            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf weighingcontracts.ext.main.Main
             */
            //  onBeforeRendering: function() {
            //
            //  },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf weighingcontracts.ext.main.Main
             */
            //  onAfterRendering: function() {
            //
            //  },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf weighingcontracts.ext.main.Main
             */
            //  onExit: function() {
            //
            //  }
        });
    }
);
