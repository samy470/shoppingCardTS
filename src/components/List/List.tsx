import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { addToCart } from "../../redux/cartSlice";
import { showDetails } from "../../redux/cartSlice";
import { useEffect, useState } from "react";
import { setList } from "../../redux/cartSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

const List = () => {
    const data = useSelector((state: any) => state.cart.list);
    const dispatch: Dispatch<any> = useDispatch();
    const details = useSelector((state: any) => state.cart.details);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/games')
            .then(res => res.json())
            .then(data => dispatch(setList(data)))
    }, [])

    return (
        <div>
            <h1>List</h1>
            <div className="products-grid" >
                {data.map((item: any, index: number) => (
                    <div  key={index} >
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Button variant="primary" onClick={() => { dispatch(showDetails(item)); setOpen(true); }}>Details</Button>
                                <br />
                                {item.price} USD
                                <Button variant="success" onClick={() => dispatch(addToCart(item))}>Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </div>

                ))}
                {details.map((item: any, index: number) => (
                    <div key={index}>
                        <div>
                            <Modal show={open} onHide={() => setOpen(false)}>
                                <img src={item.image} className="card-img-top" alt={item.name} />
                                <Modal.Header closeButton>

                                    <Modal.Title>{item.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {item.details}
                                </Modal.Body>
                                <Modal.Footer>
                                    {item.price} USD
                                    <Button variant="success" onClick={() => dispatch(addToCart(item))}>
                                        Add to cart
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default List;