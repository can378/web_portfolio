import { useEffect, useRef, useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./GameLibrary.module.css";
import gameConfig from "../data/gameLibrary";

const LIB = gameConfig.gameLibraryData; // { favorite: [...], yet: [...], default: [...] }
const DIRS = Object.keys(LIB); // ["favorite","yet","default"]

export default function GameLibrary({ title, onClose, defaultPosition,onMinimize,  initialIsMaximized,  onMaximizedChange,onDragEnd }) {
  const [path, setPath] = useState([]);
  const [lines, setLines] = useState([
    "Welcome to my real Steam Game Library\n(type 'help' for commands)\n...",
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [lines]);

  const cwd = () => (path.length ? `/${path.join("/")}` : "");
  const isRoot = path.length === 0;

  // 경로 해석기 (상대/절대, .. 지원)
  const resolvePath = (arg) => {
    if (!arg || arg === ".") return [...path];
    let next = arg.startsWith("/") ? [] : [...path];
    for (const seg of arg.split("/")) {
      if (seg === "" || seg === ".") continue;
      if (seg === "..") { next.pop(); continue; }
      next.push(seg);
    }
    return next;
  };

  const existsDir = (pArr) =>
    pArr.length === 0 || (pArr.length === 1 && DIRS.includes(pArr[0]));

  const run = (cmdLine) => {
    const [raw, ...rest] = cmdLine.trim().split(/\s+/);
    const cmd = (raw || "").toLowerCase();
    const arg = rest.join(" ");

    if (!cmd) return;

    const print = (out) =>
      setLines((prev) => [...prev, `${prompt()} ${cmdLine}`, ...(Array.isArray(out) ? out : [out])]);

    const prompt = () => `C:/game-library${cwd()}>`;

    switch (cmd) {
      case "help":
        print([
          "Commands:",
          "  ls                - list directory",
          "  cd <dir|..|/>     - change directory (favoriteGames|backlog|defaultGames)",
          "  pwd               - show current path",
          "  clear             - clear screen",
          "  help              - show help",
        ]);
        break;

      case "pwd":
        print(`/game-library${cwd()}`);
        break;

      case "clear":
        setLines([]);
        break;

      case "ls": {
        if (isRoot) {
          print(DIRS);
        } else {
          const dir = path[0];
          print(LIB[dir] ?? []);
        }
        break;
      }

      case "cd": {
        const target = resolvePath(arg || "/");
        if (!existsDir(target)) {
          print(`The system cannot find the path specified: ${arg || "/"}`);
        } else {
          setPath(target);
          // cd 후에는 자동으로 ls 한번 보여주고 싶다면 아래 한 줄 주석 해제
          // setTimeout(() => run("ls"), 0);
          setLines((prev) => [...prev, `${prompt()} ${cmdLine}`]);
        }
        break;
      }

      default:
        print(`'${cmd}' is not recognized as a command. Try 'help'.`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    run(v);
    setHistory((h) => [v, ...h]);
    setHistIdx(-1);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next]) { setHistIdx(next); setInput(history[next]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  return (
    <ModalWindow 
      title={title} 
      onClose={onClose} 
      onMinimize={onMinimize}
      defaultPosition={defaultPosition || { x: 30, y: 30 }}
      defaultSize={{ width: 820, height: 520 }}
      onDragEnd={onDragEnd}
      initialIsMaximized={initialIsMaximized}
      onMaximizedChange={onMaximizedChange}
    >
      <div className={styles.container}>
        <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
          <div className={styles.output} ref={scrollRef}>
            {lines.map((line, i) => {
                // "프롬프트 + 명령어" 라인은 따로 스타일링
                if (line.startsWith("C:/")) {
                const parts = line.split(" ");
                const prompt = parts[0];
                const command = parts.slice(1).join(" ");
                return (
                    <div key={i} className={styles.line}>
                    <span className={styles.prompt}>{prompt}</span>{" "}
                    <span className={styles.command}>{command}</span>
                    </div>
                );
                }
                return (
                <div key={i} className={styles.line}>
                    {line}
                </div>
                );
            })}
            <form className={styles.inputRow} onSubmit={onSubmit}>
                <span className={styles.prompt}>C:/game-library{cwd()}&gt;</span>
                <input
                ref={inputRef}
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck={false}
                />
            </form>
            </div>

        </div>
      </div>
    </ModalWindow>
  );
}
