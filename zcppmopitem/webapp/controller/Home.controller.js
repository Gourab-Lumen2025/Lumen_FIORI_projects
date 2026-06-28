sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("com.lumen.zcppmopitem.controller.Home", {

        onInit: function () {
            const oModel = this.getOwnerComponent().getModel();
            sap.ui.core.BusyIndicator.show(0);

            oModel.read("/ZTIC_CPPMOPITEM_PoC_V2", {
                success: (oData) => {

                    // Step 1: Clean OData rows
                    const cleaned = oData.results.map(item => this.cleanODataRow(item));

                    // Step 2: Build Tree Structure
                    const tree = this.buildTree(cleaned);

                    // Step 3: Auto roll-up all numeric fields
                    tree.forEach(root => this.rollupAllAmounts(root));
                    console.log(tree);
                    sap.ui.core.BusyIndicator.hide();

                    // Step 4: Bind final tree model
                    this.getView().setModel(new JSONModel(tree), "tree");
                },
                error: () => {
                    sap.ui.core.BusyIndicator.hide();
                    MessageToast.show("Error loading OData");
                }
            });
        },

        //-------------------------------------------------------
        //  Clean each row: remove metadata + convert numeric fields
        //-------------------------------------------------------
        cleanODataRow: function (row) {
            const clean = { ...row };
            delete clean.__metadata;

            // Cost / budget fields in your CDS
            const numericFields = [
                //  "Bucket_ActualCost",
                "Initiative_H1_InlCapForcInit",
                "Item_ForecastBudgetTotal"
            ];

            numericFields.forEach(field => {
                const v = row[field];

                clean[field] = (v !== undefined && v !== null && v !== "" && !isNaN(v))
                    ? parseFloat(v)
                    : 0;   // <- IMPORTANT: avoid NaN
            });

            return clean;
        },


        //-------------------------------------------------------
        // Convert flat list → hierarchical tree
        //-------------------------------------------------------
        buildTree: function (flatData) {
            const map = {};
            const roots = [];

            flatData.forEach(item => {
                map[item.NodeId] = { ...item, children: [] };
            });

            flatData.forEach(item => {
                const parent = item.ParentId;

                if (parent && parent !== "00000000000000000000000000000000" && map[parent]) {
                    map[parent].children.push(map[item.NodeId]);
                } else {
                    roots.push(map[item.NodeId]);
                }
            });

            return roots;
        },

        //-------------------------------------------------------
        //  Auto-rollup ALL numeric fields across all levels
        //-------------------------------------------------------
        rollupAllAmounts: function (node) {
            if (!node.children || node.children.length === 0) {
                return node; // leaf node, already cleaned
            }

            node.children.forEach(child => this.rollupAllAmounts(child));

            // Detect numeric fields from first child
            const sample = node.children[0];
            const numericFields = Object.keys(sample).filter(
                k => typeof sample[k] === "number"
            );
            //     numericFields=[
            //     "Bucket_ActualCost",
            //     "Initiative_H1_InlCapForcInit",
            //     "Item_ForecastBudgetTotal"
            // ];
            numericFields.forEach(field => {
                let sum = 0;

                node.children.forEach(child => {
                    const val = child[field];
                    if (typeof val === "number" && !isNaN(val)) {
                        sum += val;
                    }
                });

                node[field] = sum;
            });

            return node;
        }, onSearch: function (oEvent) {
            // Collect filter values and apply to TreeTable
        },

        onFilterChange: function (oEvent) {
            // Optional: update UI or labels
        },

        onAfterVariantLoad: function (oEvent) {
            // Optional: handle variant logic
        }


    });
});
