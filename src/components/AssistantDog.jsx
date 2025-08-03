import { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import AssistantDogChat from "./AssistantDogChat";

const dogImgBaseUrl = "/web_portfolio/assets/image/dog/";

const dogImages = {
  walking: "walk.png",
  sitting: "sit.png",
  hanging: "hanging.png",
  cute: "cute.png",
};

const AssistantDog = ({ status = "sitting", size = 100 }) => {
  const nodeRef = useRef(null);
  const imgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [dogPosition, setDogPosition] = useState({ x: 200, y: 200 });
  const mouseDownPos = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e) => {
    const dx = e.clientX - mouseDownPos.current.x;
    const dy = e.clientY - mouseDownPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 5) {
      setShowChat((prev) => !prev);
    }
  };

  // 👉 마우스 위치 추적
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  // 👉 강아지 자동 이동
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDragging || showChat) return;

      const dx = mousePos.current.x - dogPosition.x;
      const dy = mousePos.current.y - dogPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 200) {
        const stepSize = 5;
        const angle = Math.atan2(dy, dx);
        const nextX = dogPosition.x + Math.cos(angle) * stepSize;
        const nextY = dogPosition.y + Math.sin(angle) * stepSize;
        setDogPosition({ x: nextX, y: nextY });
        setCurrentStatus("walking");
      } else if (currentStatus === "walking") {
        setCurrentStatus(status);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [dogPosition, isDragging, showChat]);

  const dogImageFile =
    isDragging ? dogImages.hanging : dogImages[currentStatus] || dogImages.sitting;
  const imageSrc = dogImgBaseUrl + dogImageFile;

  return (
    <Draggable
      nodeRef={nodeRef}
      position={dogPosition}
      onStart={(e) => {
        if (["BUTTON", "INPUT", "TEXTAREA"].includes(e.target.tagName)) return false;
      }}
      onDrag={(e, data) => {
        setDogPosition({ x: data.x, y: data.y });
        if (!isDragging && (Math.abs(data.deltaX) > 2 || Math.abs(data.deltaY) > 2)) {
          setIsDragging(true);
        }
      }}
      onStop={() => setIsDragging(false)}
    >
      <div
        ref={nodeRef}
        style={{
          position: "fixed",
          zIndex: 9999,
        }}
      >
        <div
          style={{ position: "relative" }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt={`Assistant Dog - ${isDragging ? "hanging" : currentStatus}`}
            style={{
              width: `${size}px`,
              height: "auto",
              userSelect: "none",
              pointerEvents: "auto",
              cursor: "grab",
            }}
            draggable={false}
          />
          {showChat && (
            <AssistantDogChat
              onClose={() => setShowChat(false)}
              style={{
                position: "absolute",
                top: `-${size * 1.2}px`,
                left: "0",
              }}
            />
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default AssistantDog;
