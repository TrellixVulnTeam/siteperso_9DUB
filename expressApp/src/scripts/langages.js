class Langages extends HTMLElement{
    constructor(){
        super()
        this.prepend(elementCreator({tag:"div",classList:"prev arrow-btn-left",eventFunction: this.handleFrame}))
        this.append(elementCreator({tag:"div", id: "langages"}))
        this.append(elementCreator({tag:"div",classList:"next arrow-btn-right",eventFunction: this.handleFrame}))
        this.langagesFetch=fetch("http://localhost:4000/langages",{
            method: "GET",
            credentials: "include"
        })
        .then(response=>response.json())
        .then(data=>data.map(item=>{
            const langage= elementCreator({tag: "div"})
            langage.append(elementCreator({tag:"img",src:`http://localhost:4000/${item.langages_frameworks_image_path}`,alt: item.langages_frameworks_name}))
            langage.append(elementCreator({tag:"h3",text: item.langages_frameworks_name}))
            this.children[1].append(langage)
        }));
    }async handleFrame(event){
        console.log("here");
        const frame=document.getElementById("langages");
        const srcArray=[];
        const langagesName=[];
        await Object.entries(frame.children).map((children,i)=>{
            event.target.classList[0]==="next"?i++:i--;
            i===frame.children.length? i=0: null
            i===-1?i=11:null;
            frame.children[i]./*children[0].*/classList.add("image-animation")
            langagesName.push(frame.children[i].children[1].innerHTML);
            srcArray.push(frame.children[i].children[0].src)
        })
        setTimeout(()=>Object.entries(frame.children).forEach(async (item, i) => {
            item[1].children[0].src=srcArray[i];
            item[1].children[1].innerHTML=langagesName[i]
            item[1]/*.children[0]*/.classList.remove("image-animation")
        }),350)
    }
}
const langagesHook=document.getElementById("langages-hook");
window.customElements.define("section-langages", Langages, {extends: "section"});
document.body.insertBefore(document.createElement("section",{is:"section-langages"}),langagesHook)
langagesHook.remove();
