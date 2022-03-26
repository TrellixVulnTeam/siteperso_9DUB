const sendingButton= document.getElementById("form-sending-button");
const inputs=document.getElementsByClassName("form-input");
const answers={};
const response={
    message: null,
    validator: false
};

const popUpObj={
    message: null,
    tag: null,
    firstPopUp(){
        console.log(this);
        const tag= document.getElementById(this.tag);
        const firstPopUp=elementCreator({tag:"div", classList: "contact-pop-up"});
        firstPopUp.append(elementCreator({tag:"p", text: "Souhaitez vous télécharger mon CV?"}));
        firstPopUp.append(elementCreator({tag:"div",classList:"contact-pop-up-btn-container"}));
        firstPopUp.children[1].append(elementCreator({tag: "div", classList: "download-cv-button", text: "Télécharger Cv"}));
        firstPopUp.children[1].append(elementCreator({tag: "div", classList: "contact-pop-up-continue-btn", eventFunction: this.secondPopUp, text: "Continuer"}));
        tag.prepend(firstPopUp);
        document.body.appendChild(Object.assign(document.createElement("script"),{src: "/scripts/cv.js"}));
    },
    secondPopUp(){
        const tag=document.getElementById(popUpObj.tag);
        const secondPopUp= elementCreator({tag:"div",classList:"contact-pop-up"});
        tag.children[0].remove();
        secondPopUp.appendChild(elementCreator({tag:"p", text: popUpObj.message}));
        tag.prepend(secondPopUp);
        const removePopUp=(secondPopUp)=>secondPopUp.remove();
        setTimeout(()=>removePopUp(secondPopUp),4000);
   },
};

sendingButton.addEventListener("click",(event)=>{
    Object.entries(inputs).forEach((item) => {
        switch(item[1].name){
            case "name":
                return answers.name=item[1].value;
            break;
            case "first-name":
                return answers.firstName=item[1].value;
            break;
            case "email":
                return answers.email=item[1].value;
            break;
            case "phone":
                return answers.phone=item[1].value;
            break;
            case "message":
                return answers.message=item[1].value;
            break;
        };
    });
    fetch("http://localhost:4000/send-form",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
        credentials: "include",
    })
    .then(response=>response.json())
    .then(data => {
        popUpObj.tag="contact-form";
        popUpObj.message=data.message;
        popUpObj.firstPopUp();
    });
});
