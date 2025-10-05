import iconMap from "../data/IconData";
import Icon from "../components/Icon";
import Taskbar from "../components/footer/Taskbar";
import styles from "./Desktop.module.css";
import AssistantDog from "../components/assistant/AssistantDog";
import DogHouse from "../components/assistant/DogHouse";
import { useRef, useState } from "react";

// ✅ 처음에 자동으로 열고 싶은 아이디들
const INITIAL_OPEN_IDS = [1001, 1002,102];

// ✅ 초기 창 목록 생성 유틸 (link/pdf 제외)
function buildInitialWindows() {
  const list = [];
  let z = 1;
  for (const id of INITIAL_OPEN_IDS) {
    const icon = iconMap.get(id);
    if (!icon) continue;
    if (icon.type === "link" || icon.type === "pdf") continue; // 다운로드/외부링크는 창이 아님
    list.push({
      id,
      type: icon.type,
      isVisible: true,
      zIndex: z++,
      title: icon.name,
    });
  }
  return list;
}

export default function Desktop() {
  // ✅ 초기 진입 시 지정한 창들이 열린 상태
  const initialWindows = buildInitialWindows();
  const [openWindows, setOpenWindows] = useState(initialWindows);
  const [zCounter, setZCounter] = useState(initialWindows.length + 1);
  const [dogInHouse, setDogInHouse] = useState(false);
  const houseRef = useRef(null);
  const dogRef = useRef(null);

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
      const next = [
        ...prev,
        {
          id,
          type: icon.type,
          isVisible: true,
          zIndex: zCounter,
          title: icon.name,
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
        {openWindows.map(({ id, isVisible, zIndex }) => {
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
                onOpen={openWindow}
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
