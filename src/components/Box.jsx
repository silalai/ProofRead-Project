import React, { useState } from "react";

const Box = ({ onNameChange, onNameDelete, Modal }) => {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text || text.trim() === "") {
      Modal('แจ้งเตือน', "กรุณากรอกข้อความ", true);
      return;
    }

    try {
      // เรียกใช้ฟังก์ชันที่ถูกส่งมาจาก Home เพื่ออัพเดท name
      onNameChange(text); 
    } catch (error) {
      console.error("Error sending name:", error);
    }

    if (texts.includes(text)) {

    } else {
      setTexts([...texts, text]);
    }
    setText(""); // เคลียร์ค่าใน input หลังจาก submit
  };

  const handleDelete = (textIndex) => {
    const delName = texts[textIndex];

    setTexts(texts.filter((text, index) => index !== textIndex));
    onNameDelete(delName)
  };

  return (
    <div className="container-right-home">
      <div className="box">
        <div className="nav-container-right">
          <input
            id="name-text"
            name="text"
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="หากต้องการระบุชื่อเฉพาะ"
            style={{
              maxWidth: "100vw",
              maxHeight: "100vh"
            }}
          />
          <button className="save-name-button" onClick={handleSubmit}> 
            บันทึก
          </button>
        </div>
        <div className="name-box">
          <div className="name-box-out">
            {texts.map((text, index) => (
              <p key={index}>
                {text}
                <button className="delete-name-button" onClick={() => handleDelete(index)}>
                  ลบ
                </button>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;