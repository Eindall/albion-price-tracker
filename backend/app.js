let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
dataBaseConfig = require('./db/db');

createError = function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
}
// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('DB connected succesfully');
}, error => {
    console.log('Could not connect to DB : ' + error);
});

// Setup expressJS port
const userRoute = require('../backend/routes/users.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/albion-price-tracker')));
app.use('/', express.static(path.join(__dirname, 'dist/albion-price-tracker')));
app.use('/api', userRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port);
});

// Error handler
app.use(createError);

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});