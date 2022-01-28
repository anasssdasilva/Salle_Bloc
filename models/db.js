const mongoose = require('mongoose');

mongoose.connect('mongodb://anass:anass@cluster0-shard-00-00.y7nef.mongodb.net:27017,cluster0-shard-00-01.y7nef.mongodb.net:27017,cluster0-shard-00-02.y7nef.mongodb.net:27017/BlocDB?authSource=admin&replicaSet=atlas-une10l-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', { useNewUrlParser: true,useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./bloc.model');
require('./salle.model');
require('./crenau.model');
require('./occupation.model');
