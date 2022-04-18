const projectObj={
    filesPath: "/home/user/",
    projectPath: "Projects",
    componentPath: "Components",
    componentDisplayed: true,
    lateralNavFolder: ["User","Desktop","Documents","Downloads","Projects","Components"],
    lateralNavSection: ["Computer","Devices","Networks"],
    networkDevicesData: [{
        name: "Hard Drive",
        imagePath: `${localAdress}src/images/project/hard-drive.svg`
    },{
        name: "Browse Networks",
        imagePath: `${localAdress}src/images/project/network.svg`,
    }],
    componentData: [],
    projectData: [],
    mainContainer: elementCreator({tag:"div", classList:"project-main-container"}),
    componentsTab: elementCreator({tag: "div", classList:"components-tab", text: "Components"}),
    projectTab: elementCreator({tag:"div", classList: "projects-tab", text: "Projects"}),
    filesDeco: elementCreator({tag: "div", classList:"files-deco",text:"Files"}),
    iconsLateralNavContainer: elementCreator({tag:"div", classList:"icons-lateralNav-container"}),
    async componentFetch(){
        await fetch(`${localAdress}my-component`)
        .then(response=>response.json())
        .then(data=>this.componentData=data);
    },
    async projectFetch(){
        await fetch(`${localAdress}my-project`)
        .then(response=>response.json())
        .then(data=>this.projectData=data);
    },
    createPathBar(){
        const pathBar= elementCreator({tag: "div", classList: "path-bar-container", text:  this.componentDisplayed?this.filesPath+this.componentPath:this.filesPath+this.projectPath});
        this.mainContainer.appendChild(pathBar)
    },
    createLateralNav(){
        const targetTag= this.mainContainer //document.getElementById(tagId);
        const lateralContainer=elementCreator({tag:"aside"});
        this.lateralNavSection.forEach((item,i)=>{
            lateralContainer.append(elementCreator({tag: "div", classList: `${item.toLowerCase()}-container`}));
            lateralContainer.children[i].append(elementCreator({tag: "h3", text: item}));
        });
        this.lateralNavFolder.forEach((item)=>{
            const projectFolder=elementCreator({tag: "div", id: "project-folder"});
            if(item==="Projects"){
                const folder=elementCreator({tag: "div",classList: "folder" });
                folder.append(elementCreator({tag: "div", classList: "projects-button", eventFunction: this.changeFolder}));
                folder.children[0].append(elementCreator({tag:"img",classList: "projects-button" ,src:`${localAdress}src/images/project/folder.svg`, alt: "folder"}));
                folder.children[0].append(elementCreator({tag: "p", classList: "projects-button",text: item}));
                folder.append(elementCreator({tag: "div", id: item.toLowerCase()}));
                lateralContainer.children[0].appendChild(folder);
            }else if(item==="Components"){
                const folder=elementCreator({tag: "div", classList: "folder"});
                folder.append(elementCreator({tag: "div", classList: "components-button", eventFunction: this.changeFolder}));
                folder.children[0].append(elementCreator({tag:"img", classList: "components-button", src:`${localAdress}src/images/project/folder.svg`, alt: "folder"}));
                folder.children[0].append(elementCreator({tag: "p", classList: "components-button", text: item}));
                folder.append(elementCreator({tag: "div", id: item.toLowerCase()}));
                lateralContainer.children[0].appendChild(folder);
            } else{
                const folder=elementCreator({tag: "div"});
                folder.append(elementCreator({tag:"img", src:`${localAdress}src/images/project/folder.svg`, alt: item}));
                folder.append(elementCreator({tag: "p", text: item}));
                lateralContainer.children[0].appendChild(folder);
            }
        });
        this.networkDevicesData.map((item,i)=>{
            lateralContainer.children[1+i].append(elementCreator({tag:"div"}));
            lateralContainer.children[1+i].children[1].append(elementCreator({tag: "img", src: item.imagePath, alt: item.name}));
            lateralContainer.children[1+i].children[1].append(elementCreator({tag: "p", text: item.name}));
        });
        //targetTag.children[2].append(lateralContainer);
        targetTag.children[2].append(elementCreator({tag: "div", classList:"icons-container"}),lateralContainer)
        if (window.screen.width<=769){
            lateralContainer.classList.add("hidden");
            const mobileBar=elementCreator({tag:"div",id:"mobile-bar"});
            mobileBar.append(elementCreator({tag:"div", id:"mobile-bar-button", classList:"arrow-btn-right"}));
            mobileBar.addEventListener("click",()=>lateralContainer.classList[0]==="hidden"?lateralContainer.classList.remove("hidden"):lateralContainer.classList.add("hidden"))
            targetTag.children[2].append(mobileBar)
        }
    },
    createIcons(iconsData, tagId){
        this.projectTab.addEventListener("click", (event)=>this.changeFolder(event));
        this.componentsTab.addEventListener("click", (event)=>this.changeFolder(event));
        const iconsContainer= document.querySelector(".icons-container");
        const projectFolder= document.getElementById(tagId);
        iconsData.map((item)=>{
            const projectOrComp= tagId==="components"?item.component_name:item.project_name;
            console.log(projectOrComp);
            const icon=elementCreator({tag: "a", href: item.component_path});
            icon.append(elementCreator({tag: "img", src: item.langages_frameworks_image_path, alt:projectOrComp}));
            icon.append(elementCreator({tag:"p", text:`${projectOrComp.replace(" ","-").toLowerCase()}`}));
            const folderIcon=icon.cloneNode(true);
            iconsContainer.append(icon);
            projectFolder.append(folderIcon);
        });
        this.mainContainer.children[2].append(iconsContainer);
    },
    async changeFolder(event){
        const iconsContainer=document.querySelector(".icons-container");
        const projectsFolder= document.getElementById("projects");
        const componentFolder= document.getElementById("components");
        switch (event.target.classList[0]){
            case "projects-button":
            case "projects-tab":
                await Object.entries(iconsContainer.children).forEach((item)=>{
                    item[1].remove();
                });
                await Object.entries(componentFolder.children).forEach((item)=>{
                    item[1].remove();
                });
                await Object.entries(projectsFolder.children).forEach((item)=>{
                    item[1].remove();
                });
                projectObj.createIcons(projectObj.projectData, "projects");
            break;
            case "components-button":
            case "components-tab":
                await Object.entries(iconsContainer.children).forEach((item)=>{
                    item[1].remove();
                });
                await Object.entries(projectsFolder.children).forEach((item)=>{
                    item[1].remove();
                });
                await Object.entries(componentFolder.children).forEach((item)=>{
                    item[1].remove();
                });
                projectObj.createIcons(projectObj.componentData, "components");
            break;
        }
    },
    async generateUi(tagId){
        const targetTag=document.getElementById(tagId);
        let sucess=false;
        do{
            try{
                await this.componentFetch();
                await this.projectFetch();
                sucess=true;
            }catch(err){
                alert("error")
            }
        }while(!sucess){
            targetTag.prepend(elementCreator({tag:"div", classList:"tab-container"}));
            targetTag.children[0].append(this.projectTab);
            targetTag.children[0].prepend(this.componentsTab);
            targetTag.append(this.mainContainer);
            this.createPathBar();
            this.mainContainer.append(this.filesDeco);
            this.mainContainer.append(this.iconsLateralNavContainer);
            this.createLateralNav();
            this.createIcons(this.componentData, "components");
        };
    },
};
projectObj.generateUi("project-main");
