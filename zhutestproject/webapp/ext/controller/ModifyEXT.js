// sap.ui.define([
//     "sap/m/MessageToast"
// ], function(MessageToast) {
//     'use strict';

//     return {
//         /**
//          * Generated event handler.
//          *
//          * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
//          * @param aSelectedContexts the selected contexts of the table rows.
//          */
//         fnModify: function(oContext, aSelectedContexts) {
//             MessageToast.show("Custom handler invoked.");
//         }
//     };
// });

sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/Text",
    "sap/m/Button",
    "sap/ui/layout/form/SimpleForm"
], function(MessageToast, Dialog, Label, Input, Text, Button, SimpleForm) {
    'use strict';

    return {
        fnModify: function(oContext, aSelectedContexts) {
            if (!aSelectedContexts || aSelectedContexts.length === 0) {
                MessageToast.show("No item selected.");
                return;
            }
            const oModel = aSelectedContexts[0].getModel();

            const oData = aSelectedContexts[0].getObject();

            const oDialog = new Dialog({
                title: "Edit Division and Exception",
                contentWidth: "400px",
                content: new SimpleForm({
                    editable: true,
                    content: [
                        new Label({ text: "Category" }),
                        new Text({ text: oData.Category }),

                        new Label({ text: "Created On" }),
                        new Text({ text: oData.Createdon }),

                        new Label({ text: "User" }),
                        new Text({ text: oData.Ernam }),

                        new Label({ text: "Exidv" }),
                        new Text({ text: oData.Exidv }),

                        new Label({ text: "Inhalt" }),
                        new Text({ text: oData.Inhalt }),

                        new Label({ text: "Lgnum" }),
                        new Text({ text: oData.Lgnum }),

                        new Label({ text: "ZUL_AUFL" }),
                        new Text({ text: oData.ZUL_AUFL }),

                        new Label({ text: "Division (Vegr1)" }),
                        new Input({ value: oData.Vegr1 }),

                        new Label({ text: "Exception (VhilmKu)" }),
                        new Input({ value: oData.VhilmKu })
                    ]
                }),
                beginButton: new Button({
                    text: "Save",
                    press: function () {
                        const aContent = oDialog.getContent()[0].getContent();
                        const sNewDivision = aContent[15].getValue();
                        const sNewException = aContent[17].getValue();

                        // oData.Vegr1 = sNewDivision;
                        // oData.VhilmKu = sNewException;

                        MessageToast.show("Updated Division and Exception.");
                        oModel.refresh();
                        oDialog.close();
                    }
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
                    }
                }),
                afterClose: function () {
                    oDialog.destroy();
                }
            });

            oDialog.open();
        }
    };
});