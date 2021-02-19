const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const db = require('./db');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const cors = require('cors');

const fileRouter = require('./routes/file');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(cors({
    origin: '*',
}));
app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = db.url;
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// connect to the database
connect.then(() => {
  console.log('Connected to database: Elpis');
}, (err) => console.log(err));

/* 
    GridFs Configuration
*/

// create storage engine
const storage = new GridFsStorage({
    url: db.url,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage: storage });
console.log(upload,'love')
app.use('/', fileRouter(upload));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(req, res)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
