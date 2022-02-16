const express = require('express');
const app = express();

//add all routes
const authRoute = require('./routes/authroute/auth');
const checkpointsRoute = require('./routes/pathroutes/add_checkpoints');
const pathsroutes=require('./routes/pathroutes/all_paths')
const pathroute=require('./routes/pathroutes/add_path')
const config=require('../src/config')


//database connections
require('./db/mongoose');



//middlwares
app.use(express.json());
app.use('/api/admins', authRoute);//adding admins
app.use('/api/checkpoints', checkpointsRoute);//this route is reponsible for adding the new check points 
app.use('/api/path',pathroute)//this is total path created
app.use('/api/paths',pathsroutes);//this is path exposed for assigning to the coming user
//startegy to assign path is selecting random path from api/paths and assign to the map end point
//along with start and end point


//listening to server 
app.listen(config.PORT, () => console.log(`Server up and running on ${config.PORT}`));

