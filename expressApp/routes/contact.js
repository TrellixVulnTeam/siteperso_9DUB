router.get("/contact", function(req,res,next){
    console.log(req.csrfToken());
    //res.cookie("XSRF-token", req.csrfToken())
    res.render("contact",{csrfToken: req.csrfToken()});
})
module.exports = router;

router.post("/send-form",async function(req,res,next){
    //const csrfToken=req.csrfToken()
    //console.log(csrfToken);
    //console.log(req.body);
    const dataBase=req.app.locals.db;
    let sucess=false;
    const sendFormSqlRequest= `INSERT INTO contact(name,first_name,email,phone,message)
                                VALUES(?,?,?,?,?)`;
    do{
        try{
            await dataBase.promise().query(sendFormSqlRequest,[req.body.name,req.body["first-name"],req.body.email,req.body.phone,req.body.message])
            sucess=true;
        } catch(err){
            //console.log(err);
            switch(err.code){
                case "ER_DATA_TOO_LONG":
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
                break;
            }
        }
    } while(!sucess){
        res.json({
            message: "Votre méssage à bien été enregistrer, je vous recontacterais le plus tot possible.",
            validator: true
        })
    }
})
module.exports = router;
