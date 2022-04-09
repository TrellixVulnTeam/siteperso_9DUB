const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const validator=require("validator")

router.get("/", function(req,res,next){
    res.render("contact",{csrfToken: req.csrfToken()});
})
module.exports = router;

router.post("/send-form",async function(req,res,next){
    const dataBase=req.app.locals.db;
    let sucess=false;
    console.log(req.body);
    const traductionFrObj={
        name: "Nom",
        email: "Email",
        "first-name": "Prénom",
        phone: "Téléphone",
        message: "Message"
    }
    let message;
    Object.entries(req.body).find(function(item) {
        if(validator.isEmpty(item[1])){
            return item[0]!=="phone"?(
                message=`Le champ ${traductionFrObj[item[0]]} est vide`,
                delete req.body[item[0]],
                console.log(req.body)
            ): delete req.body[item[0]]
        } else if(item[0]==="email" && !validator.isEmpty(item[1])) {
            return !validator.isEmail(item[1])?(
                message="Email invalide",
                delete req.body[item[0]]
            ):null
        } else if(item[0]==="phone" && !validator.isEmpty(item[1])){
            return !validator.isMobilePhone(item[1],"fr-FR")?(
                message="Téléphone invalide",
                delete req.body[item[0]]
            ):null
        }
    })
    console.log(message);
    console.log(req.body);

    const sendFormSqlRequest= `INSERT INTO contact(name,first_name,email,phone,message)
                                VALUES(?,?,?,?,?)`;
    if(req.body.email && req.body.name && req.body.phone && req.body.message){
    do{
        try{
            console.log("db");
            await dataBase.promise().query(sendFormSqlRequest,[req.body.name,req.body["first-name"],req.body.email,req.body.phone,req.body.message])
            sucess=true;
        } catch(err){
            console.log(err);
            res.status(900)
            /*switch(err.code){
                case "ER_DATA_TOO_LONG":
                    switch(err.message){
                        case "Data too long for column 'phone' at row 1":
                            res.json({
                                message: "Votre numéro de téléphone comporte trop de caratère veuillez éssayer à nouveaux",
                                validator: false
                            }).end();
                        break;
                        case "Data too long for column 'name' at row 1":
                            res.json({
                                message: "Votre nom comporte trop de caratère veuillez éssayer à nouveaux",
                                validator: false
                            }).end();
                        break;
                        case "Data too long for column 'email' at row 1":
                            res.json({
                                message: "Votre email comporte trop de caratère veuillez éssayer à nouveaux",
                                validator: false
                            }).end();
                        break;
                        case "Data too long for column 'first_name' at row 1":
                            res.json({
                                message: "Votre prénom comporte trop de caratère veuillez éssayer à nouveaux",
                                validator: false
                            }).end();
                        break;
                        case "Data too long for column 'first_name' at row 1":
                            res.status(202).json({
                                message: "Votre prénom comporte trop de caratère veuillez éssayer à nouveaux",
                                validator: false
                            }).end();
                        break;
                    };
                break;
                case "ER_BAD_NULL_ERROR":
                    switch(err.message){
                        case "Column 'name' cannot be null":
                        res.json({
                            message: "Le champ nom est vide  veuillez le remplir",
                            validator: false
                        });
                        break;
                        case "Column 'first_name' cannot be null":
                        res.json({
                            message: "Le champ prénom est vide  veuillez le remplir",
                            validator: false
                        });
                        break;
                        case "Column 'email' cannot be null":
                        res.json({
                            message: "Le champ email est vide  veuillez le remplir",
                            validator: false
                        });
                        break;
                        case "Column 'phone' cannot be null":
                        res.json({
                            message: "Le champ telephone est vide  veuillez le remplir",
                            validator: false
                        });
                        break;
                        case "Column 'message' cannot be null":
                        res.json({
                            message: "Le champ message est vide  veuillez le remplir",
                            validator: false
                        });
                        break;
                    }
                break;*/
            //}
        }
    } while(!sucess){
        console.log("while");
        res.status(200).json({
            message: "Votre méssage à bien été enregistrer, je vous recontacterais le plus tot possible.",
            validator: true
        })
    }
}else{
    res.status(600).json({
        message: message,
        validator: false
    })
}
})
module.exports = router;
