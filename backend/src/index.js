const express = require('express');
const app = express();
const allRoutes=require('./routes/index')
const config=require('../src/config')
const customErrorHandler=require('./middleware/errorHandler/index')
const cors = require('cors')


require('./db/mongoose');



app.use(cors())
app.use(express.json());
app.use('/api',allRoutes)
app.use(customErrorHandler)


app.listen(config.PORT, () => console.log(`Server up and running on ${config.PORT}`));

