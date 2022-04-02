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
        const image=document.getElementById("carousel-image")
        image.classList.add("test")
        if(this.state.displayedImage.image_id<this.state.imagesData.length){
            this.setState({
                displayedImage: this.state.imagesData[this.state.imagesData.findIndex(item=>item.image_id===this.state.displayedImage.image_id)+1]
            })
        }else{
            this.setState({
                displayedImage: this.state.imagesData[0]
            })
        }
        setTimeout(function(){image.classList.remove("test")},1000)
    } handlePreviousFrame(event){
        if(this.state.displayedImage.image_id>1){
            this.setState({
                displayedImage: this.state.imagesData[this.state.imagesData.findIndex(item=>item.image_id===this.state.displayedImage.image_id)-1]
            })
        }else{
            this.setState({
                displayedImage: this.state.imagesData[this.state.imagesData.length-1]
            })
        }
    } handleSmallImage(event){
        const selectedImage=parseInt(event.target.getAttribute("imageid"));
        let newImage= this.state.imagesData.findIndex(item=>item.image_id===selectedImage);
        this.setState({
            displayedImage: this.state.imagesData[newImage]
        })
    } render(){
        console.log(this.state);
        const frameJsx= this.state.imagesData.map((item,key)=>(
                <div key={key} onClick={(event)=>this.handleSmallImage(event)} >
                    <img className={this.state.displayedImage.image_id===item.image_id?"displayed":"over-layed"} src={`http://localhost:4000/${item.image_path}`} alt="image du carousel" imageid={item.image_id}/>
                </div>
        ));
        return(
            <div className="image-carousel-main-container">
                <div className="image-button-container">
                    <div className="previous-button" onClick={(event)=>this.handlePreviousFrame(event)}>
                    </div>
                    <div className="image-container">
                        <img id="carousel-image" src={`http://localhost:4000/${this.state.displayedImage.image_path}`} alt="image du carousel" />
                    </div>
                    <div className="next-button" onClick={(event)=>this.handleNextFrame(event)}>
                    </div>
                </div>
                <div className="frame-container">
                    {frameJsx}
                </div>
            </div>
        )
    }
}
ReactDOM.render(
        <ImageCarousel/>,
        document.getElementById('carousel-root')
      );
