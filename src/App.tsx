import { useEffect, useState } from "preact/hooks";
import TitleBar from "./components/TitleBar"
import TimerPage from "./pages/TimerPage";
import SettingsPage from "./pages/SettingsPage";
import { readSettings, setSettings, settings } from "./Settings";



function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(()=>{
    readSettings().then(jsonSettings => {
    setSettings({...settings, ...jsonSettings})
    setKey(1) //force render when settings
    })
    }, [])

  return (
    <div key={key} className='bg-slate-800 flex w-full h-screen flex-col rounded-2xl border-slate-700 border-[1px]'>
      <TitleBar showSettings={showSettings} setShowSettings={setShowSettings}/>
      {showSettings? <SettingsPage setShowSettings={setShowSettings}/>: <TimerPage/>}
    </div>
  );
}

export default App;
