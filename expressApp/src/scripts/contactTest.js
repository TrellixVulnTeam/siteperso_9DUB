alert("linked");
const sendingButton= document.getElementById("form-sending-button");
const form=document.getElementById("contact-form")
console.log(form);
form.addEventListener("submit", (event)=>event.preventDefault())
//sendingButton.addEventListener("click",event=>{console.log("here"),event.preventDefault()})
