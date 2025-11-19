import iconMap from "../data/IconData";
import Icon from "../components/Icon";
import Taskbar from "../components/footer/Taskbar";
import styles from "./Desktop.module.css";
import AssistantDog from "../components/assistant/AssistantDog";
import DogHouse from "../components/assistant/DogHouse";
import { useRef, useState, useEffect } from "react";


// ✅ 처음에 자동으로 열릴 창 + 위치까지 한 번에 정의
const INITIAL_WINDOWS = [
  { id: 1001, x: 40,  y: 40 },   // Projects
  { id: 1002, x: 380, y: 600 },   // Welcome
  { id: 102,  x: 120, y: 460 },  // Introduction
];


// ✅ 초기 창 목록 생성 유틸 (link/pdf 제외)
function buildInitialWindows() {
  const list = [];
  let z = 1;

  for (const { id, x, y } of INITIAL_WINDOWS) {
    const icon = iconMap.get(id);
    if (!icon) continue;
    if (icon.type === "link" || icon.type === "pdf") continue;

    list.push({
      id,
      type: icon.type,
      isVisible: true,
      isMaximized: false,
      zIndex: z++,
      title: icon.name,
      x,
      y,
    });
  }

  return list;
}


export default function Desktop() {
  // ✅ localStorage에서 상태 복원 또는 초기값 사용
  const initialWindows = buildInitialWindows();

  const [openWindows, setOpenWindows] = useState(() => {
    const saved = localStorage.getItem("openWindows");
    if (!saved) return initialWindows;

    try {
      const parsed = JSON.parse(saved);
      return parsed.map((w, idx) => ({
        ...w,
        x: typeof w.x === "number" ? w.x : 80 + idx * 30,
        y: typeof w.y === "number" ? w.y : 60 + idx * 30,
        isMaximized: typeof w.isMaximized === "boolean" ? w.isMaximized : false,
      }));
    } catch {
      return initialWindows;
    }
  });

  const [zCounter, setZCounter] = useState(() => {
    const saved = localStorage.getItem("zCounter");
    return saved ? JSON.parse(saved) : initialWindows.length + 1;
  });
  const [dogInHouse, setDogInHouse] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("assistant_dog_in_house") === "true";
  });

  const houseRef = useRef(null);
  const dogRef = useRef(null);

  // ✅ 상태 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("openWindows", JSON.stringify(openWindows));
  }, [openWindows]);

  useEffect(() => {
    localStorage.setItem("zCounter", JSON.stringify(zCounter));
  }, [zCounter]);

  const handleHouseClick = () => {
    if (dogInHouse && houseRef.current && dogRef.current?.comeOutAt) {
      const anchor = houseRef.current.getAnchor();
      dogRef.current.comeOutAt({ x: anchor.x, y: anchor.y - 10 });
      setDogInHouse(false);
    }else if(!dogInHouse&& houseRef.current&& dogRef.current?.goHome){
      dogRef.current.goHome();
    }
  };

  const bringToFront = (id) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: zCounter } : w))
    );
    setZCounter((z) => z + 1);
  };

  const openWindow = (id) => {
    const icon = iconMap.get(id);
    if (!icon) return;

    if (icon.type === "link" && icon.url) {
      window.open(icon.url, "_blank");
      return;
    }

    if (icon.type === "pdf" && icon.filepath) {
      const link = document.createElement("a");
      link.href = icon.filepath;
      link.download = "yunji_cv.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    setOpenWindows((prev) => {
      const exists = prev.find((w) => w.id === id);
      if (exists) {
        // 최소화 복원 + 맨 앞으로
        const next = prev.map((w) =>
          w.id === id ? { ...w, isVisible: true, zIndex: zCounter } : w
        );
        // zCounter는 아래에서 증가
        return next;
      }
      const offset = prev.length; 
      const next = [
        ...prev,
        {
          id,
          type: icon.type,
          isVisible: true,
          isMaximized: false,
          zIndex: zCounter,
          title: icon.name,
          x: 80 + offset * 30,   // ★ 새 창 X
          y: 60 + offset * 30,   // ★ 새 창 Y
        },
      ];
      return next;
    });
    setZCounter((z) => z + 1);
  };

  const closeWindow = (id) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isVisible: false } : w))
    );
  };

  const setWindowMaximized = (id, value) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: value } : w))
    );
  };

  const toggleWindow = (id) => {
    setOpenWindows((prev) => {
      const win = prev.find((w) => w.id === id);
      if (!win) return prev;
      if (!win.isVisible) {
        // 복원 + 맨 앞으로
        const next = prev.map((w) =>
          w.id === id ? { ...w, isVisible: true, zIndex: zCounter } : w
        );
        // zCounter는 아래에서 증가
        setZCounter((z) => z + 1);
        return next;
      } else {
        // 최소화
        return prev.map((w) =>
          w.id === id ? { ...w, isVisible: false } : w
        );
      }
    });
  };
   // 드래그 종료 시 위치 저장
  const updateWindowPosition = (id, x, y) => {
      setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  };

  return (
    <div className={styles.desktopContainer}>
      <div className={styles.desktop}>
        {/* 바탕화면 아이콘 */}
        <div className={styles.desktopIcons}>
          {[...iconMap.values()]
            .filter((icon) => icon.path === "desktop")
            .map((icon) => (
              <Icon
                key={icon.id}
                icon={icon.icon}
                label={icon.name}
                onClick={() => openWindow(icon.id)}
                fixed={icon.fixed}
              />
            ))}
        </div>

        {/* 열린 창들 */}
        {openWindows.map(({ id, isVisible, zIndex, x, y, isMaximized }) => {
          const icon = iconMap.get(id);
          if (!icon?.component || !isVisible) return null;
          const Component = icon.component;

          return (
            <div
              key={id}
              style={{ position: "absolute", zIndex }}
              onMouseDown={() => bringToFront(id)}
            >
              <Component
                {...icon.props}
                onClose={() => closeWindow(id)}
                onMinimize={() => minimizeWindow(id)}
                defaultPosition={{ x, y }}
                onDragEnd={(pos) => updateWindowPosition(id, pos.x, pos.y)}
                onOpen={openWindow}
                initialIsMaximized={isMaximized}
                onMaximizedChange={(val) => setWindowMaximized(id, val)}
              />
            </div>
          );
        })}
      </div>

      {/* 개집 */}
      <DogHouse
        ref={houseRef}
        src="/web_portfolio/assets/dog_house.svg"
        occupied={dogInHouse}
        onClick={handleHouseClick}
      />

      {/* Assistant AI Agent Dog */}
      <AssistantDog
        ref={dogRef}
        status="sitting"
        houseRef={houseRef}
        onEnterHouse={() => setDogInHouse(true)}
      />

      {/* 작업표시줄 */}
      <Taskbar openWindows={openWindows} toggleWindow={toggleWindow} />
    </div>
  );
}
