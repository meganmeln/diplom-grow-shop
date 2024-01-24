import { Link } from 'react-router-dom';

const CategoryItem = (props) => {

    return (
        <div className="category">
            <Link to={`/products/?categoryId=${props.id}`}>
                <div className="top">
                    <img src={`/assets/images${props.image}`} alt=""/>
                </div>
            </Link>
            <Link to={`/products/?categoryId=${props.id}`}>
                <div className="bottom">
                    <h4 className="title">{props.title}</h4>
                </div>
            </Link>
        </div>
    );
}


export default CategoryItem;