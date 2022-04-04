class Cart extends React.Component{
    constructor(props){
        super(props)
    } componentDidMount(){

    } render(){
        const cartProductJsx= this.props.cartItem.map((product)=>(
            <li>
                <article className="cart-product">
                    <div className="cart-product-image">
                        <img src={`http://localhost:4000/${product.product_image_path}`} alt={product.product_description}/>
                    </div>
                    <div className="cart-product-info-container">
                        <h2>{product.product_brand}</h2>
                        <h3>{product.product_name}</h3>
                        <p className="product-price">{product.product_price}</p>
                    </div>
                    <div className="button-container">
                        <div onClick={()=>this.props.addToCart(product)}>Add to cart</div>
                            <p>{product.count}</p>
                        <div onClick={()=>this.props.removeProduct(product)}>Remove from cart</div>
                    </div>
                </article>
            </li>
        ))
        return(
            <ul>
                {cartProductJsx}
            </ul>
        )
    }
}
