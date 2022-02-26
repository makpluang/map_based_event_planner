/* eslint-disable no-console */
/*

For now not using this function
*/
const distance = require('distance-matrix-api');
const config = require('../../config');

distance.key(config.DistanceMatrixKey);
distance.units('imperial');

function callback(startloc, endloc) {
  const origins = startloc;
  const destinations = endloc;
  // eslint-disable-next-line consistent-return
  distance.matrix(origins, destinations, (err, distances) => {
    if (err) {
      return console.log(err);
    }
    if (!distances) {
      return console.log('no distances');
    }
    if (distances.status === 'OK') {
      return distances;
    }
  });
}

module.exports = callback;
