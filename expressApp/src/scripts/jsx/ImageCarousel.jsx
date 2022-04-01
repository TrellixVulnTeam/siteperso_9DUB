class ImageCarousel extends React.Component{
    constructor(props){
        super(props)
        this.state={
            imagesData:[],
            displayedImage:[],

        }
    } componentDidMount(){
        fetch(`http://localhost:4000/component/imageCarousel`,{
            method: "GET",
            credentials: "include"
        })
        .then(response=>response.json())
        .then(data=>this.setState({
            imagesData: data,
            displayedImage: data[1]
        }))
    } handleNextFrame(event){
        if(this.state.displayedImage.image_id<this.state.imagesData.length){
            this.setState({
                displayedImage: this.state.imagesData[this.state.imagesData.findIndex(item=>item.image_id===this.state.displayedImage.image_id)+1]
            })
        }else{
            this.setState({
                displayedImage: this.state.imagesData[0]
            })
        }
    } handlePreviousFrame(){
        if(this.state.displayedImage.image_id>1){
            this.setState({
                displayedImage: this.state.imagesData[this.state.imagesData.findIndex(item=>item.image_id===this.state.displayedImage.image_id)-1]
            })
        }else{
            this.setState({
                displayedImage: this.state.imagesData[this.state.imagesData.length-1]
            })
        }
        console.log(this.state.imagesData.length-1);
        console.log(this.state.imagesData.length-1);
    } render(){
        console.log(this.state);
        const frameJsx= this.state.imagesData.map(item=>(
            console.log(item),
                <div>
                    <img src={`http://localhost:4000/${item.image_path}`} alt="image du carousel"/>
                </div>
        ));
        //console.log(frameJsx);
        return(
            <div className="image-carousel-main-container">
                <div className="next-button" onClick={(event)=>this.handlePreviousFrame(event)}>
                    prev
                </div>

                <div className="image-container">
                    <img src={`http://localhost:4000/${this.state.displayedImage.image_path}`} alt="" />
                </div>
                <div className="frame-container">
                    {frameJsx}
                </div>
                <div className="next-button" onClick={(event)=>this.handleNextFrame(event)}>
                    next
                </div>
            </div>
        )
    }
}
ReactDOM.render(
        <ImageCarousel/>,
        document.getElementById('carousel-root')
      );
