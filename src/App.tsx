import { useState, useRef } from "preact/hooks";
import TitleBar from "./components/TitleBar"
import * as icons from "./Icons"
import { sendNotification } from '@tauri-apps/api/notification';

const settings = {
  workingTime: 25 // minutes
}

function App() {
  let remainingTime = useRef(settings.workingTime * 60)
  const [timeDisplay, setTimeDisplay] = useState(Math.floor(remainingTime.current / 60) + ':' + (remainingTime.current % 60).toString().padStart(2, '0'))
  let timer = useRef(settings.workingTime * 60);
  const [timerButton, setTimerButton] = useState(icons.play)

  function updateTimer(time: number) {
    remainingTime.current = time
    setTimeDisplay(
      Math.floor(remainingTime.current / 60) + ':' + (remainingTime.current % 60).toString().padStart(2, '0')
    )

    if (remainingTime.current == 0) {
      clearInterval(timer.current)
      sendNotification({
        title: 'Pomodoro',
        body: 'Timer is done',
      })
      setTimerButton(icons.play)
    }
  }

  return(
    <div className='bg-slate-800 flex w-full h-screen flex-col rounded-2xl border-slate-700 border-[1px]'>
      <TitleBar/>
      <div className='flex flex-col grow'>
        <div className='flex justify-center content-start font-light'>
          <svg viewBox="0 0 100 100" className="w-56 h-56 mt-6">
            <g className="text-white flex items-center justify-center">
              <circle
                    className="stroke-slate-400 stroke-[0.5px] fill-none"
                    cx="50"
                    cy="50"
                    r="45"
                  />
              <circle
                className="stroke-red-500 stroke-[4px] fill-none"
                cx="50"
                cy="50"
                r="45"
                transform="rotate(-90)"
                transform-origin="50 50"
                stroke-linecap="round"
                stroke-dasharray={2 * Math.PI * 45} // 2 * pi * r 
                stroke-dashoffset={2 * Math.PI * 45 * (1 - remainingTime.current / (settings.workingTime * 60))}
              />
              <text x="50" y="55" text-anchor="middle" fill='white' font-size="20">
                {timeDisplay}
              </text>
              <text x="50" y="70" text-anchor="middle" fill='white' font-size="8">
                FOCUS
              </text>
            </g>
          </svg>
        </div>
        <div className='w-full flex justify-center mt-2'>
          <button className='w-20 stroke-slate-300 stroke-[0.5px] hover:stroke-green-500'
          onClick={() => {
            if (timerButton == icons.play) {
              setTimerButton(icons.pause)
              timer.current = setInterval(
                () => updateTimer( remainingTime.current - 1),
                1000
              )
            } else {
              clearInterval(timer.current)
              setTimerButton(icons.play)
            }
          }}
          >
            {timerButton}
          </button>
        </div>
        <div className='w-full flex justify-between grow items-end p-4 '>
          <button className=' text-slate-300 hover:text-green-500'
          onClick={()=>{
            updateTimer(settings.workingTime * 60)
            setTimerButton(icons.play)
            clearInterval(timer.current)
          }}
          >
            RESET
          </button>
        </div>

      </div>
    </div>
    )
}

export default App;
