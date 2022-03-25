const sendingButton= document.getElementById("form-sending-button");
const inputs=document.getElementsByClassName("form-input");
const answers={};
sendingButton.addEventListener("click",(event)=>{
    Object.entries(inputs).forEach((item) => {
        console.log(`${item[1].value}`);
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
                console.log(answers);
                return answers.message=item[1].value;
            break;
        };
    })
    console.log(answers);
    fetch("http://localhost:4000/send-form",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
        credentials: "include",
    })
})
