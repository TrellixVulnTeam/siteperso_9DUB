const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
//const upload= multer({dest: "./public/images/usersImages"});


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
    const sqlRequestHeader=`SELECT * FROM my_info`;
    dataBase.query(sqlRequestHeader,[],(err, my_info)=>{
        const description=my_info[0].description
        console.log(description);
        res.render('landingPage', { description: description});
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


router.get("/contact", function(req,res,next){
    res.render("contact")
})
module.exports = router;

router.post("/send-form",async function(req,res,next){
    const dataBase=req.app.locals.db;
    let sucess=false;
    const sendFormSqlRequest= `INSERT INTO contact(name,first_name,email,phone,message)
                                VALUES(?,?,?,?,?)`;
    do{
        try{
            await dataBase.promise().query(sendFormSqlRequest,[req.body.name,req.body.firstName,req.body.email,req.body.phone,req.body.message])
            sucess=true;
        } catch(err){
            console.log(err);
            console.log(err.message.split("'"));
            switch(err.message){
                case "Data too long for column 'phone' at row 1":
                    res.json({
                        message: "Votre numéro de téléphone comporte trop de caratère veuillez éssayer à nouveaux",
                        validator: false
                    });
                break;
                case "Data too long for column 'name' at row 1":
                    res.json({
                        message: "Votre nom comporte trop de caratère veuillez éssayer à nouveaux",
                        validator: false
                    });
                break;
                case "Data too long for column 'email' at row 1":
                    res.json({
                        message: "Votre email comporte trop de caratère veuillez éssayer à nouveaux",
                        validator: false
                    });
                break;
                case "Data too long for column 'first_name' at row 1":
                    res.json({
                        message: "Votre prénom comporte trop de caratère veuillez éssayer à nouveaux",
                        validator: false
                    });
                break;
                case "Data too long for column 'first_name' at row 1":
                    res.json({
                        message: "Votre prénom comporte trop de caratère veuillez éssayer à nouveaux",
                        validator: false
                    });
                break;
            };
        }
    } while(!sucess){
        res.json({
            message: "Votre méssage à bien été enregistrer, je vous recontacterais le plus tot possible.",
            validator: true
        })
    }
})
module.exports = router;


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
        console.log(projects);
        res.json(projects)
    })
})


router.get("/my-component", function(req,res,next){
    const dataBase=req.app.locals.db;
    const componentSqlRequest=`SELECT * FROM my_component INNER JOIN langages_frameworks ON langages_frameworks_id
    WHERE langages_frameworks_id=component_langage_id`;
    dataBase.query(componentSqlRequest,[],(err,components)=>{
        console.log(components);
        res.json(components)
    })
})
