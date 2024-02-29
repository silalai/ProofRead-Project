import React, { useState } from 'react';
import styled from 'styled-components';
import Box from "../components/Box";

import { useNavigate } from 'react-router-dom';
import axios from "axios"

const HomeContainer = styled.div`
background: url('/image/bg-home.png');
margin: 0;
overflow-x: hidden;  
background-size: cover;
background-repeat: no-repeat;
`;

const Home = ({ Modal }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [names, setNames] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleNameChange = (newName) => {
    if (names.includes(newName)) {
      Modal('แจ้งเตือน', 'คุณกรอกชื่อนี้ไปแล้ว', true);

    } else {
      // ถ้า newName ไม่อยู่ใน names ให้เพิ่มเข้าไป
      setNames([...names, newName]);
    }
  };

  const NameDelete = (deleteName) => {
    setNames(names.filter((name) => name !== deleteName));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.text || data.text.trim() === "") {
      Modal('แจ้งเตือน', 'กรุณากรอกข้อความ', true);
      return;
    }

    Modal('กรุณารอสักครู่', 'ระบบกำลังตรวจสอบคำผิด', false)

    try {
      // ส่ง request ไปยัง process_data พร้อมกับ name
      const response = await axios.post("http://localhost:5000/api/process_data", {
        ...data,
        names: names,
      });;
      //console.log("Server Response:", response.data);

      // ส่ง response ไปยัง route Output
      navigate("/output_page", { state: { responseData: response.data } });
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };


  return (
    <HomeContainer>
    <div className='app'>
      <nav className="navbar-home">
      <div className="logo-container">
        <img src="/image/logo.png" alt="Logo" className="logo" />
        <span className="web-name" >Cha-ThaiProof</span>
      </div>
        <span className="about">About</span>
      </nav>
    <div className="container-home">
      <div className="container-left-home">
      <div className="input-container">
          <textarea id="textbox"
                    name="text" 
                    value={data.text}
                    onChange={handleChange}
                    placeholder="ใส่ข้อความตรงนี้">  
          </textarea>
          <button className="my-button" type="submit" onClick={handleSubmit}>
            ตรวจสอบ
          </button>
        </div>
      </div>
      <Box onNameChange={handleNameChange} onNameDelete={NameDelete} Modal={Modal}/>
    </div>
    </div>
    </HomeContainer>
  );
};

export default Home;