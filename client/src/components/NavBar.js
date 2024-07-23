import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screeens/Cart';
import { useCart } from './ContextReducer';

export default function NavBar() {
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            MyFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem('authToken') && ( // Simplified conditional rendering
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">
                    MyOrder
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem('authToken') ? (
              <div className="d-flex">
                <Link className="btn bg-white text-danger mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-danger mx-1" to="/createuser">
                  SignUp
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <div className="btn bg-white text-danger mx-2" onClick={() => setCartView(true)}>
                  MyCart{' '}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                  LogOut
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
