// import { useState } from "preact/hooks";
// import { invoke } from "@tauri-apps/api/tauri";
import TitleBar from "./components/TitleBar"

function App() {
  const remainingTime = '25:00'

  return(
    <div className='bg-slate-800 flex w-full h-screen flex-col rounded-2xl border-slate-700 border-[1px]'>
      <TitleBar/>
      <div className='flex justify-center content-start flex-grow font-light'>
        <svg viewBox="0 0 100 100" className="w-56 h-56 mt-10">
          <g className="text-white flex items-center justify-center">
            <circle
              className="stroke-red-500 stroke-[4px] fill-none"
              cx="50"
              cy="50"
              r="45"
            />
            <text x="50" y="55" text-anchor="middle" fill='white' fontSize="15">
              {remainingTime}
            </text>
          </g>
        </svg>
      </div>
    </div>
    )
}

export default App;
