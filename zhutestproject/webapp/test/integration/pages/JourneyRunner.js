sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/lumen/zhutestproject/test/integration/pages/WHU_TBLList",
	"com/lumen/zhutestproject/test/integration/pages/WHU_TBLObjectPage"
], function (JourneyRunner, WHU_TBLList, WHU_TBLObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/lumen/zhutestproject') + '/test/flp.html#app-preview',
        pages: {
			onTheWHU_TBLList: WHU_TBLList,
			onTheWHU_TBLObjectPage: WHU_TBLObjectPage
        },
        async: true
    });

    return runner;
});

