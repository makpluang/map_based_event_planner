/*


For now not using this function
*/
var distance = require('distance-matrix-api');
const config=require('../../config')
distance.key(config.DistanceMatrixKey);
distance.units('imperial');

function callback  (startloc,endloc){
    var origins = startloc;
    var destinations = endloc;
   distance.matrix(origins, destinations,function (err, distances) {
        if (err) {
            return console.log(err);
        }
        if(!distances) {
            return console.log('no distances');
        }
        if (distances.status == 'OK') {
            
           console.log(distances)
            return distances
        }
        

    });
    

}



module.exports=callback


