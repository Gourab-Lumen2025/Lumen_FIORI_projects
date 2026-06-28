sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.lumen.zhutestproject',
            componentId: 'WHU_TBLList',
            contextPath: '/WHU_TBL'
        },
        CustomPageDefinitions
    );
});