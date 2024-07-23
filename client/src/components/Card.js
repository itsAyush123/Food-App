import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');
    const options = props.options;
    const priceOptions = Object.keys(options);

    const handleAddToCart = async () => {
        let food = data.find(item => item.id === props.foodItem._id);

        if (food) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
            } else {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
            }
        } else {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        }
    };

    const finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div class="card mt-3 " style={{ width: "18rem", maxHeight: "360px" }}>
                <img src={props.foodItem.img} class="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                <div class="card-body">
                    <h5 class="card-title">{props.foodItem.name}</h5>
                    <div className="container w-100">
                        <select className=" m-2 h-100 bg-danger rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <select className=" m-2 h-100 bg-danger rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map(data => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                        <div className="d-inline h-100 fs-5">
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <div className='btn bg-danger text-white mx-2' onClick={handleAddToCart}>AddToCart</div>
                </div>
            </div>
        </div>
    );
}
