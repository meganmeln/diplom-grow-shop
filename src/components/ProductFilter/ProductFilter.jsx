import React, {useState, useCallback, useEffect} from 'react';
import {  Select, Space, Checkbox  } from 'antd';
import queryString from "query-string";
import {useLocation} from "react-router-dom";
import './ProductFilter.css';

const ProductFilter = ({ applyFilters }) => {
    const location = useLocation();
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [hasDiscount, setHasDiscount] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const formatPriceRange = (priceRange) => {
        if (priceRange.min && priceRange.max) {
            return `${priceRange.min},${priceRange.max}`;
        }
    };

    const handlePriceChange = useCallback((e) => {
        setPriceRange({ ...priceRange, [e.target.name]: e.target.value });
    }, [priceRange]);

    const handleApplyFilters = useCallback(() => {
        applyFilters({
            price: formatPriceRange(priceRange),
            sales: hasDiscount,
            sort: sortBy,
            categoryId: categoryId
        });
    }, [priceRange, hasDiscount, sortBy, categoryId]);

    useEffect(() => {
        const params = queryString.parse(location.search);

        if (params.categoryId) {
            setCategoryId(params.categoryId);
        }

        if (params.price) {
            const prices = params.price.split(',');
            setPriceRange({min: prices[0], max: prices[1]})
        }

        if (params.sales) {
            setHasDiscount(true)
        }

        if (params.sort) {
            setSortBy(params.sort)
        }

        return () => {
            setPriceRange({ min: '', max: '' });
            setHasDiscount(false);
            setSortBy('');
            setCategoryId('');
        }

    }, [location.search]);

    return (
        <div className="product-filter">
            <div className="product-filter_item">
                <p className="product-filter_item_tit">Price</p>
                <div>
                    <input
                        type="text"
                        name="min"
                        value={priceRange.min}
                        onChange={handlePriceChange}
                        placeholder="from"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="max"
                        value={priceRange.max}
                        onChange={handlePriceChange}
                        placeholder="to"
                    />
                </div>
            </div>
            <div className="product-filter_item">
                <label className="product-filter_item_tit" onClick={() => setHasDiscount(!hasDiscount)}>Discounted items</label>
                <Checkbox checked={hasDiscount} onChange={() => setHasDiscount(!hasDiscount)}></Checkbox>
            </div>
            <div className="product-filter_item">
                <label className="product-filter_item_tit">Sorted</label>
                <Space wrap>
                    <Select
                        defaultValue="by default"
                        style={{
                            width: 150,
                        }}
                        onChange={(value) => setSortBy(value)}
                        options={[
                            {
                                value: 'by default',
                                label: 'by default',
                            },
                            {
                                value: 'newest',
                                label: 'newest',
                            },
                            {
                                value: 'price-low-high',
                                label: 'price: low-high',
                            },
                            {
                                value: 'price-high-low',
                                label: 'price: high-low',
                            },
                        ]}
                    />
                </Space>
            </div>
            <input type="hidden" name="categoryId" value={categoryId} />
            <div className="product-filter_item">
                <button onClick={handleApplyFilters} className="apply_filter_btn">Apply filters</button>
            </div>
        </div>
    );
};

export default ProductFilter;
