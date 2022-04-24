const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

router.get("/platformer",(req,res,next)=>res.render("components/videoGame"))

module.exports=router;
