import {useCallback, useEffect, useContext, useState} from "react";
import {useParams, useLocation} from 'react-router-dom';
import {CartItemsContext} from "../Main";
import './ProductPage.css';

const ProductPage = () => {
    const {cartItems, addToCart} = useContext(CartItemsContext);
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [productCount, setProductCount] = useState(1);
    const location = useLocation();

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (cartItems.products[id] && cartItems.products[id].count) {
            setProductCount(cartItems.products[id].count)
        }
    }, [location.pathname, location.search]);

    const priceBlock = (
        product.discont_price ? (
            <div className="price_block">
                <p className="discont_price">${product.discont_price}</p>
                <p className="price old">${product.price}</p>
            </div>
        ) : (
            <div className="price_block">
                <p className="price">${product.price}</p>
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

    return (
        <div className="container">
            <div className="product-page">
                <div className="left">
                    <img src={`/assets/images${product.image}`} alt=""/>
                </div>
                <div className="right">
                    <h2 className="title">{product.title}</h2>
                    {priceBlock}
                    <div className="cart_block">
                        <div className="count_block">
                            <button className="minus" onClick={() => productCountF('minus')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19" stroke="#8B8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <input type="text" className="count" value={productCount} readOnly />
                            <button className="plus" onClick={() => productCountF('plus')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19" stroke="#8B8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 5V19" stroke="#8B8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <button className="btn"
                                onClick={() => addToCart(
                                    {
                                        product: {
                                            id: product.id,
                                            title: product.title,
                                            image: `/assets/images${product.image}`,
                                            price: product.price,
                                            discont_price: product.discont_price ? product.discont_price : null,
                                            count: productCount,
                                            allCount: productCount
                                        }
                                    }
                                )}
                        >Add to cart</button>
                    </div>
                    <div className="description_block">
                        <h3 className="description_title">Description</h3>
                        <p className="description_text">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;