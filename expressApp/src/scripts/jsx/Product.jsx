class Product extends React.Component{
    constructor(props){
        super(props)
    } render(){
        const {product, addToCart, displayProduct}=this.props
        //console.log(displayProduct);
        //console.log(addToCart);
        return(
            <article>
                <div className="product-image">
                    <img src={`http://localhost:4000/${product.product_image_path}`} alt={product.product_description}  onClick={displayProduct?()=>this.props.displayProduct(product):null}/>
                </div>
                <div className="product-info-container">
                    <h2>{product.product_brand}</h2>
                    <h3>{product.product_name}</h3>
                    <p className="product-description">{product.product_description}</p>
                    <p className="product-price">{product.product_price}</p>
                </div>
                <div className="button-container">
                    <div onClick={()=>addToCart(product)}>Add to cart</div>
                </div>
            </article>
        )
    }
}
