sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'lumen/zcreateretneccoracleorder/test/integration/FirstJourney',
		'lumen/zcreateretneccoracleorder/test/integration/pages/ZCDS_RETORD_WRT_ORAORDList',
		'lumen/zcreateretneccoracleorder/test/integration/pages/ZCDS_RETORD_WRT_ORAORDObjectPage'
    ],
    function(JourneyRunner, opaJourney, ZCDS_RETORD_WRT_ORAORDList, ZCDS_RETORD_WRT_ORAORDObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('lumen/zcreateretneccoracleorder') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheZCDS_RETORD_WRT_ORAORDList: ZCDS_RETORD_WRT_ORAORDList,
					onTheZCDS_RETORD_WRT_ORAORDObjectPage: ZCDS_RETORD_WRT_ORAORDObjectPage
                }
            },
            opaJourney.run
        );
    }
);