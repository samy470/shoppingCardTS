import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { addToCart } from "../redux/cartSlice";
import { showDetails } from "../redux/cartSlice";

const List = () => {
    const data = useSelector((state: any) => state.cart.list);
    const dispatch: Dispatch<any> = useDispatch();

    return (
        <div>
            <h1>List</h1>
            <div className="products-grid">
            {data.map((item: any, index: number) => (
                <div key={index}>
                    <div className="card" style={{width: "18rem"}}>
                        <img src={item.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <button type="button" className="btn btn-primary" onClick={() => dispatch(showDetails(item))}>Details</button>
                                <span className="fw-bold">${item.price} USD</span>
                                <button type="button" className="btn btn-success" onClick={() => dispatch(addToCart(item))}>Add to Cart</button>
                            </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default List;