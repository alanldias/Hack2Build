sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'weighingcontracts/test/integration/FirstJourney',
		'weighingcontracts/test/integration/pages/WeighingMain'
    ],
    function(JourneyRunner, opaJourney, WeighingMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('weighingcontracts') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheWeighingMain: WeighingMain
                }
            },
            opaJourney.run
        );
    }
);