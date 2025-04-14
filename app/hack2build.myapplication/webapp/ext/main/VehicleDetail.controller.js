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
     //oRouter.getRoute("weighingCreate").attachMatched(this._onRouteMatched, this);

      // oRouter.getRoute("vehicleDetail").attachPatternMatched((oEvent) => {
      //   const sID = oEvent.getParameter("arguments").ID;
    
      //   if (sID) {
      //     // 👉 Acesso via clique no Worklist com ID
      //     this._onMatchedWithID(sID);
      //   } else {
      //     // 👉 Acesso via botão "Nova Pesagem"
      //     this._onMatchedWithoutID();
      //   }
      // }, this);
      

      // oRouter.getRoute("vehicleDetail").attachPatternMatched(this._onMatchedWithID, this);
       oRouter.getRoute("weighingCreate").attachPatternMatched(this._onMatchedWithoutID, this);      
      
    },

    _onRouteMatched: async function (oEvent) {
      // Este método será chamado TODA vez que a rota for usada
      var sID = oEvent.getParameter("arguments").ID;

      if (sID) {
            // 👉 Acesso via clique no Worklist com ID
            this._onMatchedWithID(sID);
          } else {
            // 👉 Acesso via botão "Nova Pesagem"
            this._onMatchedWithoutID();
          }
    
      // // Exemplo: Recarregar dados com base no parâmetro da rota
      // this.getView().bindElement({
      //   path: "/MyEntitySet('" + sObjectId + "')",
      //   model: "myModel"
      // });
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
      const oVehicleViewModel = new sap.ui.model.json.JSONModel({
        vehicle: {
          driverName: "",
          company: ""
        },
        tareWeight: null,
        grossWeight: null,
        netWeight: null
      });
    
      this.getView().setModel(oVehicleViewModel, "vehicleView");


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

      const oClassificationModel = new sap.ui.model.json.JSONModel({
        humidity: null,
        resultHumidity: null,
        discountHumidity: null,
        impurity: null,
        resultImpurity: null,
        discountImpurity: null,
        damaged: null,
        resultDamaged: null,
        discountDamaged: null,
        greenish: null,
        resultGreenish: null,
        discountGreenish: null
      });
      
      this.getView().setModel(oClassificationModel, "Classification");

      const oTransgenicsModel = new sap.ui.model.json.JSONModel({
        declarado: false,
        participante: false,
        rrConvenciona: false,
        testadaNegativa: false,
        testadaPositiva: false
      });
      
      this.getView().setModel(oTransgenicsModel, "Transgenics");

      
      
    },

    onSaveClassification: function () {
      const oView = this.getView();
      const oClassificationData = oView.getModel("Classification")?.getData();
      const sWeighingID = oView.getModel("weighingData")?.getProperty("/ID");
      const oModel = oView.getModel("classification"); // Corrigido aqui
    
      if (!oModel || !sWeighingID || !oClassificationData) {
        sap.m.MessageBox.error("Dados obrigatórios ausentes.");
        return;
      }
    
      const oPayload = {
        humidity: oClassificationData.humidity,
        resultHumidity: oClassificationData.resultHumidity,
        discountHumidity: oClassificationData.discountHumidity,
    
        impurity: oClassificationData.impurity,
        resultImpurity: oClassificationData.resultImpurity,
        discountImpurity: oClassificationData.discountImpurity,
    
        damaged: oClassificationData.damaged,
        resultDamaged: oClassificationData.resultDamaged,
        discountDamaged: oClassificationData.discountDamaged,
    
        greenish: oClassificationData.greenish,
        resultGreenish: oClassificationData.resultGreenish,
        discountGreenish: oClassificationData.discountGreenish,
    
        weighing_ID: sWeighingID
      };
    
      const oListBinding = oModel.bindList("/Classification");
      const oContext = oListBinding.create(oPayload);
    
      oContext.created().then(() => {
        sap.m.MessageToast.show("Classificação salva com sucesso!");
      }).catch((err) => {
        console.error("❌ Erro ao salvar classificação:", err);
        sap.m.MessageBox.error("Erro ao salvar classificação.");
      });
    },
    
    onSaveTransgenia: function () {
      const oView = this.getView();
    
      const oTransgenicsData = oView.getModel("Transgenics")?.getData();
      const sWeighingID = oView.getModel("weighingData")?.getProperty("/ID");
      const oModel = oView.getModel("transgenicsModel");
    
      if (!oModel || !sWeighingID || !oTransgenicsData) {
        sap.m.MessageBox.error("Dados obrigatórios ausentes para salvar transgenia.");
        return;
      }
    
      // Montar o payload
      const oPayload = {
        declared: oTransgenicsData.declarado,
        participant: oTransgenicsData.participante,
        rrConvention: oTransgenicsData.rrConvenciona,
        testedNegative: oTransgenicsData.testadaNegativa,
        testedPositive: oTransgenicsData.testadaPositiva,
        weighing_ID: sWeighingID
      };
    
      // Criar entrada via OData V4
      const oBinding = oModel.bindList("/Transgenics");
      const oContext = oBinding.create(oPayload);
    
      oContext.created().then(() => {
        sap.m.MessageToast.show("Transgenia salva com sucesso!");
      }).catch((err) => {
        console.error("❌ Erro ao salvar transgenia:", err);
        sap.m.MessageBox.error("Erro ao salvar dados de transgenia.");
      });
    },    
    
    

    onSaveTransgenics: function () {
      const oView = this.getView();
      const oTransgenicsView = oView.getModel("Transgenics");
      
      if (!oTransgenicsView) {
        sap.m.MessageBox.error("Modelos necessários não encontrados.");
        return;
      }

    },

     
    onSaveWeighing: function () {
      const oView = this.getView();

      // Modelos usados
      const oVehicleView = oView.getModel("vehicleView");
      const oWeighingData = oView.getModel("weighingData");
      const oWeighingModel = oView.getModel("weighingModel");

      if (!oVehicleView || !oWeighingData || !oWeighingModel) {
        sap.m.MessageBox.error("Modelos necessários não encontrados.");
        return;
      }
    
      // Obter os dados
      const vehicleData = oVehicleView.getData();
      const weighingData = oWeighingData.getData();
    
      // Validação básica
      if (!weighingData.weighingID) {
        sap.m.MessageToast.show("Informe o código da pesagem.");
        return;
      }
    
      if (!vehicleData.tareWeight || !vehicleData.grossWeight) {
        sap.m.MessageToast.show("Preencha os pesos da tara e bruto.");
        return;
      }
    
      // Calcular líquido se ainda não tiver
      const netWeight = vehicleData.netWeight || (vehicleData.grossWeight - vehicleData.tareWeight);
    
      // Montar payload
      const payload = {
        weighingID: weighingData.weighingID,
        tareWeight: vehicleData.tareWeight,
        grossWeight: vehicleData.grossWeight,
        netWeight: netWeight,
        timestamp: new Date().toISOString(), // ou pegue de outro campo se tiver
        vehicleLicensePlate: vehicleData.vehicle.licensePlate || "", // opcional se tiver esse campo no modelo
        vehicle_ID: vehicleData.vehicle.vehicle_ID // opcional: se você já associou o veículo
      };
    
          // Aqui vem a mágica OData V4!
      const oBinding = oWeighingModel.bindList("/Weighing");

      // Cria e retorna um contexto transiente
      const oCreateContext = oBinding.create(payload);

      // Espera a resposta
      oCreateContext.created().then(() => {
        const oCreatedData = oCreateContext.getObject(); // <- AQUI você acessa o objeto com o ID gerado
        // Atualiza o modelo local com o novo ID
        const oUpdatedData = Object.assign({}, weighingData, oCreatedData);
        oWeighingData.setData(oUpdatedData);
        sap.m.MessageToast.show("Pesagem salva com sucesso!");
      }).catch((oError) => {
        console.error("Erro ao salvar pesagem:", oError);
        sap.m.MessageBox.error("Erro ao salvar pesagem.");
      });
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
