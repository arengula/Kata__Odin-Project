import { useState, useEffect } from "react";
import "../styles/productDisplay.css"

function ProductDisplay({onItemSelect}) {
    const [items, setItems] = useState([])
    const [err, setErr] = useState(null)

    useEffect(() => {
        fetch("https://fakestoreapi.com/products",
            {mode: "cors"}
        )
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return new Error("Somehting when wrong");
            })
            .then((res) => {
                setItems(res)
            })
            .catch((err) => {
                setErr(err)
            })
    }, [])

    function clampText(text, maxLength) {
        return text.substring(0, maxLength) + 
            (text.length > maxLength? "...": "")
    }

    return items.length == 0? (
        err === null? (<p className="px-4 mx-0 mb-2">Fetching data...</p>):
                    (<p className="px-4 mx-0 mb-2">Something went wrong</p>)
        ) :(
        <section className="productDisplay px-4 mx-0 mb-2 grid">
            <h1 className="my-3">Today's Offer</h1>
            <div className="productDisplay__items">
                {items.map((item) => {
                    const {id, title, description, price, image} = item
                    return (
                        <div key={id}>
                            <div className="item__image mb-2">
                                <img 
                                    src={image} 
                                    alt={title}
                                />
                            </div>
                            <div>
                                <p className="item__name my-1"> {clampText(title, 17)} </p>
                                <p className="item__description mb-5">
                                    {clampText(description, 27)}
                                </p>
                                <p className="item__price my-0"> {price}</p>
                            </div>
                            <button 
                                className="item__purchase"
                                onClick={() => onItemSelect({
                                    itemID: id,
                                    name: title,
                                    price: price,
                                    amount: 1,
                                })}
                            > 
                                Add to cart
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}

export default ProductDisplay;