import React from "react";
import { useState } from "react";

const Table = ({ clickedData, onButtonClick }) => {
    const isNotFound = clickedData?.correctedWord === "ไม่พบในพจนานุกรม";
    const isDataAvailable = clickedData?.correctedWord && !isNotFound;

    const renderButton = () => {
      if (isNotFound || !isDataAvailable) {
        // กรณีค่าเป็น "ไม่พบในพจนานุกรม"
        return null; // ไม่แสดงปุ่ม
      } else {
        // กรณีค่าไม่ใช่ "ไม่พบในพจนานุกรม"
        return (
          <button className="change-button" onClick={handleButtonClick}>
            แทนที่
          </button>
        );
      }
    };
  
    const handleButtonClick = () => {
      onButtonClick(clickedData.clickedWord, clickedData.correctedWord);
    };
  
    return (
      <div className="container-right">
      <table className="styled-table">
        <thead>
          <tr>
            <th>รายการคำที่น่าจะผิด</th>
            <th>การแก้ไขที่แนะนำ</th>
            <th>แก้ไข</th> 
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{clickedData?.clickedWord}</td>
              <td>{clickedData?.correctedWord}</td>
              <td>{renderButton()}</td>
            </tr>
        </tbody>
      </table>
      </div>
    );
  };
  
  export default Table;
