import {useEffect, useState} from "react";
import CategoryItem from "../../components/Categories/Item";

const CategoriesPage = (props) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const categoriesResponse = await fetch(`http://localhost:3001/api/categories`);
                const categoriesData = await categoriesResponse.json();

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
        <div className="container">
            <h1 className="page-title">{props.pageTitle}</h1>

            <div className="categories">
                {
                    categories.map(category => <CategoryItem {...category} key={category.id}/>)
                }
            </div>
        </div>
    )
}

export default CategoriesPage;