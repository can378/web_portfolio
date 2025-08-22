// components/AssistantDog.jsx
import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Draggable from "react-draggable";
import AssistantDogChat from "./AssistantDogChat";

const dogImgBaseUrl = "/web_portfolio/assets/image/dog/";

const dogImages = {
  walking: "walk.png",
  sitting: "sit.png",
  hanging: "hanging.png",
  cute: "cute.png",
};

const AssistantDog = forwardRef(function AssistantDog(
  { status = "sitting", size = 50, houseRef, onEnterHouse },
  ref
) {
  const clampPosition = (x, y, size) => {
    const padding = 4; // 가장자리 살짝 띄우고 싶으면 조절
    const maxX = window.innerWidth - size - padding;
    const maxY = window.innerHeight - size - padding;
    const clampedX = Math.min(Math.max(padding, x), Math.max(padding, maxX));
    const clampedY = Math.min(Math.max(padding, y), Math.max(padding, maxY));
    return { x: clampedX, y: clampedY };
  };

  const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

  const nodeRef = useRef(null);
  const imgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [dogPosition, setDogPosition] = useState({ x: 200, y: 200 });
  const [inHouse, setInHouse] = useState(false); // ✅ 집 안 상태

  const mouseDownPos = useRef({ x: 0, y: 0 });
  const pointerPos = useRef({ x: 0, y: 0 });

  const ignoreIfInChat = (e) => {
    const el = e.target;
    // .no-toggle 조상 요소가 있으면 토글 무시
    return el.closest && el.closest(".no-toggle");
  };

  const handlePointerDown = (e) => {
    if (!e.isPrimary) return;
    if (ignoreIfInChat(e)) return; // 채팅 클릭이면 무시
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    if (!e.isPrimary) return;
    if (ignoreIfInChat(e)) return; // 채팅 클릭이면 무시
    const dx = e.clientX - mouseDownPos.current.x;
    const dy = e.clientY - mouseDownPos.current.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 5 && !isDragging && !inHouse) {
      // ✅ 집 안에 있을 땐 토글 금지
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

  // 👉 강아지 자동 이동 (집 안/드래그/채팅 중이면 정지)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDragging || showChat || inHouse) return;

      const dx = pointerPos.current.x - dogPosition.x;
      const dy = pointerPos.current.y - dogPosition.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 200) {
        const stepSize = 5;
        const angle = Math.atan2(dy, dx);
        const nextX = dogPosition.x + Math.cos(angle) * stepSize;
        const nextY = dogPosition.y + Math.sin(angle) * stepSize;
        const clamped = clampPosition(nextX, nextY, size);
        setDogPosition(clamped);
        setCurrentStatus("walking");
      } else if (currentStatus === "walking") {
        setCurrentStatus(status);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [dogPosition, isDragging, showChat, inHouse, currentStatus, status, size]);

  // 👉 창 크기 변화 대응 + bounds 계산
  useEffect(() => {
    const computeBounds = () => {
      const padding = 4;
      setBounds({
        left: padding,
        top: padding,
        right: window.innerWidth - size - padding,
        bottom: window.innerHeight - size - padding,
      });
      // 창 크기 바뀔 때 현재 위치도 화면 안으로 재클램프
      setDogPosition((pos) => clampPosition(pos.x, pos.y, size));
    };

    computeBounds();
    window.addEventListener("resize", computeBounds);
    return () => window.removeEventListener("resize", computeBounds);
  }, [size]);

  // ✅ 외부에서 “집 앞에 나와!” 호출용 API
  useImperativeHandle(
    ref,
    () => ({
      comeOutAt: (pos) => {
        setInHouse(false);
        setDogPosition(clampPosition(pos.x, pos.y, size));
        setCurrentStatus("sitting");
      },
      isInHouse: () => inHouse,
    }),
    [inHouse, size]
  );

  const dogImageFile =
    isDragging ? dogImages.hanging : dogImages[currentStatus] || dogImages.sitting;
  const imageSrc = dogImgBaseUrl + dogImageFile;

  // ✅ 드래그 종료 시 개집 드롭존 감지 → 집 안으로
  const handleDragStop = () => {
    setIsDragging(false);
    if (!houseRef?.current?.getDropZone) return;

    const zone = houseRef.current.getDropZone(); // DogHouse 설정값 사용
    const zx1 = zone.left, zy1 = zone.top;
    const zx2 = zone.left + zone.width, zy2 = zone.top + zone.height;

    // 강아지 박스(대략 size x size로 가정)
    const dx1 = dogPosition.x;
    const dy1 = dogPosition.y;
    const dx2 = dogPosition.x + size;
    const dy2 = dogPosition.y + size;

    const intersects = !(dx2 < zx1 || dx1 > zx2 || dy2 < zy1 || dy1 > zy2);

    if (intersects) {
      setShowChat(false);
      setInHouse(true);
      const anchor = houseRef.current.getAnchor();
      setDogPosition(anchor);
      setCurrentStatus("sitting");
      onEnterHouse && onEnterHouse(true);
    }
  };






  return (
    <Draggable
      nodeRef={nodeRef}
      position={dogPosition}
      bounds={bounds}
      cancel=".no-drag"
      onStart={(e) => {
        // 입력 요소 드래그 방지
        if (["BUTTON", "INPUT", "TEXTAREA"].includes(e.target.tagName)) return false;
      }}
      onDrag={(e, data) => {
        const next = clampPosition(data.x, data.y, size);
        setDogPosition(next);
        if (!isDragging && (Math.abs(data.deltaX) > 2 || Math.abs(data.deltaY) > 2)) {
          setIsDragging(true);
        }
      }}
      onStop={handleDragStop} // ✅ 드롭 처리 연결
    >
      <div
        ref={nodeRef}
        style={{
          position: "fixed",
          zIndex: 9999,
          touchAction: "none", // 모바일 스크롤 제스처에 뺏기지 않게
        }}
      >
        <div
          style={{ position: "relative" }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {/* ✅ 집 안이면 강아지 이미지는 숨김(개집 눈만 보이게) */}
          {!inHouse && (
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
                touchAction: "none", // 이미지 자체도 터치 제스처 비활성화
              }}
              draggable={false}
            />
          )}

          {showChat && (
            <div
              className="no-drag no-toggle" // 드래그/토글 제외 마커
              onPointerDown={(e) => e.stopPropagation()} // 상위로 이벤트 안 올림
              onPointerUp={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                bottom: `${size + 10}px`,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10000, // 강아지보다 위
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
});

export default AssistantDog;
