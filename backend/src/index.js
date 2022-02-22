const express = require('express');
const app = express();
const allRoutes=require('./routes/index')
const config=require('../src/config')
const cors = require('cors')

//database connections
require('./db/mongoose');



//middlwares
app.use(cors())
app.use(express.json());
app.use(allRoutes)



//listening to server 
app.listen(config.PORT, () => console.log(`Server up and running on ${config.PORT}`));

