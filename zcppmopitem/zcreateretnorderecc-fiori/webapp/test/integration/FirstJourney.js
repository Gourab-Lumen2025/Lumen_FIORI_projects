sap.ui.define([
    "sap/ui/test/opaQunit"
], function (opaTest) {
    "use strict";

    var Journey = {
        run: function() {
            QUnit.module("First journey");

            opaTest("Start application", function (Given, When, Then) {
                Given.iStartMyApp();

                Then.onTheZCDS_RETORD_WRT_ORAORDList.iSeeThisPage();

            });


            opaTest("Navigate to ObjectPage", function (Given, When, Then) {
                // Note: this test will fail if the ListReport page doesn't show any data
                
                When.onTheZCDS_RETORD_WRT_ORAORDList.onFilterBar().iExecuteSearch();
                
                Then.onTheZCDS_RETORD_WRT_ORAORDList.onTable().iCheckRows();

                When.onTheZCDS_RETORD_WRT_ORAORDList.onTable().iPressRow(0);
                Then.onTheZCDS_RETORD_WRT_ORAORDObjectPage.iSeeThisPage();

            });

            opaTest("Teardown", function (Given, When, Then) { 
                // Cleanup
                Given.iTearDownMyApp();
            });
        }
    }

    return Journey;
});