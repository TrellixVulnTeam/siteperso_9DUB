const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser=require("cookie-parser")
const logger = require('morgan');
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');
const componentRouter= require("./routes/components");
const bodyParser = require('body-parser');
const cors= require("cors");
const multer = require('multer');
const app = express();
const csurf = require('csurf');
require('dotenv').config();
const sassMiddleware = require('node-sass-middleware');
app.use(cors({
    origin: "192.168.1.22",
    methods:["GET","POST"],
    credentials: true,
    optionsSuccessStatus: true,
    //Access-Control-Allow-Origin: true
}))
app.use(sassMiddleware({
  src: path.join(__dirname, 'src/styles/scss'),
  dest: path.join(__dirname, 'src/styles/css'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(bodyParser.urlencoded({extended:true}))
/*VUE*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/*FIN VUE*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
/*CSURF*/
app.use(csurf({
  cookie:  {
    //maxAge: 300,
    secure: true,
    //sameSite: 'none'
}
}));
app.use((req,res,next)=>{
    console.log(err);
    next()
})
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN'){
    console.log(req.headers);
    console.log("Cookie", req.cookies._csrf);
    console.log("Token", req.csrfToken())
    res.status(403);
    res.send(`The CSRF token is invalid ${req.csrfToken()}`);
  } else {
    next();
  }
});
/*FIN C SURF*/

//app.use((err, req, res, next) => {}
/*ROUTE ET FICHIER STATIQUE*/
app.use(express.static(path.join(__dirname, 'src')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/', indexRouter);
app.use("/component", componentRouter);
app.use("/contact", contactRouter);
/*FIN ROUTE ET FICHIER STATIQUE*/
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
