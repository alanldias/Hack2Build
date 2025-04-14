sap.ui.define(
    [
        'sap/fe/core/PageController',
        'sap/ui/model/Filter',
        "sap/m/MessageBox",  
        "sap/m/MessageToast"
    ],
    function(PageController,Filter,MessageBox,MessageToast) {
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
              oTable.setVisible(true);
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

          onAddContract: async function () {
            const oView = this.getView();
            const oWeighingTable = oView.byId("idWeighingTableleft");
            const oContractTable = oView.byId("idContractsTableleft");
            
          
            const oWeighingContext = oWeighingTable.getSelectedItem()?.getBindingContext();
            const oContractContext = oContractTable.getSelectedItem()?.getBindingContext("vwModel");
          
            if (!oWeighingContext || !oContractContext) {
              MessageBox.error("Selecione uma pesagem e um contrato.");
              return;
            }
          
            const oModel = oView.getModel(); // OData v4 default model
            const oContractData = oContractContext.getObject();
            const selectedContractId = oContractData.ID;
          
            try {
              // Atualiza diretamente a propriedade no contexto da linha selecionada
              oWeighingContext.setProperty("contractID", selectedContractId);
          
              // Envia a atualização via group "$auto" (definido no manifest.json)
              await oModel.submitBatch("$auto");
              
              
              setTimeout(() => {
                MessageBox.success("Contrato associado com sucesso!");
              }, 100); // 100ms costuma ser suficiente
              
              // MessageToast.show("Contrato associado com sucesso!");
              oWeighingTable.getBinding("items").refresh();
              
              
            } catch (err) {
              console.error("Erro ao associar contrato:", err);
              MessageBox.error("Erro ao associar contrato: " + err.message);
            }
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
