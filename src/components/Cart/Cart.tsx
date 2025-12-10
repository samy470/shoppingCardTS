import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { removeFromCart } from "../../redux/cartSlice";

const Cart = () => {
    const items = useSelector((state: any) => state.cart.cart);
    const dispatch: Dispatch<any> = useDispatch();

  return(
    <div className="container">
      <h1>Shopping Cart</h1>
      <div className="products-grid">
      {items.length === 0 && <p>Cart is empty</p>}

      {items.map((item: any, index: number) => (
        <div className="cart-item" key={index}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <h2>${item.price}</h2>
          <button type="button" className="btn btn-danger" onClick={() => dispatch(removeFromCart(item.name))}>Remove</button>
        </div>
      ))}
      </div>
      <h4>Total:${items.reduce((total: number, item: any) => total + parseFloat(item.price), 0).toFixed(2)}</h4>
    </div>
  )
}

export default Cart;