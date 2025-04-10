sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'hack2build/myapplication/test/integration/FirstJourney',
		'hack2build/myapplication/test/integration/pages/WeighingMain'
    ],
    function(JourneyRunner, opaJourney, WeighingMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('hack2build/myapplication') + '/index.html'
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