import React from 'react';


const Navbar1 = () => {
    const handleClick = () => {
      // เปลี่ยนหน้าไปหน้าอื่น
      window.location.href = "http://localhost:5173/";
    };
  
    return (
      <nav className="navbar1">
      <div className="logo-container1">
        <button className="my-button1" onClick={handleClick}>กลับ</button>
        <img src="/image/logo.png" alt="Logo" className="logo1" />
        <span className="web-name1" >Cha-ThaiProof</span>
      </div>
    </nav>
    );
  };
  
  export default Navbar1;