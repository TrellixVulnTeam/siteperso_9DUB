const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

router.get("/test",function(req,res,next){
    const dataBase= req.app.locals.db;
    const sqlRequestImageCarousel=`SELECT * FROM carousel_component_images`;
    dataBase.query(sqlRequestImageCarousel,[], (err,images)=>{
        res.json(images)
    })
})
module.exports = router;
