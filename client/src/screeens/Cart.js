import { FaTrash } from 'react-icons/fa';
import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import StripeCheckout from 'react-stripe-checkout';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  const handleCheckOut = async (token) => {
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:8000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
        token: token
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className='container mt-5'>
      {data.length === 0 ? (
        <div className='text-center fs-3 text-white'>The Cart is Empty!</div>
      ) : (
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead className='text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Option</th>
                <th scope='col'>Amount</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {data.map((food, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button type="button" className="btn p-0" style={{ color: 'white' }} onClick={() => dispatch({ type: "REMOVE", index: index })}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
          <div>
            <StripeCheckout
              stripeKey={process.env.REACT_APP_STRIPE_KEY}
              token={handleCheckOut}
              amount={totalPrice * 100}
              currency="INR"
              name="Food Ordering App"
              email={localStorage.getItem("userEmail")}
              billingAddress
              shippingAddress
              zipCode
            >
              <button className='btn bg-success mt-5'>Check Out</button>
            </StripeCheckout>
          </div>
        </div>
      )}
    </div>
  )
}
