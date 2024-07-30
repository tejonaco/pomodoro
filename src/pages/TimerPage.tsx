import * as icons from "../Icons"
import { Timer, useTimer } from "../components/Timer";
import { settings } from "../Settings";
import { sendNotification } from '@tauri-apps/api/notification';
import { useRef, useState } from "preact/hooks";


function getInitialTime(timerMode: string): number{
  return {'FOCUS': settings.workingTime,
    'SHORT BREAK': settings.shortBreakTime,
    'LONG BREAK': settings.longBreakTime,
        }[timerMode] as number * 60
}

export default function TimerPage () {
  const rounds = useRef(1)
  const [timerMode, setTimerMode] = useState('FOCUS')
  let { time, percentage, isActive, startTimer, pauseTimer, resetTimer } = useTimer( getInitialTime(timerMode), timerDone);

  const changeTimerMode = (mode: string) => {
    setTimerMode(mode)
    resetTimer(getInitialTime(mode))
    if (isActive && settings.autoStartRound){
      startTimer()
    }
  }

  function timerDone () {
    let endMessage;
    if (timerMode == 'FOCUS'){
      if (rounds.current == settings.rounds){
        changeTimerMode('LONG BREAK')
        endMessage = 'Start a long break!'
      } else {
        changeTimerMode('SHORT BREAK')
        endMessage = 'Start a short break!'
      }
    }else{
      changeTimerMode('FOCUS')
      endMessage = 'Return to work!'
      if (rounds.current == settings.rounds) {
        rounds.current = 1
      } else {
        rounds.current++
      }
    }

    sendNotification({
      title: 'Pomodoro',
      body: endMessage,
      sound: 'default'
    })
  }

  return(
    <div className='flex flex-col grow'>
        <Timer time={time} percentage={percentage} mode={timerMode} isActive={isActive}/>
        <div className='w-full flex justify-center mt-2'>
          <button 
            className='w-20 stroke-slate-300 stroke-[0.5px] hover:stroke-green-400'
            onClick={isActive ? pauseTimer : startTimer}
          >
            {isActive ? icons.pause : icons.play}
          </button> 
        </div>
        <div className='text-slate-300 w-full flex justify-between items-end grow p-4 '>
          <button 
            className='hover:text-green-400'
            onClick={() => resetTimer()}>
            RESET
          </button>
          <div className='flex flex-col'>
            <p>{rounds.current + '/'  + settings.rounds}</p>
            <button className='hover:text-green-400'
            onClick={()=> {
              timerDone();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
  )
}