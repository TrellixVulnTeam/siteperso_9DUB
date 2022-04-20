const localAdress="http://localhost:4000/"//"http://192.168.1.22:4000/"
function elementCreator({tag,text= null, classList, eventFunction, href, src, alt, id}){
    const newElement= classList?Object.assign(document.createElement(tag),{classList:classList , innerText:text}):Object.assign(document.createElement(tag),{ innerText:text});
    if(eventFunction){
        newElement.addEventListener("click",(event)=>eventFunction(event));
        return newElement;
    } else if(id){
        newElement.id=id;
        console.log(newElement.id);
        return newElement;
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
}

//alert(window.navigator.platform);
/*if (window.navigator.platform==="iPad" || window.navigator.platform==="iPhone" ){
    alert("ok");
} else if (window.navigator.platform.split(" ")[0]==="Linux") {
    alert('linux')
}*/

const headerObj={
    header: document.createElement("header"),
    buttons: ["Acceuil","A propos","Projet","Contact"],
    handleMobileMenu(){
        const mobileMenu=document.getElementById("mobile-menu");
        if(mobileMenu.classList[0]==="inactive"){
            const hidden= document.body.querySelector(".hidden");
            mobileMenu.classList.add("active");
            mobileMenu.classList.remove("inactive");
            hidden.classList.remove("hidden");
            hidden.classList.add("displayed");
            document.body.children[0].firstChild.style.background="rgba(14, 14, 14, 0.992)";
        }else{
            const displayed= document.body.querySelector(".displayed");
            mobileMenu.classList.add("inactive");
            mobileMenu.classList.remove("active");
            displayed.classList.add("hidden");
            displayed.classList.remove("displayed");
            document.body.children[0].firstChild.style.backgroundColor=null;
        }
    },
    createNav(){
        this.header.append(elementCreator({tag:"nav"}));
        this.header.firstChild.append(elementCreator({tag:"ul"}));
        this.buttons.forEach((item,i) => {
            this.header.firstChild.firstChild.append(elementCreator({tag:"li"}));
            this.header.firstChild.firstChild.children[i].append(elementCreator({tag: "a",text: item, href:`${localAdress}${item.replace(" ","").toLowerCase()}` }));
            i++;
        });
        if (window.screen.width<=769){
            const mobileMenuContainer= elementCreator({tag: "div", classList:"mobile-menu-container"});
            const mobileMenu=elementCreator({tag:"div",id:"mobile-menu", classList:"inactive",eventFunction: this.handleMobileMenu});
            mobileMenu.id="mobile-menu";
            mobileMenu.append(elementCreator({tag:"span"}));
            mobileMenuContainer.append(mobileMenu);
            this.header.firstChild.children[0].classList.add("hidden");
            this.header.firstChild.prepend(mobileMenuContainer);
        }
    },

    async createHeader(){
        await this.createNav()
        document.body.prepend(this.header)
        await fetch(`${localAdress}header`,{
            method:"GET",
        })
        .then(response=>response.json())
        .then(data=>data)
        .then((data)=>data.map(item=>{
            this.header.append(elementCreator({tag: "div", classList:"header-info-cntainer"}));
            this.header.children[1].append(elementCreator( {tag:"h2", text:`${item.first_name} ${item.name}`}));
            this.header.children[1].append(elementCreator({tag:"h1",text:item.work}));
            this.header.children[1].append(elementCreator({tag:"h3",text:item.front_back}));
            this.header.children[1].append(elementCreator({tag:"div", classList: "header-line"}));
            })
        );
    }
}
headerObj.createHeader()
