import s from './FrontPage.module.css';
import bannerImage from '../../assets/image/banner1.png';
import discountBannerImage from '../../assets/image/banner2.png';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import CategoryItem from "../../components/Categories/Item";
import ProductItem from "../../components/Products/Item";
import {getMobileOperatingSystem} from "../Main";

const FrontPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const productsResponse = await fetch(`http://localhost:3001/api/products?limit=4&sales=true`);
                const categoriesResponse = await fetch(`http://localhost:3001/api/categories?limit=4`);
                const productsData = await productsResponse.json();
                const categoriesData = await categoriesResponse.json();

                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
        };
    }, []);

    return (
        <>
            <section className={s.TopBanner}>
                <div className={s.Banner}>
                    <img src={bannerImage} alt="Amazing Discounts on Garden Products!"/>
                </div>

                <div className={s.TopBannerContent}>
                    <h1>Amazing Discounts on <br/>Garden Products!</h1>
                    <Link to="/products/?sales=true" className="btn">Check out</Link>
                </div>
            </section>

            <div className="container">
                <section className={s.Categoryes}>
                    <div className="section_top">
                        <h2 className="section_top_title">Categories</h2>
                        <div className="section_btn_block">
                            <Link to="/categories" className="section_top_btn">All categories</Link>
                        </div>
                    </div>

                    <div className="categories">
                        {
                            categories.map(category => <CategoryItem {...category} key={category.id}/>)
                        }
                    </div>
                </section>

                <section className={s.Discount}>
                    <div className={s.DiscountTop}>
                        <h2>5% off on the first order</h2>
                    </div>
                    <div className={s.DiscountBottom}>
                        <div className={s.DiscountBottomLeft}>
                            <img src={discountBannerImage} alt="discount"/>
                        </div>
                        <div className={s.DiscountBottomRight}>
                            <form action="#" className="form" id="discount-form">
                                <input type="text" placeholder="Name" required={true}/>
                                <input type="tel" placeholder="Phone number" required={true}/>
                                <input type="email" placeholder="Email" required={true}/>
                                <button type="button" className="btn btn-light">Get a discount</button>
                            </form>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="section_top">
                        <h2 className="section_top_title">Sale</h2>
                        <div className="section_btn_block">
                            <Link to="/products?sales=true" className="section_top_btn">All sales</Link>
                        </div>
                    </div>

                    <div className={`products ${getMobileOperatingSystem() ? 'mobile' : ''}`}>
                        {
                            products.map(product => <ProductItem {...product} key={product.id} />)
                        }
                    </div>
                </section>
            </div>
        </>
    )
}

export default FrontPage;