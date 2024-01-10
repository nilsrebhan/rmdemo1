sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("rm.hcm.training.ztimeevents.controller.Create", {

		onInit: function () {

		},
		onSave: function (oEvent) {
			var oData = {
				Pernr: this.getView().byId("pernr").getValue(),
				TimeType: this.getView().byId("idTimeType").getSelectedKey(),
				EventDate: this.getView().byId("idEventDate").getDateValue(),
				EventTime: "PT16H11M10S"
			};

			this.getView().setBusy(true);

			this._save(oData).then(this.fnSuccess.bind(this), this.fnError);
		},

		_save: function (oData) {

			return new Promise(

				function (resolve, reject) {

					var oModel = this.getView().getModel();

					oModel.create("/TimeEventSet", oData, {
						success: function (oData, oResponse) {
							resolve(oData);
						},
						error: (oError) => {
							reject(oError);
						}
					});

				}.bind(this)
			);
		},
		fnSuccess: function (oData) {
			this.getView().setBusy(false);
			sap.ui.core.UIComponent.getRouterFor(this).navTo("TargetOverview");
		},
		fnError: function () {
			debugger;
		}

	});

});