// components/AssistantDog.jsx
import { useCallback, useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Draggable from "react-draggable";
import AssistantDogChat from "./AssistantDogChat";

const dogImgBaseUrl = "/web_portfolio/assets/image/dog/";

const dogImages = {
  sitting: "dog_idle.png",   // 기본(서 있는 포즈)
  hanging: "dog_dangle.png", // 매달린 포즈
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
  const [lastFacing, setLastFacing] = useState("right"); // 'left' | 'right'

  const flipScale = lastFacing === "left" ? 1 : -1;

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

      if (distance > 50) {
        const stepSize = 5;
        const angle = Math.atan2(dy, dx);
        const nextX = dogPosition.x + Math.cos(angle) * stepSize;
        const nextY = dogPosition.y + Math.sin(angle) * stepSize;

        // ★ 방향 갱신: 수평 변화량만 기준, 너무 작으면(=수직이동) 갱신 안 함
        const deltaX = nextX - dogPosition.x;
        if (Math.abs(deltaX) > 0.5) {
          setLastFacing(deltaX > 0 ? "right" : "left");
        }

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


  const DogGoHome = useCallback(() => {
    if (!houseRef?.current?.getAnchor) return false; // 안전장치
    setShowChat(false);
    setInHouse(true);
    const anchor = houseRef.current.getAnchor();
    setDogPosition((_) => clampPosition(anchor.x, anchor.y, size)); // ✅ 클램프
    setCurrentStatus("sitting");
    onEnterHouse && onEnterHouse(true);
    return true;
  }, [houseRef, onEnterHouse, size, clampPosition]);
  
  useImperativeHandle(
    ref,
    () => ({
      // 집 앞으로 나오기
      comeOutAt: (pos) => {
        setInHouse(false);
        setDogPosition(clampPosition(pos.x, pos.y, size));
        setCurrentStatus("sitting");
      },

      // 지금 집 안인지?
      isInHouse: () => inHouse,

      // 집으로 바로 들어가기
      goHome: () => {
        return DogGoHome(); // ✅ 반환값 그대로 전달
      },

      // 상태 강제 전환
      setStatus: (s) => setCurrentStatus(s),

      // 채팅 토글
      toggleChat: () => setShowChat((v) => !v),
    }),
    [inHouse, size, DogGoHome] // ✅ 함수 참조 넣기
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
      DogGoHome()
    }
  };

  

  // 스프라이트 정보(걷기)
  const WALK_DIR = "walk/";
  const WALK_FRAMES = 8;// 프레임 개수와 파일명 자릿수
  const WALK_PAD = 2; // 2 → 01.png 형식
  const WALK_FPS = 12; // 1초에 12프레임 (원하면 조정)
  function num(n, pad) {
    return String(n).padStart(pad, "0");
  }
  const [walkFrameIndex, setWalkFrameIndex] = useState(0);
  const walkImagesRef = useRef([]);

  // 걷기 프레임 프리로드 (마운트 시 1회)
  useEffect(() => {
    const imgs = [];
    for (let i = 1; i <= WALK_FRAMES; i++) {
      const img = new Image();
      img.src = `${dogImgBaseUrl}${WALK_DIR}${num(i, WALK_PAD)}.png`;
      imgs.push(img);
    }
    walkImagesRef.current = imgs;
  }, []);

  useEffect(() => {
    // 조건: 걷는 중이고, 드래그/채팅/집 안 아님
    const walkingNow = currentStatus === "walking" && !isDragging && !showChat && !inHouse;
    if (!walkingNow) return;

    const interval = setInterval(() => {
      setWalkFrameIndex((i) => (i + 1) % WALK_FRAMES);
    }, 1000 / WALK_FPS);

    return () => clearInterval(interval);
  }, [currentStatus, isDragging, showChat, inHouse]);


  useEffect(() => {
    if (currentStatus !== "walking") setWalkFrameIndex(0);
  }, [currentStatus]);



  return (
    <Draggable
      nodeRef={nodeRef}
      position={dogPosition}
      bounds={bounds}
      cancel=".no-drag"
      onStart={(e) => {
        if (["BUTTON", "INPUT", "TEXTAREA"].includes(e.target.tagName)) return false;
      }}
      onDrag={(e, data) => {
        const next = clampPosition(data.x, data.y, size);
        setDogPosition(next);
        if (!isDragging && (Math.abs(data.deltaX) > 2 || Math.abs(data.deltaY) > 2)) {
          setIsDragging(true);
        }
      }}
      onStop={handleDragStop}
    >
      <div ref={nodeRef} style={{ position: "fixed", zIndex: 9999, touchAction: "none" }}>
        <div
          style={{ position: "relative" }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {!inHouse && (
            <>
              {(!isDragging && currentStatus === "walking") ? (
                <img
                  src={
                    walkImagesRef.current[walkFrameIndex]?.src
                    ?? `${dogImgBaseUrl}${WALK_DIR}${num((walkFrameIndex % WALK_FRAMES) + 1, WALK_PAD)}.png`
                  }
                  alt="Assistant Dog - walking"
                  style={{
                    width: `${size}px`,
                    height: "auto",
                    userSelect: "none",
                    pointerEvents: "auto",
                    cursor: "grab",
                    touchAction: "none",
                    transform: `scaleX(${flipScale})`, // ★ 좌우 반전
                    transformOrigin: "center",
                  }}
                  draggable={false}
                />
              ) : (
                <img
                  ref={imgRef}
                  src={imageSrc} // idle/dangle
                  alt={`Assistant Dog - ${isDragging ? "hanging" : currentStatus}`}
                  style={{
                    width: `${size}px`,
                    height: "auto",
                    userSelect: "none",
                    pointerEvents: "auto",
                    cursor: "grab",
                    touchAction: "none",
                    transform: `scaleX(${flipScale})`, // ★ 최근 방향 유지
                    transformOrigin: "center",
                  }}
                  draggable={false}
                />
              )}

            </>
          )}


          {showChat && (
            <div
              className="no-drag no-toggle"
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                bottom: `${size + 30}px`,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10000,
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
