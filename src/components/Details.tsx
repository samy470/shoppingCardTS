import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { addToCart } from "../redux/cartSlice";

const Details = () => {
    const data = useSelector((state: any) => state.cart.details);
    const dispatch: Dispatch<any> = useDispatch();

    return (
        <div>
            <h1>
                Details
            </h1>
            {data.map((item: any, index: number) => (
                <div key={item}>
                    <div className="card" style={{ width: "18rem" }}>
                        <img src={item.image} className="card-img-top" alt={item.name} />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.details}</p>
                            <span className="fw-bold">${item.price} USD</span>
                            <button className="btn btn-success" onClick={() => dispatch(addToCart({ name: item.name, image: item.image, price: item.price }))}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Details;