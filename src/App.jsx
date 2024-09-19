import { useState } from "react";
import "./App.css";

export default function App() {
  const [level, setLevel] = useState(0);
  const [mainImage, setMainImage] = useState("src/hippo.jpg");
  const [animation, setAnimation] = useState("");

  const increaseLevel = (amount, imageType) => {
    setLevel((prevLevel) => {
      const newLevel = prevLevel + amount;
      if (newLevel >= 100) {
        setMainImage("src/milk.jpeg");
      }
      triggerAnimation(imageType);
      return newLevel;
    });
  };

  const triggerAnimation = (imageType) => {
    setAnimation(imageType);
    setTimeout(() => setAnimation(""), 600);
  };

  const resetLevel = () => {
    setLevel(0);
    setMainImage("src/hippo.jpg");
  };

  const imageSize = `${Math.min(500, 100 + level * 0.5)}px`;

  const handleDragStart = (e, imageType) => {
    e.dataTransfer.setData("imageType", imageType);
  };

  const handleDrop = (e) => {
    e.preventDefault(); 
    const imageType = e.dataTransfer.getData("imageType");
    if (imageType) {
      let amount = 0;
      if (imageType === "watermelon") amount = 5;
      else if (imageType === "pumpkin") amount = 10;
      else if (imageType === "grass") amount = 20;

      increaseLevel(amount, imageType);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="container">
      <div
        className="main-image-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="level-display">Level {level}</div>
        <img
          src={mainImage}
          alt="Main"
          style={{ width: imageSize, height: imageSize }}
        />
      </div>

      <div className="image-row">
        <div
          className="image-button-container"
          draggable
          onDragStart={(e) => handleDragStart(e, "watermelon")}
        >
          <img
            src="src/แตงโม.jpg"
            alt="แตงโม"
            className={`small-image ${animation === "watermelon" ? "animate" : ""}`}
          />
          <button onClick={() => increaseLevel(5, "watermelon")}>
          แตงโม (5)
          </button>
        </div>
        <div
          className="image-button-container"
          draggable
          onDragStart={(e) => handleDragStart(e, "pumpkin")}
        >
          <img
            src="src/ฟักทอง.jpg"
            alt="ฟักทอง"
            className={`small-image ${animation === "pumpkin" ? "animate" : ""}`}
          />
          <button onClick={() => increaseLevel(10, "pumpkin")}>
            ฟักทอง (10)
          </button>
        </div>
        <div
          className="image-button-container"
          draggable
          onDragStart={(e) => handleDragStart(e, "grass")}
        >
          <img
            src="src/หญ้า.jpg"
            alt="หญ้า"
            className={`small-image ${animation === "grass" ? "animate" : ""}`}
          />
          <button onClick={() => increaseLevel(20, "grass")}>
            หญ้า (20)
          </button>
        </div>
      </div>

      <button className="reset-button" onClick={resetLevel}>
        เริ่มต้นใหม่
      </button>

      <div className="footer">
        คลิกหรือลากอาหารไปให้ฮิปโป
      </div>
    </div>
  );
}
