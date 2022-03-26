export default function elementCreator({tag,text= null, classList, eventFunction, href}){
    const newElement= classList?Object.assign(document.createElement(tag),{classList:classList , innerText:text}):Object.assign(document.createElement(tag),{ innerText:text})
    if(eventFunction){
        newElement.addEventListener("click",(event)=>eventFunction(event))
        return newElement
    } else if(href) {
        newElement.href=href
        return newElement
    } else{
        return newElement
    }
};
//module.exports= {elementCreator};
