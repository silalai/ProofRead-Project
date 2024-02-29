import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Table from "../components/Table";
import OutputBox from "../components/OutputBox";
//import Box from "../components/Box";

const OutputContainer = styled.div`
  background: url('/image/bg-home.png');
  margin: 0;
  overflow-x: hidden;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Output = ({ Modal }) => {
  const navigate = useNavigate();
  const [clickedChangeWord, setClickedChangeWord] = useState(null);
  const [clickedData, setClickedData] = useState(null);

  const handleSendClickedData = (data) => {
    setClickedData(data);
  };

  const handleWordChange = (clickedWord, correctedWord) => {
    setClickedData(clickedWord, correctedWord);
  };

  const handleButtonClick = (clickedWord, correctedWord) => {
    setClickedChangeWord({ clickedWord, correctedWord });
  };

  const handleClick = async () => {
    navigate("/");
  };
 

  return (
    <OutputContainer>
      <div className="app">
        <nav className="navbar-output-page">
          <button className="my-back-button" onClick={handleClick}>
            กลับ
          </button>
          <div className="logo-container-output-page">
            <img
              src="/image/logo.png"
              alt="Logo"
              className="logo-output-page"
            />
            <span className="web-name-output-page">Cha-ThaiProof</span>
          </div>
        </nav>
        <div className="container-output-page">
            <OutputBox onSendClickedData={handleSendClickedData} 
                       Modal={Modal}
                       clickedChangeWord={clickedChangeWord}
                       onWordChange={handleWordChange}/>
            <Table clickedData={clickedData} 
                   onButtonClick={handleButtonClick}  />
        </div>
      </div>
    </OutputContainer>
  );
};

export default Output;
