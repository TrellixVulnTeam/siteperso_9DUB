//import React  from "react";
class Test extends React.Component{
    constructor(props){
        super(props)
        this.state={
            langagesData:[],
        }
    } componentDidMount(){
        fetch("http://localhost:4000/langages",{
            method: "GET",
            credentials: "include"
        })
            .then(response=>response.json())
            .then(data=>{
                const langagesArray=[[],[]]
                let index=0
                data.forEach((langage, iterator) => {
                    langagesArray[index].length===6?index++: null
                    switch(index){
                        case 0:
                            langagesArray[index].push(langage);
                        break;
                        case 1:
                            langage.langages_frameworks_id-=6;
                            langagesArray[index].push(langage);
                        break;
                        default:
                            alert("error")
                        break;
                    }
                    iterator===11? this.setState({
                        langagesData: langagesArray
                    }): null
                });
            })
    } handleFrameChange(event){
        const lessOrMore=event.target.getAttribute("name")==="previous"? 1 : -1
        const frameId= parseInt(event.target.getAttribute("frame-id"))
        const frame= document.body.children[2].children[0].children[frameId]
        //console.log(document.body.children[3].children[0]);
        Object.entries(frame.children).map((item, i) => {
            const langageImage=item[1].children[0];
            if(langageImage){
                let newImage=this.state.langagesData[frameId].findIndex(langage=>langage.langages_frameworks_id===parseInt(langageImage.getAttribute("image-id")))+lessOrMore;
                newImage===this.state.langagesData[frameId].length? newImage=0 : null;
                newImage===-1? newImage=5: null;
                langageImage.setAttribute(["image-id"], this.state.langagesData[frameId][newImage].langages_frameworks_id);
                langageImage.src= this.state.langagesData[frameId][newImage].langages_frameworks_image_path;
                item[1].children[1].innerText=this.state.langagesData[frameId][newImage].langages_frameworks_name;
            }
        });
    } render(){
        const frameJsx=this.state.langagesData.map((item, key)=>(
            <div className="frame-container" key={key}>
                <div className="arrow-btn arrow-btn-left" onClick={(event=>this.handleFrameChange(event))} frame-id={key} name="previous" ></div>
                {item.map((item, key)=>(
                        <div className="image-container" key={key}>
                            <img src={`http://localhost:4000/${item.langages_frameworks_image_path}`} alt="" image-id={item.langages_frameworks_id} />
                            <h3>{item.langages_frameworks_name}</h3>
                        </div>
                ))}
                <div className="arrow-btn arrow-btn-right" onClick={(event=>this.handleFrameChange(event))} frame-id={key} name="next"></div>
            </div>
        ));
        return(
            <div className="frames-main-container">
                {frameJsx}
            </div>
        )
    }
}
ReactDOM.render(
        <Test/>,
        document.getElementById('languages-frame')
      );
