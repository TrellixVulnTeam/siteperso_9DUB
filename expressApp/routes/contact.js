const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const validator=require("validator");
const nodeMailer= require("nodemailer");

router.get("/", function(req,res,next){
    res.render("contact",{csrfToken: req.csrfToken()});
})
module.exports = router;

router.post("/send-form",async function(req,res,next){
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.MAIL_USER_NAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    const notification={
        from: process.env.MAIL_USER_NAME,
        to: "alexandresage56@gmail.com",
        subject: `Demande de contact de: ${req.body.first_name} ${req.body.name}`,
        html: `<div>
                    <p>Nom: ${req.body.name}</p>
                    <p>Prénom: ${req.body["first-name"]}</p>
                    <p>Mail: ${req.body.email}</p>
                    <p>Téléphone: ${req.body.phone}</p>
                    <p>Message: Nom: ${req.body.message}</p>
                </div>`
    }
    const mail={
        from: process.env.MAIL_USER_NAME,
        to: req.body.email,
        subject: "Confirmation demande de contact",
        html:`
                <div>
                    <div>
                        <p >Bonjour ${req.body["first-name"]} ${req.body.name}, j'ai bien reçu votre demande de contact, je vous remercie pour l'intéret que vous portez à mon projet professionel, je vous recontacterais dans les délais les plus bref</p>
                        <p>Cordialement Alexandre Sage</p>
                    </div>
                </div>`
    }
    /*style="
    width: 100%;
    heigth: 35rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items:center;"*/
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
            return(
                message=`Le champ ${traductionFrObj[item[0]]} est vide`,
                delete item[0]
            )
        } else if(item[0]==="email" && !validator.isEmpty(item[1])) {
            return !validator.isEmail(item[1])?(
                message="Email invalide",
                delete req.body[item[0]]
            ):null
        } else if(item[0]==="phone"){
            return !validator.isMobilePhone(item[1])?(
                message="Téléphone mobile invalide",
                delete req.body[item[0]]
            ):null
        }
    })
    const sendFormSqlRequest= `INSERT INTO contact(name,first_name,email,phone,message)
                                VALUES(?,?,?,?,?)`;
    if(req.body.email && req.body.name &&req.body.phone && req.body.message){
        do{
            try{
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
            res.status(200).json({
                message: "Votre méssage à bien été enregistrer, je vous recontacterais le plus tot possible.",
                validator: true
            });
            transporter.sendMail(mail,(err,info)=>err?console.log("err",err):console.log("info",info));
            transporter.sendMail(notification,(err,info)=>err?console.log("err",err):console.log("info",info));
        };
    }else{
        res.status(600).json({
            message: message,
            validator: false
        })
    }
})
module.exports = router;
