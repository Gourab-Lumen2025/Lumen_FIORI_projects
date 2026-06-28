sap.ui.define([
    "sap/ui/model/Filter"
], function (Filter) {
    "use strict";
    // controller for custom filter, navigation param, action(quick view and global filter), navigation target 
    // controller class name can be like app.ovp.ext.CustomFilter where app.ovp can be replaced with your application namespace
    return {

        onBeforeRendering: function () {
            this.previousFilterValues = {}
        },
        getCustomFilters: function () {
            /* This method returns a filter object to the OVP library. If there are multiple filters, they should 
            be clubbed into single Filter object. */		
           var oGlobalFilter = this.getView().byId("ovpGlobalFilter");
            var oFilterData = oGlobalFilter.getFilterData();
            var CustomerCategory = oFilterData.CustomerCategory;
            var Product = oFilterData.Product;
            if (CustomerCategory) {
                if (CustomerCategory == 'UNITED STATES POSTAL SERVICE' && CustomerCategory !== this.previousFilterValues.OldCustomerCategory) {
                    var oProductFilter = {
                        "Product": "ENTERPRISE WIRELESS ACCESS SERVICE"
                    };
                    oGlobalFilter.setFilterData(oProductFilter);
                }
                else if (CustomerCategory != 'UNITED STATES POSTAL SERVICE' && CustomerCategory!== this.previousFilterValues.OldCustomerCategory) {
                    {
                        var oProductFilter = {
                            "Product": ""
                        };
                    oGlobalFilter.setFilterData(oProductFilter);
                    }
                }
            }
            this.previousFilterValues = {
                "OldProduct" : Product,
                "OldCustomerCategory" : CustomerCategory
            }
        }
        
    }
});