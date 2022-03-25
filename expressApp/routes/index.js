const express = require('express');
const router = express.Router();
const multer = require('multer');
const app = express();
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

router.get("/projet", function(req,res,next){
    res.render("project")
})
module.exports = router;
/*let langagesArray=[]
let secondArray= []
data.forEach((langage, iterator) => {
    if(iterator<=5){
        langagesArray.push(langage)
    } else if(iterator>5 && iterator<=11){
        secondArray.push(langage)
    }
    iterator===11? this.setState({
        langagesData: langagesArray,
        secondLangagesData: secondArray
    }): null*/
    /*let langagesArray=[[],[],[],[]]
    let index=0
    data.forEach((langage, iterator) => {
        langagesArray[index].length===3?i++:null
        langagesArray[index].push(langage)
        iterator===11? this.setState({
            langagesData: langagesArray
        }): null
    });*/
