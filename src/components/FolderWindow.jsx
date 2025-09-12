import iconMap from "../data/IconData";
import ModalWindow from "./ModalWindow";
import Icon from "./Icon";
import styles from "./FolderWindow.module.css";

export default function FolderWindow({
  folderId,
  iconSrc,
  onClose,
  onOpen,
  defaultPosition,
  defaultSize,
  onMinimize,
}) {
  const folder = iconMap.get(folderId);
  if (!folder) return null;

  return (
    <ModalWindow
      title={folder.name}
      iconSrc={iconSrc}
      onClose={onClose}
      onMinimize={onMinimize}
      defaultPosition={defaultPosition}
      defaultSize={defaultSize}
    >
      <div className={styles.frame}>
        {/* --- 헤더 영역 --- */}
        <div>
          <div className={styles.menubar}>
            <span>File</span><span>Edit</span><span>View</span>
            <span>Favorites</span><span>Tools</span><span>Help</span>
          </div>

          <div className={styles.toolbar}>
            <img
              className={styles.toolbarDesktop}
              src="/web_portfolio/assets/image/etc/toolbar.svg"
            />
            <img
              className={styles.toolbarMobile}
              src="/web_portfolio/assets/image/etc/toolbar_mobile.svg"
            />
          </div>


          <div className={styles.addressRow}>
            <div className={styles.addressLabel}>Address</div>
            <input className={styles.addressInput} placeholder="C:\\" />
             
            <div className={styles.goBtn}>
                <img
                    className={styles.returnIcon}
                    src="/web_portfolio/assets/image/etc/return.png"
                    alt="return"
                />
                Go
            </div>

          </div>
        </div>

        {/* --- 콘텐츠 영역 --- */}
        <div className={styles.content}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {folder.childIds?.map((childId) => {
              const child = iconMap.get(childId);
              if (!child) return null;
              return (
                <Icon
                  key={child.id}
                  icon={child.icon}
                  label={child.name}
                  onClick={() => onOpen(child.id)}
                  fixed
                />
              );
            })}
          </div>
        </div>

        {/* --- 푸터(상태바) --- */}
        <div className={styles.statusbar}>
          <span>{folder.childIds?.length ?? 0} objects</span>
          <span className={styles.ready}>Ready</span>
        </div>
      </div>
    </ModalWindow>
  );
}
