import { useState, useRef, useMemo, useEffect } from "react";
import ModalWindow from "./ModalWindow";
import styles from "./Image.module.css";

export default function ImageViewer({ title, imageUrl, onClose, onMinimize }) {
  const [zoom, setZoom] = useState(1);          // 1 = 100%
  const [rotate, setRotate] = useState(0);      // deg
  const [flip, setFlip] = useState(false);      // horizontal flip
  const [natural, setNatural] = useState({ w: 0, h: 0 });

  const imgRef = useRef(null);
  const viewportRef = useRef(null);
  const zoomPct = useMemo(() => Math.round(zoom * 100), [zoom]);
  const [autoFitDone, setAutoFitDone] = useState(false);

  const handleZoomIn  = () => setZoom((z) => Math.min(z * 1.2, 10));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.2, 0.05));
  const handleReset   = () => { setZoom(1); setRotate(0); setFlip(false); };

  
  const actualSize = () => setZoom(1);

  const rotateLeft  = () => setRotate((r) => (r - 90) % 360);
  const rotateRight = () => setRotate((r) => (r + 90) % 360);
  const toggleFlip  = () => setFlip((f) => !f);

  const openNewTab = () => window.open(imageUrl, "_blank", "noopener,noreferrer");

  const fitToContainer = () => {
  const wrap = viewportRef.current;            // ✅ viewport를 기준으로 계산
  if (!wrap || !natural.w || !natural.h) return;
  const availW = wrap.clientWidth;
  const availH = wrap.clientHeight;
  const scale = Math.min(availW / natural.w, availH / natural.h);
  setZoom(Math.max(Math.min(scale, 10), 0.05));
};

const onImgLoad = (e) => {
  const { naturalWidth, naturalHeight } = e.currentTarget;   // ✅ fix
  setNatural({ w: naturalWidth, h: naturalHeight });
};
const [displayScale, setDisplayScale] = useState(1);
  useEffect(() => {
    if (natural.w && natural.h && !autoFitDone) {
        fitToContainer();        // 위에서 수정한 fitToContainer 사용
        setAutoFitDone(true);    // 사용자 조작을 덮어쓰지 않도록 한 번만
    }
        if (!imgRef.current || !natural.w) return;
        const rect = imgRef.current.getBoundingClientRect();
        setDisplayScale(rect.width / natural.w);
    }, [zoom, rotate, flip, natural]);

  return (
    <ModalWindow
      title={title}
      onClose={onClose}
      onMinimize={onMinimize}
      defaultPosition={{ x: 120, y: 160 }}
      defaultSize={{ width: 680, height: 520 }}
    >
      <div className={styles.container}>
        {/* 헤더 툴바 */}
        <div className={styles.toolbar} role="menubar" aria-label="Image toolbar">
          <div className={styles.group}>
            <button className={styles.btn} onClick={handleZoomOut} title="Zoom Out (-)">−</button>
            <button className={styles.btn} onClick={handleZoomIn}  title="Zoom In (+)">＋</button>
            <button className={styles.btn} onClick={actualSize} title="Actual Size (100%)">100%</button>
          </div>
          |
          <div className={styles.group}>
            <button className={styles.btn} onClick={rotateLeft}  title="Rotate Left">⟲</button>
            <button className={styles.btn} onClick={rotateRight} title="Rotate Right">⟳</button>
            <button className={styles.btn} onClick={toggleFlip}  title="Flip Horizontal">⇋</button>
          </div>
          |
          <div className={styles.group}>
            <a className={styles.btn} href={imageUrl} download title="Download">⬇</a>
            <button className={styles.btn} onClick={openNewTab} title="Open in New Tab">⤴</button>
            <button className={styles.btn} onClick={handleReset} title="Reset">Reset</button>
          </div>
        </div>

        {/* 본문 뷰포트: 내부 스크롤/패닝 영역 */}
        <div className={styles.viewport} ref={viewportRef}>

                <img
                ref={imgRef}
                src={imageUrl}
                alt={title}
                className={styles.image}
                style={{
                transform: `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg) scale(${zoom})`,
                transformOrigin: "center center", // 확대 기준
                }}
                onLoad={(e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget;
                setNatural({ w: naturalWidth, h: naturalHeight });
                }}
                draggable={false}
                />

        </div>

        {/* 푸터 상태바 */}
        <div className={styles.statusbar}>

          <span>disp×{displayScale.toFixed(2)}</span>
          <span className={styles.mono}>{natural.w}×{natural.h}px</span>
          <span className={styles.sep}>|</span>
          <span>{zoomPct}%</span>
          <span className={styles.sep}>|</span>
          <span>{rotate}°{flip ? " · Flipped" : ""}</span>
        </div>
      </div>
    </ModalWindow>
  );
}
