/*document.getElementById("sqlactive").addEventListener("click",(event)=>{
    event.preventDefault();
    const sql=document.getElementById("sql")
    console.log(sql.value);
    const obj={answer: sql.value}
    const csurfToken=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch("http://localhost:4000/testsql",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "CSRF-token": csurfToken
        },
        body: JSON.stringify(obj)
    })
    .then(response=>response.json())
    .then(dat=>console.log(data))
*/
const localAdress="http://localhost:4000/"//"http://192.168.1.22:4000/"

function elementCreator({tag,text= null, classList, eventFunction, href, src, alt, id}){
    const newElement= classList?Object.assign(document.createElement(tag),{classList:classList , innerText:text}):Object.assign(document.createElement(tag),{ innerText:text})
    if(eventFunction){
        newElement.addEventListener("click",(event)=>eventFunction(event))
        return newElement
    } else if(id){
        newElement.id=id
        console.log(newElement.id);
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
        function handleMobileMenu(){
            const mobileMenu=document.getElementById("mobile-menu");
            if(mobileMenu.classList[0]==="inactive"){
                const hidden= document.body.querySelector(".hidden")
                mobileMenu.classList.add("active")
                mobileMenu.classList.remove("inactive")
                hidden.classList.remove("hidden")
                hidden.classList.add("displayed")
                document.body.children[0].firstChild.style.background="rgba(14, 14, 14, 0.992)"
            }else{
                const displayed= document.body.querySelector(".displayed")
                mobileMenu.classList.add("inactive")
                mobileMenu.classList.remove("active")
                displayed.classList.add("hidden")
                displayed.classList.remove("displayed")
                document.body.children[0].firstChild.style.backgroundColor=null
            }
        }
        const buttons=["Acceuil","A propos","Projet","Contact"];
        this.append(elementCreator({tag:"nav"}));
        this.firstChild.append(elementCreator({tag:"ul",/*classList:"columns"*/}));
        buttons.forEach((item,i) => {
            this.firstChild.firstChild.append(elementCreator({tag:"li", /*classList:"column",*/}))
            this.firstChild.firstChild.children[i].append(elementCreator({tag: "a",text: item, href:`${localAdress}${item.replace(" ","").toLowerCase()}` }))
            i++
        });
        if (window.screen.width<=480){
            const mobileMenuContainer= elementCreator({tag: "div", classList:"mobile-menu-container"})
            const mobileMenu=elementCreator({tag:"div",id:"mobile-menu", classList:"inactive",eventFunction: handleMobileMenu})
            mobileMenu.id="mobile-menu"
            mobileMenu.append(elementCreator({tag:"span"}))
            mobileMenuContainer.append(mobileMenu)
            this.firstChild.children[0].classList.add("hidden")
            this.firstChild.prepend(mobileMenuContainer)
        }
        fetch(`${localAdress}header`,{
            method:"GET",
            /*headers:{

            },
            credentials: true,*/
        })
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
