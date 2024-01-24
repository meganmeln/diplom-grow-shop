import React from "react";
import { Link } from 'react-router-dom';

import s from './Header.module.css';
import LogoImg from '../../assets/image/logo.svg';
import CartImg from '../../assets/image/cart.svg';
import {CartItemsContext} from "../../pages/Main";

const Logo = () => {
    return (
        <Link to="/">
            <img className={s.HeaderLogo} src={LogoImg} alt="GrowShop Logo" />
        </Link>
    );
}

const Menu = () => {
    return (
        <nav className={s.Menu}>
            <Link to="/">Main Page</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/products/">All products</Link>
            <Link to="/products/?sales=true">All sales</Link>
        </nav>
    );
}

const CartBtn = ({count = 0}) => {
    return (
        <Link to="/cart" className={s.CartBtn}>
            <img className={s.CartImg} src={CartImg} alt="Cart"/>
            {
                count > 0
                    ? (<span className={s.CartCount}>{count}</span>)
                    : ''
            }
        </Link>
    );
}

const Header = (props) => {
    const {cartItems} = React.useContext(CartItemsContext);

    return (
        <header className={s.MainHeader}>
            <div className="container">
                <div className={s.Header}>
                    <Logo />
                    <Menu />
                    <CartBtn count={cartItems.count} />
                </div>
            </div>
        </header>
    );
}

export default Header;