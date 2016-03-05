
var PmzMetadataFile = (function(){
    'use strict';

    return {
        load: function (ini){
            var options = ini.Options;

            var delayNames = (options['DelayNames'] || '').split('\n');
            return new PmzMetadata(
                options.Name,
                options.CityName,
                options.Country,
                options.NeedVersion,
                options.MapAuthors.reduce(function(a, c) { return a + '\n' + c; }),
                delayNames);
        },
        
        save: function(metadata){
            var ini = { 
                Options: {
                    Name: metadata.name,
                    CityName: metadata.cityName || 'Unknown',
                    Country: metadata.countryName || 'Unknown',
                    NeedVersion: metadata.version || '1.0.0',
                    MapAuthors: (metadata.comments || 'File generated by aMetro editor.\nSite: http://editor.ametro.org').split('\n'),
                    
                }
            };
            if(metadata.delays){
                ini.Options.DelayNames = metadata.delays.reduce(function(a,c){ return a + ',' + c; });
            }

            return ini;
        }
    };

})();

