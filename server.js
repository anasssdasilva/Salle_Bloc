require('./models/db');
const express = require('express');
const path = require('path');
const {Socket}=require('socket.io');   
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyparser = require('body-parser');
const Occupation = require('./models/occupation.model');
const QRCode = require('qrcode');

const blocController = require('./controllers/blocController');
const salleController = require('./controllers/salleController');
const crenauController = require('./controllers/crenauController');
const occupationController = require('./controllers/occupationController');
var app = express();
function dateCompare(time1, time2) {
    var t1 = new Date();
    var parts = time1.split(":");
    t1.setHours(parts[0], parts[1], "00", 0);
    var t2 = new Date();
    parts = time2.split(":");
    t2.setHours(parts[0], parts[1], "00", 0);

    // returns 1 if greater, -1 if less and 0 if the same
    if (t1.getTime() > t2.getTime()) return 1;
    if (t1.getTime() < t2.getTime()) return -1;
    return 0;
}

var http = require('http').createServer(app);
var io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('user connected');
    

    const changeStream = Occupation.watch();
    changeStream.on('change', next => {
        const resumeToken = changeStream.resumeToken;
        const operation = next.operationType;

        if (next.operationType === 'insert') {
            
            //  console.log(next.fullDocument._idSalle)
            socket.emit("test",  next.fullDocument.date, next.fullDocument.namesalle, next.fullDocument.crenauhr,next.fullDocument._id);
            var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() ;
    var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

todayy = yyyy + '-' + mm + '-' + dd;
console.log(todayy);
    Occupation.find((err, docs) => {
        console.log(docs);
        var t1 = new Date();
        for (i = 0; i < docs.length; i++) {
            if(docs[i].date==todayy & dateCompare(docs[i].crenauhr.substring(0,5),time)==-1 & dateCompare(docs[i].crenauhr.substring(8,14),time)==1){
                    console.log("des occupations");
                    socket.emit("list",docs[i].namesalle);
                }
                
            console.log("non occupations");

        }
        
        

    });

        }
    });
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() ;
    var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

todayy = yyyy + '-' + mm + '-' + dd;
console.log(todayy);
    Occupation.find((err, docs) => {
        console.log(docs);
        var t1 = new Date();
        for (i = 0; i < docs.length; i++) {
            if(docs[i].date==todayy & dateCompare(docs[i].crenauhr.substring(0,5),time)==-1 & dateCompare(docs[i].crenauhr.substring(8,14),time)==1){
                    console.log("des occupations");
                    socket.emit("list",docs[i].namesalle);
                }
            console.log("non occupations");

        }


    });

})
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

http.listen(3000, () => {
    console.log('Express server started at port :3000');
});
app.use('/bloc', blocController);
app.use('/salle', salleController);
app.use('/crenau', crenauController);
app.use('/occupation', occupationController);