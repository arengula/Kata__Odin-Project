function MyCart({cart, onPurchase}) {
    return (
        <section className="myCart px-4 mx-0 my-2">
            <div className="myCart__header">
                <h1>Your Purchase </h1>
            </div>
            <div className="myCart__contents">
                {cart.map((item, idx) => (
                    <p key={idx}> {idx} - {item.name} - ${item.price}</p>
                ))}
            </div>
            <div className="myCart__footer">
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
                <button className="myCart__purchase bg-primary text-light"> Purchase</button>
            </div>
        </section>
    )
}

export default MyCart;