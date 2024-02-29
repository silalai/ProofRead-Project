import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";


const OutputBox = ({ onSendClickedData, Modal, clickedChangeWord, onWordChange}) => {
  const location = useLocation();
  const textboxRef = useRef();

  const [outputData, setOutputData] = useState('');
  const [targetWords, setTargetWords] = useState([]);
  const [proofread, setProofread] = useState([]);
  const [changedWords, setChangedWords] = useState([])

  // รับข้อมูลจาก route Home
  const responseData = location.state?.responseData || {};

  // ตรวจสอบว่ามีข้อมูลที่ได้รับมาไหม
  if (!responseData) {
    Modal("Error", "No data available", true);
  }

  useEffect(() => {
    if (responseData) {
      const proof = JSON.parse(JSON.stringify(responseData.proofread, null, 2));
      if (proof[0].message) {
        Modal('ดำเนินการเสร็จสิ้น', proof[0].message, true)
      } else {
        Modal('ดำเนินการเสร็จสิ้น', 'คลิกคำผิดที่ถูกไฮไลต์ไว้เพื่อตรวจสอบคำแนะนำในตาราง', true)
        setProofread(proof)
      }
  }}, [responseData]);

  useEffect(()=> {
    if (responseData) {
      let pos = [];
      if (responseData.pos !== undefined) {
        pos = JSON.parse(JSON.stringify(responseData.pos, null, 2));
      }
      
      const data = JSON.parse(JSON.stringify(responseData.data, null, 2));
            
      // กำหนดสีตามเงื่อนไข
      const colorWords = data.map((word, index) => {
        const color = pos && pos.includes(index) ? "#f88968" : "black";
        return { word, color, index };
      });

      setTargetWords(colorWords)

      // สร้าง formattedText จาก colorWords
      const formattedText = colorWords
      .map(({ word, color }) => {
        const keywordClass = color === '#f88968' ? 'keyword' : ''; // เพิ่ม class 'keyword' ถ้าคำผิดที่ถูกไฮไลต์สี
        const IschangedWord = changedWords.find(changedWord => changedWord.clickedWord === word);
    
        if (IschangedWord) {
          onWordChange(null, null)
          return `<span style="color: black">${IschangedWord.correctedWord}</span>`;
        }

        const sanitizedWord = typeof word === 'string' ? word.replace(/\n/g, '<br/>') : word;
        return `<span class="${keywordClass}" style="color: ${color}">${sanitizedWord}</span>`;
        
      })
      .join('');

      setOutputData(formattedText);
  
  }}, [responseData, outputData]);

  useEffect(() => {
    if (clickedChangeWord) {
      const { clickedWord, correctedWord } = clickedChangeWord;
      setChangedWords((prevChangedWords) => [...prevChangedWords, clickedChangeWord]);

      const updatedOutputData = outputData.replace(
        new RegExp(clickedWord, 'g'),
        correctedWord
      );

      setOutputData(updatedOutputData);
    }
  }, [clickedChangeWord]);

  //เช็คว่ากดที่คำไหน
  const handleTextClick = (e) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const clickedElement = range.commonAncestorContainer;

    if (textboxRef.current.contains(clickedElement)) {
      range.collapse(true);

      const clickedWord = targetWords.find(({ index }) => {
        const wordElement = textboxRef.current.childNodes[index];
        return wordElement && wordElement.contains(clickedElement);
      });

      if (clickedWord) {
        const target = e.target;
        if (target.classList.contains("keyword")) {
            //console.log(clickedWord.word)

          if (proofread && proofread.length > 0) {
            // เช็คว่าที่คลิกตรงกับ word ใน proofread
            const proofreadMatch = proofread.find(({ word }) => word === clickedWord.word);

            // ถ้าตรงให้ส่งข้อมูล word กับ correct word ไปให้ Table
            if (proofreadMatch) {
              onSendClickedData({
                clickedWord: clickedWord.word,
                correctedWord: proofreadMatch.corrected_word,
              });
            }
          }
        }
      }
    }
  };

  const handleMouseMove = (e) => {
    const target = e.target;
    const isCursorOverKeyword = target.classList.contains("keyword"); // ตรวจสอบว่า cursor อยู่ที่คำผิดไหม
    
    // ถ้าใช่เปลี่ยนเป็น pointer
    target.style.cursor = isCursorOverKeyword ? 'pointer' : 'auto';
  };
  
  return (
        <div className="container-left">
            <div id="textbox-output" 
            dangerouslySetInnerHTML={{ __html: outputData }} 
            onMouseUp={handleTextClick}
            onMouseMove={handleMouseMove}     
            ref={textboxRef}/>
        </div>     
  );
};

export default OutputBox;