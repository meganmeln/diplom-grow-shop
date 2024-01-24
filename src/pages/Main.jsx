import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Header from '../components/Header/Header'
import Footer from "../components/Footer/Footer";
import FrontPage from "./FrontPage/FrontPage";
import CategoriesPage from "./CategoriesPage/CategoriesPage";
import ProductsPage from "./ProductsPage/ProductsPage";
import ProductPage from "./ProductPage/ProductPage";
import CartPage from "./CartPage/CartPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

export const CartItemsContext = React.createContext();

export const getMobileOperatingSystem = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
        return true;
    }

    if (/android/i.test(userAgent)) {
        return true;
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
    }

    return false;
}

export const truncateString = (str, num) => {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
}

function Main(props) {
    const [cartItems, setCartItems] = React.useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : {products: {}, count: 0, total_sum: 0};
    });

    const addToCart = (newProduct) => {
        setCartItems(prevCartItems => {
            const updatedProducts = {...prevCartItems.products};

            if (updatedProducts[newProduct.product.id]) {
                if (newProduct.product.allCount) {
                    updatedProducts[newProduct.product.id].count = newProduct.product.count;
                } else {
                    updatedProducts[newProduct.product.id].count += newProduct.product.count;
                }
            } else {
                updatedProducts[newProduct.product.id] = newProduct.product;
            }

            const totalItemCount = Object.values(updatedProducts).reduce((total, product) => total + product.count, 0);
            const totalItemSum = Object.values(updatedProducts).reduce((total, product) => {
                let productSum = product.discont_price ? product.discont_price : product.price;
                return total + (product.count * productSum);
            }, 0);

            return {
                products: updatedProducts,
                count: totalItemCount,
                total_sum: totalItemSum,
            };
        });
    }

    const removeItemCart = (id) => {
        setCartItems(prevCartItems => {
            const updatedProducts = {...prevCartItems.products};

            delete updatedProducts[id];

            const totalItemCount = Object.values(updatedProducts).reduce((total, product) => total + product.count, 0);
            const totalItemSum = Object.values(updatedProducts).reduce((total, product) => {
                let productSum = product.discont_price ? product.discont_price : product.price;
                return total + (product.count * productSum);
            }, 0);

            return {
                products: updatedProducts,
                count: totalItemCount,
                total_sum: totalItemSum,
            };
        });
    }

    const addOrder = (obj) => {
        console.log(obj)

        setCartItems({products: {}, count: 0, total_sum: 0})
    }

    React.useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <>
            <BrowserRouter>
                <CartItemsContext.Provider value={{cartItems, addToCart, removeItemCart, addOrder}}>
                    <Header/>
                    <main>
                        <Routes>
                            <Route path='/' element={<FrontPage/>}/>
                            <Route path='/categories' element={<CategoriesPage pageTitle={`Categories`} />}/>
                            <Route path='/products/' element={<ProductsPage pageTitle={`All products`} />}/>
                            <Route path='/products/:id' element={<ProductPage />}/>
                            <Route path='/cart' element={<CartPage pageTitle={`Shopping cart`} />}/>
                            <Route path="*" element={<NotFoundPage />}/>
                        </Routes>
                    </main>
                    <Footer/>
                </CartItemsContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default Main;
