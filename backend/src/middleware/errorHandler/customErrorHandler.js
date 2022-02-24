
   async function apiErrorHandler(err, req, res, next) {
  

  if (err) {
    res.status(err.statusCode || 500).json(err.message);
    return;
  }

  res.status(500).json('something went wrong');
}

module.exports = apiErrorHandler;

