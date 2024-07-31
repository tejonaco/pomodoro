import * as icons from "../Icons"
import { MiniTimer, Timer, useTimer } from "../components/Timer";
import { settings } from "../Settings";
import { sendNotification } from '@tauri-apps/api/notification';
import { useEffect, useState } from "preact/hooks";


function getInitialTime(timerMode: string): number{
  return {'FOCUS': settings.workingTime,
    'SHORT BREAK': settings.shortBreakTime,
    'LONG BREAK': settings.longBreakTime,
        }[timerMode] as number * 60
}

export default function TimerPage ({showSettings, miniMode}: {showSettings: boolean, miniMode: boolean}) {
  const [rounds, setRounds] = useState(1)
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
      if (rounds == settings.rounds){
        changeTimerMode('LONG BREAK')
        endMessage = 'Start a long break!'
      } else {
        changeTimerMode('SHORT BREAK')
        endMessage = 'Start a short break!'
      }
    }else{
      changeTimerMode('FOCUS')
      endMessage = 'Return to work!'
      if (rounds == settings.rounds) {
        setRounds(1)
      } else {
        setRounds(rounds + 1)
      }
    }

    sendNotification({
      title: 'Pomodoro',
      body: endMessage,
      sound: 'default'
    })
  }

  useEffect(()=>{
    resetTimer(getInitialTime(timerMode))
  }, [settings])

  const handleReset = () => {
    if (isActive){
      resetTimer()
    }else if (timerMode == 'FOCUS') {

      setRounds(Math.max(1, rounds - 1))
      resetTimer()
    }else{
      changeTimerMode('FOCUS')
    }
  }

  if (showSettings) return <></>

  if (miniMode) {
    return (
      <div className='flex'>
        <MiniTimer time={time} percentage={percentage} mode={timerMode} isActive={isActive}
        startTimer={startTimer} pauseTimer={pauseTimer} handleReset={handleReset} timerDone={timerDone} rounds={rounds} />
      </div>
    )
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
            onClick={handleReset}>
            RESET
          </button>
          <div className='flex flex-col'>
            <p>{rounds + '/'  + settings.rounds}</p>
            <button className='hover:text-green-400'
            onClick={()=> {
              timerDone();
              }}
            >
              {icons.skip}
            </button>
          </div>
        </div>
      </div>
  )


}