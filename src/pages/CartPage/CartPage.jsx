import {useContext, useState} from "react";
import {  Button, Modal  } from "antd"
import {CartItemsContext} from "../Main";
import CartItem from "../../components/Cart/Item";
import {Link} from "react-router-dom";
import './CartPage.css';

const CartPage = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {cartItems, addOrder} = useContext(CartItemsContext);

    const emptyCartBlock = (
        <div className="emptyCartBlock">
            <p>Looks like you have no items in your basket currently.</p>
            <Link to={`/products`} className="btn">Continue Shopping</Link>
        </div>
    );

    const onOrder = (e) => {
        e.preventDefault();
        const orderData = {};

        const name = e.target[0].value;
        const phone = e.target[1].value;
        const email = e.target[2].value;

        const phoneRegex = /^[+]?[0-9]{10,12}$/;

        if (!phoneRegex.test(phone)) {
            alert("Please enter a correct phone number.");
            return;
        }

        orderData.personData = {};
        orderData.personData.name = name;
        orderData.personData.phone = phone;
        orderData.personData.email = email;

        orderData.cartItems = cartItems;

        addOrder(orderData);

        setIsModalOpen(true)

    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <div className="section_top" style={{marginTop: 0}}>
                <h1 className="page-title" style={{margin: 0}}>{props.pageTitle}</h1>
                <div className="section_btn_block">
                    <Link to="/products" className="section_top_btn">Back to the store</Link>
                </div>
            </div>
            {
                Object.values(cartItems.products).length > 0 ? (
                    <div className="cartPage">
                        <div className="left">
                            <div className="cartItems">
                                {Object.values(cartItems.products).map(item => (
                                    <CartItem key={item.id} {...item} />
                                ))}
                            </div>
                        </div>
                        <div className="right">
                            <h3>Order details</h3>
                            <p className="cartItems">{Object.values(cartItems.products).length} items</p>
                            <p className="cartTotal">Total <span>${cartItems.total_sum.toFixed(2)}</span></p>
                            <div className="cartForm">
                                <form action="#" className="form" id="order-form" onSubmit={onOrder}>
                                    <input type="text" placeholder="Name" required={true}/>
                                    <input type="tel" placeholder="Phone number" required={true}/>
                                    <input type="email" placeholder="Email" required={true}/>
                                    <button type="submit" className="btn">Order</button>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="cartPage">
                        {emptyCartBlock}

                        <Modal open={isModalOpen} onOk={handleCancel} onCancel={handleCancel}>
                            <h3>Congratulations!</h3>
                            <p>Your order has been successfully placed on the website.</p>
                            <p>A manager will contact you shortly to confirm your order.</p>
                        </Modal>
                    </div>
                )
            }

        </div>
    )
}

export default CartPage;