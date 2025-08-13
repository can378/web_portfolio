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
  const pointerPos = useRef({ x: 0, y: 0 });

  const chatRootRef = useRef(null); // (선택) ref로도 가능

  const ignoreIfInChat = (e) => {
    const el = e.target;
    // .no-toggle 조상 요소가 있으면 토글 무시
    return el.closest && el.closest(".no-toggle");
  };

  const handlePointerDown = (e) => {
    if (!e.isPrimary) return;
    if (ignoreIfInChat(e)) return;         // ← 채팅 클릭이면 무시
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    if (!e.isPrimary) return;
    if (ignoreIfInChat(e)) return;         // ← 채팅 클릭이면 무시
    const dx = e.clientX - mouseDownPos.current.x;
    const dy = e.clientY - mouseDownPos.current.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 5 && !isDragging) {
      setShowChat((prev) => !prev);
    }
  };


  // 👉 포인터(마우스/터치/펜) 위치 추적
  useEffect(() => {
    const onPointerMove = (e) => {
      if (!e.isPrimary) return;
      pointerPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  // 👉 강아지 자동 이동
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDragging || showChat) return;

      const dx = pointerPos.current.x - dogPosition.x;
      const dy = pointerPos.current.y - dogPosition.y;
      const distance = Math.hypot(dx, dy);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dogPosition, isDragging, showChat]);

  const dogImageFile =
    isDragging ? dogImages.hanging : dogImages[currentStatus] || dogImages.sitting;
  const imageSrc = dogImgBaseUrl + dogImageFile;

  return (
    <Draggable
      nodeRef={nodeRef}
      position={dogPosition}
      cancel=".no-drag"
      onStart={(e) => {
        // 입력 요소 드래그 방지
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
          touchAction: "none", // ← 모바일 스크롤 제스처에 뺏기지 않게
        }}
      >
        <div
          style={{ position: "relative" }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
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
              touchAction: "none", // ← 이미지 자체도 터치 제스처 비활성화
            }}
            draggable={false}
          />
          {showChat && (
            <div
              className="no-drag no-toggle"                 // ← 드래그/토글 제외 마커
              onPointerDown={(e) => e.stopPropagation()}    // ← 상위로 이벤트 안 올림
              onPointerUp={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                bottom: `${size + 10}px`,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10000,            // ← 강아지보다 위
                touchAction: "auto",
              }}
            >
              <AssistantDogChat onClose={() => setShowChat(false)} />
            </div>
          )}

        </div>
      </div>
    </Draggable>
  );
};

export default AssistantDog;
