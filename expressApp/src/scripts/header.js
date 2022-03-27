/*const obj={};
fetch(`http://localhost:4000/header`)
    .then(response=>response.json())
    .then(data=>obj.firstName=data.work)
    .then(()=>console.log(obj))
console.log(obj);*/

function elementCreator({tag,text= null, classList, eventFunction, href, src, alt}){
    const newElement= classList?Object.assign(document.createElement(tag),{classList:classList , innerText:text}):Object.assign(document.createElement(tag),{ innerText:text})
    if(eventFunction){
        newElement.addEventListener("click",(event)=>eventFunction(event))
        return newElement
    } else if(href) {
        newElement.href=href;
        return newElement;
    } else if(src){
        newElement.src=src;
        newElement.alt=alt;
        return newElement;
    } else{
        return newElement;
    }
};

class HeaderSite extends HTMLElement{
    constructor(){
        super();
        const buttons=["Acceuil","A propos","Projet","Contact"];
        //this.classList.add("column");
        this.append(elementCreator({tag:"nav"}));
        this.firstChild.append(elementCreator({tag:"ul",/*classList:"columns"*/}));
        buttons.forEach((item,i) => {
            this.firstChild.firstChild.append(elementCreator({tag:"li", /*classList:"column",*/}))
            this.firstChild.firstChild.children[i].append(elementCreator({tag: "a",text: item, href:`http://localhost:4000/${item.replace(" ","").toLowerCase()}` }))
            i++
        });
        fetch(`http://localhost:4000/header`)
            .then(response=>response.json())
            .then(data=>data)
            .then((data)=>data.map(item=>{
                this.append(elementCreator({tag: "div", classList:"header-info-cntainer"}))
                this.children[1].append(elementCreator( {tag:"h2", text:`${item.first_name} ${item.name}`}))
                this.children[1].append(elementCreator({tag:"h1",text:item.work}))
                this.children[1].append(elementCreator({tag:"h3",text:item.front_back}))
                this.children[1].append(elementCreator({tag:"div", classList: "header-line"}))
                })
            );
    };
};
window.customElements.define("header-site", HeaderSite, {extends: "header"});
document.body.prepend(document.createElement("header",{is:"header-site"}));
