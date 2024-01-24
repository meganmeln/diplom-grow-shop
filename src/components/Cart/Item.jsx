import {useContext, useEffect, useState} from "react";
import {CartItemsContext, truncateString} from "../../pages/Main";

const CartItem = (props) => {
    const {addToCart, removeItemCart} = useContext(CartItemsContext);
    const [productCount, setProductCount] = useState(props.count);

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

    const productCountF = (type) => {
        if (type && type === 'minus') {
            if (productCount > 1) {
                setProductCount(prevState => prevState - 1)
            }
        } else if (type && type === 'plus') {
            setProductCount(prevState => prevState + 1)
        }

    }

    useEffect(() => {
        addToCart(
            {
                product: {
                    id: props.id,
                    title: props.title,
                    image: `/assets/images${props.image}`,
                    price: props.price,
                    discont_price: props.discont_price ? props.discont_price : null,
                    count: productCount,
                    allCount: productCount
                }
            }
        )
    }, [productCount])

    return (
        <div className="cart-item">
            <div className="left">
                <img src={props.image} alt={props.title}/>
            </div>
            <div className="right">
                <div className="top">
                    <h3 className="title">{truncateString(props.title, 18)}</h3>
                    <button className="remove" onClick={() => removeItemCart(props.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6L18 18" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div className="bottom">
                    <div className="count_block">
                        <button className="minus" onClick={() => productCountF('minus')}>-</button>
                        <input type="text" className="count" value={productCount} readOnly />
                        <button className="plus" onClick={() => productCountF('plus')}>+</button>
                    </div>
                    {priceBlock}
                </div>
            </div>
        </div>
    )
}

export default CartItem;