const sendingButton= document.getElementById("form-sending-button");
const inputs=document.getElementsByClassName("form-input");
const answers={};
const response={
    message: null,
};
const popUpObj={
    message: null,
    tag: null,
    validator: false,
    firstPopUp(){
        const tag= document.getElementById(this.tag);
        const firstPopUp=elementCreator({tag:"div", classList: "contact-pop-up"});
        firstPopUp.append(elementCreator({tag:"p", text: "Souhaitez vous télécharger mon CV?"}));
        firstPopUp.append(elementCreator({tag:"div",classList:"contact-pop-up-btn-container"}));
        firstPopUp.children[1].append(elementCreator({tag: "div", classList: "download-cv-button", text: "Télécharger Cv"}));
        firstPopUp.children[1].append(elementCreator({tag: "div", classList: "pop-up-continue-btn", eventFunction: this.secondPopUp, text: "Continuer"}));
        tag.prepend(firstPopUp);
        document.body.appendChild(Object.assign(document.createElement("script"),{src: "/scripts/cv.js"}));
    },
    secondPopUp(){
        const tag=document.getElementById(popUpObj.tag);
        if(popUpObj.validator){
            Object.entries(tag.children[0].children).forEach((item, i) => {
                item[1].remove()
            });
            const secondPopUp= tag.children[0];
            const removePopUp=(secondPopUp)=>secondPopUp.remove();
            secondPopUp.appendChild(elementCreator({tag:"p", text: popUpObj.message}));
            setTimeout(()=>removePopUp(secondPopUp),4000);
        }else{
            const secondPopUp=elementCreator({tag:"div", classList: "contact-pop-up"});
            const removePopUp=(secondPopUp)=>secondPopUp.remove();
            secondPopUp.appendChild(elementCreator({tag:"p", text: popUpObj.message}));
            tag.prepend(secondPopUp);
            setTimeout(()=>removePopUp(secondPopUp),4000);
        }
   },
};

sendingButton.addEventListener("click",(event)=>{
    const inputArray=["name","first-name","email","phone","message"];
    Object.entries(inputs).forEach((input) => {
        inputArray.find(item=>{
            if(input[1].name===item){
                return answers[item]=input[1].value
                //return input[1].value?answers[item]=input[1].value:answers[item]=null;
            };
        });
    });
    console.log(answers);

    const csurfToken=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch("http://localhost:4000/contact/send-form",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "CSRF-token": csurfToken
        },
        body: JSON.stringify(answers),
        credentials: "include",
    })
    .then(response=>response.json())
    .then(data => {
        console.log(data);
        popUpObj.tag="contact-main";
        popUpObj.message=data.message;
        popUpObj.validator=data.validator;
        console.log(data.validator);
        data.validator?popUpObj.firstPopUp():popUpObj.secondPopUp();
    }).catch(err=>console.log(err))

});
