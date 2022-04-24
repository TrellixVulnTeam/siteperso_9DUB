class Shoping extends React.Component{
    constructor(props){
        super(props)
        this.state={
            productsData: [],
            cart: [],
            selectedProduct: null,
            displayCart: false,
            displayList: true,
            displayProduct: false,
        }
    } componentDidMount(){
        fetch(`http://localhost:4000/component/products`,{
            method: "GET"
        })
        .then(response=>response.json())
        .then(data=>this.setState({
            productsData: data
        }))
    } handleAddProduct(product){
        const productExist= this.state.cart.find(item=>item.product_id===product.product_id);
        console.log(productExist);
        if (productExist){
            this.setState({
                cart: this.state.cart.map(item=>{
                    if(item.product_id===product.product_id){
                        item.count++
                    }
                    return item
                })
            })
        }else{
            product.count=1;
            this.setState({
                cart: [...this.state.cart,product]
            });
        };
    } handleRemoveProduct(product){
        this.state.cart.map(item=>{
            if(item.product_id===product.product_id && item.count>1){
                item.count-=1
                console.log(item);
                return this.setState({
                    cart: this.state.cart.map(item=>{
                        if(item.product_id===product.product_id){
                            console.log(item);
                            console.log(product);
                            return product
                        }
                        return item
                    })
                })
            } else if(item.product_id===product.product_id && item.count===1){
                return this.setState({
                    cart:this.state.cart.filter(item=>item.product_id!==product.product_id)
                })
            }
        });
    } handleNav(event){
        switch(event.target.id){
            case "products":
                this.setState({
                    displayCart: false,
                    displayList: true,
                    displayProduct: false,
                })
            break;
            case "cart":
                this.setState({
                    displayCart: true,
                    displayList: false,
                    displayProduct: false,
                })
            break;
        }
    } handleDisplayProduct(product){
        this.setState({
            selectedProduct: product,
            displayCart: false,
            displayProduct: true,
            displayList: false
        })
    } classSelector(){
        if(this.state.displayProduct){
            return "product-main";
        }else if(this.state.displayCart){
            return "cart-main"
        }else{
            return "shopping-list-main"
        }
    } render(){
        console.log(this.state.cart);
        const productJsx= this.state.productsData.map((product,key)=>(
            <Product key={key} product={product} addToCart={()=>this.handleAddProduct(product)} displayProduct={()=>this.handleDisplayProduct(product)}/>
        ));
        const testJsx=<p>TEST</p>
        return(
            <React.Fragment>
                <header className="shopping-header">
                    <h1>SHOPING</h1>
                    <nav className="shopping-nav">
                        <ul onClick={(event)=>this.handleNav(event)}>
                            <li>
                                <p id="products">Products</p>
                            </li>
                            <li>
                                <p id="cart">Cart</p>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main className={this.classSelector()}>
                    {this.state.displayList?productJsx:null}
                    {this.state.displayProduct?<Product product={this.state.selectedProduct} addToCart={(product)=>this.handleAddProduct(product)}/>:null}
                    {this.state.displayCart?<Cart cartItem={this.state.cart} removeProduct={(product)=>this.handleRemoveProduct(product)} addToCart={(product)=>this.handleAddProduct(product)}/>:null}
                </main>
                <footer>
                </footer>
            </React.Fragment>
        )
    }
}
ReactDOM.render(
    <Shoping/>,
    document.getElementById('shoping-root')
);
