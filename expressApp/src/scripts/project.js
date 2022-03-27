//alert("ok")
//console.log(elementCreator());
const projectObj={
    filesPath: "/home/user/",
    projectPath: "Projects",
    lateralNavFolder: ["User","Desktop","Documents","Downloads","Project","Components"],
    lateralNavSection: ["Computer","Devices","Networks"],
    componentData: [],
    projectData: [],
    componentPath: "Components",
    async componentFetch(){
        await fetch("http://localhost:4000/my-component")
        .then(response=>response.json())
        .then(data=>this.componentData=data);
    },
    async projectFetch(){
        await fetch("http://localhost:4000/my-project")
        .then(response=>response.json())
        .then(data=>this.projectData=data);
    },
    createLateralNav(tagId){
        const targetTag= document.getElementById(tagId);
        const lateralContainer=elementCreator({tag:"aside"});
        this.lateralNavSection.forEach((item,i)=>{
            lateralContainer.append(elementCreator({tag: "div", classList: `${item.toLowerCase()}-container`}));
            lateralContainer.children[i].append(elementCreator({tag: "h3", text: item}));
        });
        this.lateralNavFolder.forEach((item)=>{
            const folder=elementCreator({tag: "div"});
            folder.append(elementCreator({tag:"img", src:"http://localhost:4000/src/images/project/folder.svg", alt: item}));
            folder.append(elementCreator({tag: "p", text: item}));
            lateralContainer.children[0].appendChild(folder);
        });
        lateralContainer.children[1].append(elementCreator({tag:"div"}));
        lateralContainer.children[1].children[1].append(elementCreator({tag: "img", src: "http://localhost:4000/src/images/project/hard-drive.svg", alt: "network"}));
        lateralContainer.children[1].children[1].append(elementCreator({tag: "p", text: "Hard Drive"}));
//Voir pour une fonction
        lateralContainer.children[2].append(elementCreator({tag:"div"}));
        lateralContainer.children[2].children[1].append(elementCreator({tag: "img", src: "http://localhost:4000/src/images/project/network.svg", alt: "hard-drive"}));
        lateralContainer.children[2].children[1].append(elementCreator({tag: "p", text: "Browse Network"}));
        targetTag.prepend(lateralContainer);
    },
    createPathBar(){

    },
    createIcons(){

    },
    generateUi(tagId){
        this.componentFetch();
        this.projectFetch();
        this.createLateralNav(tagId);
    }
};
projectObj.generateUi("project-main")
