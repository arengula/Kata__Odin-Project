import PropTypes from "prop-types";
import React from "react";
import {useState, useEffect} from "react";

import Card from "./productCard.jsx"
import "../css/productDisplay.css"

const ProductDisplay = function() {
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
                alert("Something is wrong")
            })
    }, [])

    return items.length == 0? (<p>Something went wrong</p>):(
        <section className="productDisplay">
            {   
                items.map((item) => {
                    const {id, title, description, price, image} = item
                    return (
                        <>
                            <Card
                                key={id}
                                description={description}
                                title={title}
                                price={price}
                                image={image}
                            />
                        </>
                    );
                })
            }
        </section>
    )
}

ProductDisplay.propTypes = {
}

export default ProductDisplay;