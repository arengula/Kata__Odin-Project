import "../styles/myCart.css"

function CartEntry({item}) {
    return (
        <div className="cart__entry">
            <p className="cart__name">{item.name}</p>
            <p className="cart__price fw-bold">${item.price}</p>
        </div>
    )
}

function MyCart({cart, onPurchase}) {
    return (
        <div className="px-2 mx-2 my-2">
            <section className="myCart bg-light p-4">
                <div className="myCart__header mb-3">
                    <h1>Your Purchase </h1>
                </div>
                <div className="myCart__main">
                    <div className="myCart__left">
                        {cart.map((item, idx) => <CartEntry item={item} key={idx}/>)}
                    </div>
                    <div className="myCart__right">
                        <div className="myCart__info">
                            <div className="myCart__infoEntry">
                                <p className="myCart__infoText"> Number of items </p>
                                <p className="myCart__infoValue"> {cart.length}</p>
                            </div>
                            <div className="myCart__infoEntry">
                                <p className="myCart__infoText"> Total price</p>
                                <p className="myCart__infoValue"> 
                                    ${cart.reduce((total, item) => total + item.price, 0)}
                                </p>
                            </div>
                        </div>
                        <button className="myCart__purchase bg-primary text-light p-2"
                            onClick={onPurchase}
                        > Purchase</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MyCart;