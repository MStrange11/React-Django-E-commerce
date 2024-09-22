import React from "react";
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center">
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0"> 
            {/* <i class="fa-solid fa-cart-shopping"></i> &nbsp;
             WanderWays */}
              <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"><i class="fa-solid fa-store"></i> &nbsp; WanderWays</NavLink>
            </p>
            
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
