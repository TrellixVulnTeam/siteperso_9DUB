const projectObj={
    filesPath: "/home/user/",
    projectPath: "Projects",
    componentPath: "Components",
    componentDisplayed: true,
    lateralNavFolder: ["User","Desktop","Documents","Downloads","Projects","Components"],
    lateralNavSection: ["Computer","Devices","Networks"],
    networkDevicesData: [{
        name: "Hard Drive",
        imagePath: "http://localhost:4000/src/images/project/hard-drive.svg"
    },{
        name: "Browse Networks",
        imagePath: "http://localhost:4000/src/images/project/network.svg",
    }],
    componentData: [],
    projectData: [],
    mainContainer: elementCreator({tag:"div", classList:"project-main-container"}),
    componentsTab: elementCreator({tag: "div", classList:"component-tab", text: "Components"}),
    projectTab: elementCreator({tag:"div", classList: "project-tab", text: "Project"}),
    filesDeco: elementCreator({tag: "div", classList:"files-deco",text:"Files"}),
    iconsLateralNavContainer: elementCreator({tag:"div", classList:"icons-lateralNav-container"}),
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
            const folder=elementCreator({tag: "div"});
            folder.append(elementCreator({tag:"img", src:"http://localhost:4000/src/images/project/folder.svg", alt: item}));
            folder.append(elementCreator({tag: "p", text: item}));
            if(item==="Projects"){
                folder.classList.add(`${item.toLowerCase()}`)
                const projectFolder=elementCreator({tag: "div", classList: "project-folder"});
                this.projectData.map((item,i) => {
                    console.log("here");
                    projectFolder.append(elementCreator({tag:"div"}));
                    projectFolder.children[i].append(elementCreator({tag: "img", src: item.langages_frameworks_image_path, alt: item.langages_frameworks_name}));
                    projectFolder.children[i].append(elementCreator({tag:"p", text:`${item.project_name}.${item.langages_frameworks_name}`}));
                });
                folder.append(projectFolder);
            };
            lateralContainer.children[0].appendChild(folder);
        });
        this.networkDevicesData.map((item,i)=>{
            lateralContainer.children[1+i].append(elementCreator({tag:"div"}));
            lateralContainer.children[1+i].children[1].append(elementCreator({tag: "img", src: item.imagePath, alt: item.name}));
            lateralContainer.children[1+i].children[1].append(elementCreator({tag: "p", text: item.name}));
        });
        targetTag.children[2].append(lateralContainer);
    },
    createIcons(iconsData){
        const iconsContainer= elementCreator({tag: "div", classList:"icons-container"});
        iconsData.map((item)=>{
            const icon=elementCreator({tag: "a"});
            icon.append(elementCreator({tag: "img", src: item.langages_frameworks_image_path, alt:item.component_name}));
            icon.append(elementCreator({tag:"p", text:`${item.component_name.replace(" ","-").toLowerCase()}.${item.langages_frameworks_name}`}));
            iconsContainer.append(icon);
        });
        this.mainContainer.children[2].append(iconsContainer);
    },
    async generateUi(tagId){
        const targetTag=document.getElementById(tagId)
        let sucess=false;
        do{
            await this.componentFetch();
            await this.projectFetch();
            sucess=true;
        }while(!sucess){
            console.log("here");
            this.createPathBar()
            this.mainContainer.append(this.filesDeco)
            this.mainContainer.append(this.iconsLateralNavContainer)
            this.createLateralNav()
            this.createIcons(this.componentData)
            targetTag.prepend(elementCreator({tag:"div", classList:"tab-container"}))
            targetTag.children[0].append(this.projectTab)
            targetTag.children[0].prepend(this.componentsTab)
            targetTag.append(this.mainContainer)
        };
    },
};
projectObj.generateUi("project-main")
