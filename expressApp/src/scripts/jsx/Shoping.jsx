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
                //cart: this.state.cart.map(item=>item.product_id===product.product_id? item.count++:null)
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
        console.log("here");
        this.state.cart.map(item=>{
            if(item.product_id===product.product_id && item.count>1){
                item.count--
                return this.setState({
                    cart: this.state.cart.map(item=>{
                        if(item.product_id===product.product_id){
                            return product
                        }
                        return item
                    })
                })
            } else {
                console.log("here");
                return this.setState({
                    cart:this.state.cart.filter(item=>item.product_id!==product.product_id)
                })
            }
        });
        console.log(this.state.cart);
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
    } render(){
        console.log(this.state.cart);
        const productJsx= this.state.productsData.map(product=>(
            <Product product={product} addToCart={()=>this.handleAddProduct(product)} displayProduct={()=>this.handleDisplayProduct(product)}/>
        ));
        return(
            <React.Fragment>
                <header>
                    <h1>SHOPING</h1>
                    <nav>
                        <ul onClick={(event)=>this.handleNav(event)}>
                            <li>
                                <p id="products">Produits</p>
                            </li>
                            <li>
                                <p id="cart">Panier</p>
                            </li>
                            <li>
                                <p id="unknow">LOLLOLO</p>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
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
