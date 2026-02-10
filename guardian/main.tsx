import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    console.log("[PWA] 새 버전이 उपलब्ध합니다. 새로고침 시 업데이트가 적용됩니다.");
  },
  onOfflineReady() {
    console.log("[PWA] 오프라인에서 사용할 준비가 완료되었습니다.");
  },
});

createRoot(document.getElementById("root")!).render(<App />);
