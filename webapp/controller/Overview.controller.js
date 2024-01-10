sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("rm.hcm.training.ztimeevents.controller.Overview", {
		onInit: function () {
			this.getView().setModel(this.getOwnerComponent().getModel("message"), "message");

			this.getView().byId("idMsg").setModel(this.getOwnerComponent().getModel("message"));

		},

		onFilter: function (oEvent) {
			var dNewDate = oEvent.getSource().getDateValue();
			var oTable = this.getView().byId("idTabTimeEvents"),
				aFilter = [];

			var oFilter = new Filter({
				path: "CreateDate",
				operator: FilterOperator.GT,
				value1: dNewDate
			});

			//aFilter.push(oFilter);

			oTable.getBinding("items").filter(oFilter);

		},
		onCreate: function (oEvent) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("Create");
		},
		onEdit: function (oEvent) {

		},
		onSave: function (oEvent) {
			var oModel = this.getView().getModel();

			if (oModel.hasPendingChanges()) {
				oModel.submitChanges({
					success: function (oData, oResponse) {
						debugger;
					}.bind(this),
					error: function (oError) {
						debugger;
					}.bind(this),
					refreshAfterChange: false
				});
			}
		},
		onDelete: function (oEvent) {
			var sPath = oEvent.getParameter("listItem").getBindingContext().getPath();

			this.getView().getModel().remove(sPath, {
				success: function (oData, oResponse) {
					debugger;
				}.bind(this),
				error: function (oError) {
					console.table(this.getView().getModel("message").getData());
				}.bind(this)
			});
		},

		formatTime: function (time) {
			return time.ms / 1000 / 60 / 60;
		}
	});
});