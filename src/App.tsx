import { useState } from "preact/hooks";
import TitleBar from "./components/TitleBar"
import TimerPage from "./pages/TimerPage";



function App() {
  const [showSettings, setShowShettings] = useState(false)

  return (
    <div className='bg-slate-800 flex w-full h-screen flex-col rounded-2xl border-slate-700 border-[1px]'>
      <TitleBar/>
      {showSettings? '': <TimerPage/>}
    </div>
  );
}

export default App;
