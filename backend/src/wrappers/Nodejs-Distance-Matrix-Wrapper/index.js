const distance = require('distance-matrix-api');
const config = require('../../config');

distance.key(config.DistanceMatrixKey);
distance.units('imperial');
let newDistance;

const distancMatrixWrapper = async (startloc, endloc) => {
  const origins = [startloc];
  const destinations = [endloc];
  distance.matrix(origins, destinations, (err, distances) => {
    if (!err) { newDistance = distances; }
  });
  return newDistance;
};
module.exports = distancMatrixWrapper;
