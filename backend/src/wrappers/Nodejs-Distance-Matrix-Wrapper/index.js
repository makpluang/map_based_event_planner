var distance = require('distance-matrix-api');

distance.key('AlphaDMA3YmNfpQ1qd73HPM7xVgPA48J2ADMgFV9');
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