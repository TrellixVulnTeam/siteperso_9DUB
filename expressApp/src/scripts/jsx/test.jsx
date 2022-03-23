//import React  from "react";
class Test extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    } componentDidMount(){
        fetch("http://localhost:4000/langages",{
            method: "GET",
            credentials: "include"
        })
            .then(response=>response.json())
            .then(data=>this.setState({data:data}))
    } render(){
        const frameJsx=this.state.data.map((item, key)=>(
            console.log(item),
            <React.Fragment>
                <div>
                    <img style={{width: "100px", height: "100px"}} src={`http://localhost:4000/${item.langages_frameworks_image_path}`} alt="" />
                </div>
            </React.Fragment>
        ))
        return(
            <div>
                {frameJsx}
            </div>
        )
    }
}
ReactDOM.render(
        <Test/>,
        document.getElementById('languages-frame')
      );
