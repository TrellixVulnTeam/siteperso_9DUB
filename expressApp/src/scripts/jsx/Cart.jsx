class Cart extends React.Component{
    constructor(props){
        super(props)
    } componentDidMount(){

    } render(){
        const cartProductJsx= this.props.cartItem.map((product)=>(
            <li>
                <article>
                    <div className="cart-product-image">
                        <img src={`http://localhost:4000/${product.product_image_path}`} alt={product.product_description}/>
                    </div>
                    <div className="cart-product-info-container">
                        <h2>{product.product_brand}</h2>
                        <h3>{product.product_name}</h3>
                    </div>
                    <div className="cart-count-container">
                        <p>{product.count}</p>
                    </div>
                    <div className="cart-buttons-container">
                        <div className="cart-add-btn" onClick={()=>this.props.addToCart(product)}>Add to cart</div>
                        <div className="cart-remove-btn" onClick={()=>this.props.removeProduct(product)}>Remove from cart</div>
                    </div>
                    <p>{product.product_price}</p>
                </article>
            </li>
        ))
        return(
            <React.Fragment>
                <div className="cart-band">
                    <h2>PANIER</h2>
                </div>
                <div className="cart-list-container">
                    <div className="cart-columns">
                        <p>Article</p>
                        <p>Quantitée</p>
                        <p>Prix</p>
                    </div>
                    <div className="cart-list">
                        <ul>
                            {cartProductJsx}
                        </ul>
                    </div>
                    <div className="button-price">
                        <h3>Total: </h3>
                        <div>
                            commander
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
