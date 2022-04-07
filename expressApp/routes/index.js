const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
//const upload= multer({dest: "./public/images/usersImages"});

router.post("/testsql",function(req,res,next){
    dataBase= req.app.locals.db;
    const sql=`SELECT * FROM contact WHERE contact_id = "${req.body.answer}"`
    //console.log(req.body.answer);
    //console.log(dataBase.query(sql,req.body.answer));
    dataBase.query(sql,(err,response)=>{
            console.log(req.body.answer);
            console.log(response);
            res.json({response: response})
        })


})

router.get("/header", function(req,res,next){
    const dataBase= req.app.locals.db;
    const sqlRequestHeader=`SELECT * FROM my_info`;
    dataBase.query(sqlRequestHeader,[],(err, my_info)=>{
        delete my_info.info_id;
        res.json(my_info)
    })
})
module.exports = router;


router.get("/",(req,res,next)=>res.redirect("acceuil"))
router.get('/acceuil', function(req, res, next) {
    const dataBase= req.app.locals.db;
    //console.log(csurf());
    const sqlRequestHeader=`SELECT * FROM my_info`;
    dataBase.query(sqlRequestHeader,[],(err, my_info)=>{
        const description=my_info[0].description
        console.log(description);
        res.render('landingPage', { description: description ,csrfToken: req.csrfToken()});
    })
});
module.exports = router;


router.get("/apropos", function(req,res,next){
    const dataBase=req.app.locals.db;
    const sqlRequestAbout= `SELECT about_paragraph FROM about`
    dataBase.query(sqlRequestAbout,[],(err, about_paragraph)=>res.render("about",{about_paragraph: about_paragraph}))
})
module.exports = router;


router.get("/langages",function(req,res,next){
    const dataBase=req.app.locals.db;
    const sqlRequestLanguages=`SELECT * FROM langages_frameworks`;
    dataBase.query(sqlRequestLanguages,[],(err, langages_frameworks)=>res.json(langages_frameworks))
})

router.get("/download",(req,res,next)=>{
    res.download(path.resolve("./src/downloads/cv.txt") ,err=>console.log(err))
})
module.exports = router;


router.get("/projet", function(req,res,next){
    res.render("project");
})
module.exports = router;

router.get("/my-project", function(req,res,next){
    const dataBase=req.app.locals.db;
    const projectSqlRequest=`SELECT * FROM my_project INNER JOIN langages_frameworks ON langages_frameworks_id
    WHERE langages_frameworks_id=project_langage_id`;
    dataBase.query(projectSqlRequest,[],(err,projects)=>{
        res.json(projects)
    });
})
module.exports = router;

router.get("/my-component", function(req,res,next){
    const dataBase=req.app.locals.db;
    const componentSqlRequest=`SELECT * FROM my_component INNER JOIN langages_frameworks ON langages_frameworks_id
    WHERE langages_frameworks_id=component_langage_id`;
    dataBase.query(componentSqlRequest,[],(err,components)=>{
        res.json(components)
    });
})
module.exports = router;
//console.log(err.message.split("'")[1]);
/*res.json({
    message: `Votre numéro de téléphone comporte trop de caratère veuillez éssayer à nouveaux`,
    validator: false
});*/
