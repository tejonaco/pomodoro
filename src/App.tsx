import { useEffect, useState } from "preact/hooks";
import TitleBar from "./components/TitleBar"
import TimerPage from "./pages/TimerPage";
import SettingsPage from "./pages/SettingsPage";
import { readSettings, setSettings, settings } from "./Settings";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import tauriConfig from "../src-tauri/tauri.conf.json"



function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [key, setKey] = useState(0)
  const [miniMode, setMiniMode] = useState(false)

  useEffect(()=>{
    readSettings().then(jsonSettings => {
    setSettings({...settings, ...jsonSettings})
    setKey(1) //force render when settings
    })
    }, [])

    useEffect(()=>{
      if (miniMode && !showSettings) {
        appWindow.setSize(new LogicalSize(200, 200))
      } else {
        const defaultWindowConfig = tauriConfig.tauri.windows[0]
        appWindow.setSize(new LogicalSize(defaultWindowConfig.width, defaultWindowConfig.height))
      }
    }, [miniMode, showSettings])

  return (
    <div key={key} className='bg-slate-800 flex w-full h-screen flex-col rounded-2xl border-slate-700 border-[1px]'>
      <TitleBar showSettings={showSettings} setShowSettings={setShowSettings} miniMode={miniMode} setMiniMode={setMiniMode}/>
      {showSettings? <SettingsPage setShowSettings={setShowSettings}/>: <></>}
      <TimerPage showSettings={showSettings} miniMode={miniMode}/>
    </div>
  );
}

export default App;
