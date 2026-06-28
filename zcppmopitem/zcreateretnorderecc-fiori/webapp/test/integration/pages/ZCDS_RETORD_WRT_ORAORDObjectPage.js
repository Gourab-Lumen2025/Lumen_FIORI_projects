sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'lumen.zcreateretneccoracleorder',
            componentId: 'ZCDS_RETORD_WRT_ORAORDObjectPage',
            contextPath: '/ZCDS_RETORD_WRT_ORAORD'
        },
        CustomPageDefinitions
    );
});