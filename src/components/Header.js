import {React, useRef, useState, useEffect} from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import images from "../constants/index.jsx"




const Header = ({isScrolling}) => {

  const [open, setOpen] = useState(false);

  const handClick = () => {
    setOpen(!open)
  }


  /* Sesion */
  const [token, setToken] = useState(false);
  
  return (
    <header className="header-rippley-ecommerce">
      <section className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Todos los envios al cargo de Rippley Go
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white ml-1">
                Website: 
                <a className="text-white ml-2" href="https://rippley.net/">
                   Rippley.net
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-nr1">
              <Link to="/" className="text-white">
                <img className="rippley-nav-logo" src={images.lognav1} alt="Rippley logo" />
              </Link>
            </div>
            <div className="col-nr2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-nr3">
              <div className="header-upper-links d-flex align-items-center justify-content-end gap-10">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    
                  </Link>
                </div>
                <div>
                  {token ? 
                    (
                      <Link to="/" className="d-flex align-items-center gap-10 text-white">
                        <img src={compare} alt="user" /> 
                      </Link>
                    )  : (
                      <Link to="/login" className="d-flex align-items-center gap-10 text-white">
                        <img src={user} alt="user" />
                      </Link>
                    )
                  }
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">0</span>
                      <p className="mb-0">$ 500</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="wrapper burger">
              <div className={`icon nav-icon-1 ${open ? 'open' : ''}`} onClick={handClick}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`header-fixed py-3 ${isScrolling > 2 ? "navscrolling" : null}`}>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-nr1">
              <Link to="/" className="text-white">
                <img className="rippley-nav-logo" src={images.lognav1} alt="Rippley logo" />
              </Link>
            </div>
            <div className="col-nr2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-nr3">
              <div className="header-upper-links d-flex align-items-center justify-content-end gap-10">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    
                  </Link>
                </div>
                <div>
                  {token ? 
                    (
                      <Link to="/" className="d-flex align-items-center gap-10 text-white">
                        <img src={compare} alt="user" /> 
                      </Link>
                    )  : (
                      <Link to="/login" className="d-flex align-items-center gap-10 text-white">
                        <img src={user} alt="user" />
                      </Link>
                    )
                  }
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">0</span>
                      <p className="mb-0">$ 500</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="wrapper burger">
              <div className={`icon nav-icon-1 ${open ? 'open' : ''}`} onClick={handClick}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`mobile-sidebar ${open ? 'sidebar-show' : ''}`}>
        <div>
          <Link
            to="/compare-product"
            className="d-flex align-items-center gap-10 text-white"
          >
            <img src={compare} alt="compare" />
            
          </Link>
        </div>
        <div>
          <Link
            to="/wishlist"
            className="d-flex align-items-center gap-10 text-white"
          >
            <img src={wishlist} alt="wishlist" />
            
          </Link>
        </div>
        <div>
          
          {token ? 
            (
              <Link to="/" className="d-flex align-items-center gap-10 text-white">
                <img src={compare} alt="user" /> 
              </Link>
            )  : (
              <Link to="/login" className="d-flex align-items-center gap-10 text-white">
                <img src={user} alt="user" />
              </Link>
            )
          }
                    
        </div>
        <div>
          <Link
            to="/cart"
            className="d-flex align-items-center gap-10 text-white"
          >
            <img src={cart} alt="cart" />
            <div className="d-flex flex-column gap-10">
              <span className="badge bg-white text-dark">0</span>
              <p className="mb-0">$ 500</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
