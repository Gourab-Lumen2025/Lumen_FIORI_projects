sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'lumen.zcreateretneccoracleorder',
            componentId: 'ZCDS_RETORD_WRT_ORAORDList',
            contextPath: '/ZCDS_RETORD_WRT_ORAORD'
        },
        CustomPageDefinitions
    );
});