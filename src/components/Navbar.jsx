import React from 'react';

const Navbar = ()=> {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/image/logo.png" alt="Logo" className="logo" />
        <span className="web-name" >Cha-ThaiProof</span>
      </div>
    </nav>
  );
};

export default Navbar;