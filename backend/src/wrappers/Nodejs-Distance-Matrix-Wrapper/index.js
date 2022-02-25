var distance = require('distance-matrix-api');
const config=require('../../config')
distance.key(config.DistanceMatrixKey);
distance.units('imperial');
var newDistance;


const distance_matrix_wrapper=async (startloc,endloc)=>{
         var origins = [startloc];
        var destinations = [endloc];
distance.matrix(origins, destinations, function (err, distances) {
    if (!err)
        newDistance=distances;
})
return newDistance;

}
module.exports=distance_matrix_wrapper