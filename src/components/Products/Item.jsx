import {Link} from "react-router-dom";
import React from "react";
import {CartItemsContext, truncateString} from "../../pages/Main";

const ProductItem = (props) => {
    const {addToCart} = React.useContext(CartItemsContext);

    const priceBlock = (
        props.discont_price ? (
            <div className="price_block">
                <p className="discont_price">${props.discont_price}</p>
                <p className="price old">${props.price}</p>
            </div>
        ) : (
            <div className="price_block">
                <p className="price">${props.price}</p>
            </div>
        )
    );

    let discontProcentBlock = (
        props.discont_price ? (
            <span className="discont_procent">
                {(((props.discont_price - props.price) / props.discont_price) * 100).toFixed(0)}
            </span>
        ) : ''
    );

    return (
        <div className="product">
            <div className="top">
                {discontProcentBlock}
                <Link to={`/products/${props.id}`}>
                    <img src={`/assets/images${props.image}`} alt=""/>
                </Link>
                <button className="btn"
                        onClick={() => addToCart(
                            {
                                product: {
                                    id: props.id,
                                    title: props.title,
                                    image: `/assets/images${props.image}`,
                                    price: props.price,
                                    discont_price: props.discont_price ? props.discont_price : null,
                                    count: 1,
                                }
                            }
                        )}
                >Add to cart
                </button>
            </div>
            <div className="bottom">
                <Link to={`/products/${props.id}`}>
                    <h4 className="title">{truncateString(props.title, 15)}</h4>
                </Link>
                {priceBlock}
            </div>
        </div>
    );
}


export default ProductItem;