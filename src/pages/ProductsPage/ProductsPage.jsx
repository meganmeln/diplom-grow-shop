import {useCallback, useEffect, useMemo, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import ProductItem from "../../components/Products/Item";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import {getMobileOperatingSystem} from "../Main";

const ProductsPage = (props) => {
    const [pageTitle, setPageTitle] = useState(props.pageTitle);
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const applyFilters = useCallback((newFilters) => {
        const searchParams = new URLSearchParams();

        Object.keys(newFilters).forEach(key => {
            if (newFilters[key]) {
                searchParams.set(key, newFilters[key]);
            }
        });

        const newUrl = `?${searchParams.toString()}`;
        navigate(newUrl);

        setFilters(newFilters);
    }, [navigate, setFilters]);

    const queryParams = useMemo(() => {
        return queryString.parse(location.search);
    }, [location.search]);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/products/?${queryString.stringify(queryParams)}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [location.search]);

    const fetchCategoryItem = useCallback(async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/categories/?categoryId=${categoryId}`);
            const data = await response.json();
            const title = data[0] && data[0].title ? data[0].title : props.pageTitle;
            setPageTitle(title);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [location.search]);

    useEffect(() => {
        const parsed = queryString.parse(location.search);
        if (!parsed.sales && !parsed.categoryId) {
            setPageTitle(props.pageTitle)
        }

        if (parsed.sales && !parsed.categoryId) {
            setPageTitle("Discounted items")
        }

        if (parsed.categoryId) {
            fetchCategoryItem(parsed.categoryId)
        }

        fetchData();
    }, [fetchData]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname, location.search]);

    return (
        <div className="container">
            <h1 className="page-title">{pageTitle}</h1>
            <div className="product_container">
                <ProductFilter applyFilters={applyFilters} />

                <div className={`products ${getMobileOperatingSystem() ? 'mobile' : ''}`}>
                    {
                        products.map(product => <ProductItem {...product} key={product.id} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductsPage;