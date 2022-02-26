/* eslint-disable no-plusplus */
const distance = require('distance-matrix-api');
const Errors = require('../../toolbox/errors');
const newDistances = require('../../wrappers/Nodejs-Distance-Matrix-Wrapper/index');
const config = require('../../config/index');

distance.key(config.DistanceMatrixKey);
const { BootcampProjectCache, redisClient } = require('../../wrappers/bootcamp-project-cache/bootcampCache');

distance.units('imperial');
const {
  BadRequest, STATUS_CODES,
} = Errors;

const getPairOfDistances = async (req, res) => {
  const startLocation = req.params.start;
  const endLocation = req.params.end;
  const key = startLocation.concat('_distance_', endLocation);
  const toBeSendFromCache = await BootcampProjectCache.getCacheByKey(key);
  if (toBeSendFromCache) {
    res.send(JSON.parse(toBeSendFromCache));
  } else {
    const newValue = newDistances(startLocation, endLocation);
    newValue.then((val) => {
      redisClient.set(key, JSON.stringify(val));
      res.send(val);
    })
      .catch((err) => {
        throw err;
      });
  }
};
const getArrayOfDistances = async (req, res) => {
  const params = [req.params.arr].concat(req.params[0].split('/').slice(1));
  params.shift();
  const startContainer = [];
  const endContainer = [];
  let i = 0;
  let newkey = '';
  for (i = 0; i < params.length; i++) {
    if (params[i] === 'end') {
      break;
    }
    startContainer.push(params[i]);
    newkey = newkey.concat(params[i]);
  }
  newkey = newkey.concat('_distance_');
  for (let j = i + 1; j < params.length; j++) {
    endContainer.push(params[j]);
    newkey = newkey.concat(params[j]);
  }
  const toBeSendFromCache = await BootcampProjectCache.getCacheByKey(newkey);
  if (toBeSendFromCache) {
    res.send(JSON.parse(toBeSendFromCache));
  } else {
    distance.matrix(startContainer, endContainer, (err, distances) => {
      if (err) {
        throw BadRequest('OOps ,something went wrong towards Distance matrix APIs', STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
      if (!distances) {
        throw BadRequest('Check you ,have entered the startContainer and end locations correctl', STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
      if (distances.status === 'OK') {
        redisClient.set(newkey, JSON.stringify(distances));

        res.send(distances);
      }
    });
  }
};

module.exports = { getPairOfDistances, getArrayOfDistances };
