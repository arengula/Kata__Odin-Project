import PropTypes from "prop-types";
import React from "react";

import "../css/productCard.css"

const Card = function({title, price, description, image}) {
    return (
        <div className="productCard">
            <div className="product__image">
                <img src={image} 
                    alt={`image of ${title}`} 
                />
            </div>
            <p className="product__detail">
                <p className="product__name">
                    {title.length > 17? title.substring(0, 17) + "..": title}
                </p>
                <p className="product__desc">
                    {description.length > 50? 
                        description.substring(0, 50) + "...":
                        description
                    }
                </p>
            </p>
            <p className="product__price"> {price} </p>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string
}

export default Card;