sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
   "sap/m/MessageBox"
], function (Controller, Filter, FilterOperator, MessageToast,JSONModel,MessageBox) {
  "use strict";

  return Controller.extend("hack2build.myapplication.ext.main.VehicleDetail", {

    onInit: function () {
      const oVehicleViewModel = new JSONModel();
      this.getView().setModel(oVehicleViewModel, "vehicleView");
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      

      oRouter.getRoute("vehicleDetail").attachPatternMatched(this._onMatchedWithID, this);
      oRouter.getRoute("weighingCreate").attachPatternMatched(this._onMatchedWithoutID, this);
    },

    _onMatchedWithID: function (oEvent) {
      const sID = oEvent.getParameter("arguments").ID;
      const oModel = this.getView().getModel("weighingModel");
    
      this.getView().bindElement({
        path: "/Weighing('" + sID + "')",
        model: "weighingModel"
      });
    },

    _onMatchedWithoutID: function () {
      const oNewWeighing = {
        weighingID: "",
        vehicleLicensePlate: "",
        tareWeight: 0,
        grossWeight: 0,
        netWeight: 0,
        timestamp: "",
        vehicle_ID: null,
        product_ID: null,
        scale_ID: null
      };  const oModel = new sap.ui.model.json.JSONModel(oNewWeighing);
      this.getView().setModel(oModel, "weighingData");
    },

     
    onSaveWeighing: function () {
      const oWeighingModel = this.getOwnerComponent().getModel("weighingModel");
      const oWeighingData = this.getView().getModel("weighingData").getData();
    
      const bIsNew = !oWeighingData.ID; // se não houver ID, é novo
    
      if (bIsNew) {
        // Criar nova pesagem
        oWeighingModel.create("/Weighing", oWeighingData, {
          success: () => sap.m.MessageToast.show("Pesagem criada com sucesso!"),
          error: () => sap.m.MessageToast.show("Erro ao criar pesagem.")
        });
      } else {
        // Atualizar pesagem existente
        const sPath = "/Weighing('" + oWeighingData.ID + "')";
        oWeighingModel.update(sPath, oWeighingData, {
          success: () => sap.m.MessageToast.show("Pesagem atualizada!"),
          error: () => sap.m.MessageToast.show("Erro ao atualizar pesagem.")
        });
      }
    },
    
    onCancelWeighing: function () {
      const oModel = this.getView().getModel("weighingData");
      oModel.resetChanges(); // limpa alterações no JSONModel (só visual)
      sap.m.MessageToast.show("Alterações canceladas.");
    },
    
    onFindVehicle: function(oEvent) {
      const oView = this.getView();
      const sPlaca = oView.byId("inputVehicleAssoc")?.getValue(); // Safe check

      if (!sPlaca) {
        sap.m.MessageToast.show("Digite a placa.");
        return;
      }

      const oVehicleModel = oView.getModel("vehicleModel");

      if (!oVehicleModel) {
        MessageBox.error("Modelo 'vehicleModel' não encontrado.");
        return;
      }

      // Buscar veículo pelo filtro
      const oBinding = oVehicleModel.bindList(
        "/Vehicle",
        null,
        null,
        [new Filter("licensePlate", FilterOperator.EQ, sPlaca)]
      );

      oBinding.requestContexts(0, 1).then((aContexts) => {
        if (aContexts.length > 0) {
          const oVehicleData = aContexts[0].getObject();

          // Atualiza o modelo JSON com os dados encontrados
          const oVehicleViewModel = oView.getModel("vehicleView");
          oVehicleViewModel.setProperty("/vehicle", oVehicleData);

          MessageToast.show("Veículo carregado com sucesso.");
        } else {
          MessageBox.information("Veículo não encontrado.");
        }
      }).catch((err) => {
        console.error("Erro ao buscar veículo:", err);
        MessageBox.error("Erro na requisição. Verifique o console.");
      });


    },
    onPesar:function() {
      const oWeighingModel = this.getView().getModel("vehicleView");

      if (!oWeighingModel) {
        sap.m.MessageBox.error("Modelo 'weighingModel' não encontrado.");
        return;
      }

      // Exemplo: pega peso da balança ou um valor simulado
      const fPesoSimulado = Math.floor(Math.random() * 10000) + 10000; // exemplo aleatório


      //tara
      const fTara = parseFloat(oWeighingModel.getProperty("/tareWeight")) || 0;

      // Valor Bruto
      oWeighingModel.setProperty("/grossWeight", fPesoSimulado);
      const fLiquido = fPesoSimulado - fTara;
      oWeighingModel.setProperty("/netWeight", fLiquido);



      sap.m.MessageToast.show("Peso registrado com sucesso.");
    },
      
    

    onNavBack: function () {
      const oHistory = sap.ui.core.routing.History.getInstance();
      const sPreviousHash = oHistory.getPreviousHash();
      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("worklist", {}, true);
      }
    }
  });
});
