import { useState, useEffect, useRef, useCallback } from "preact/hooks";
import { sendNotification } from '@tauri-apps/api/notification';


export function useTimer(initialTime: number, endMessage: string) {
  const [time, setTime] = useState(initialTime);
  const [percentage, setPercentage] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef(0);
  const startTimeRef = useRef(0);

  const startTimer = useCallback(() => {
    setIsActive(true);
    startTimeRef.current = Date.now() - (initialTime - time) * 1000;
    countRef.current = setInterval(() => {
      let runningTime = (Date.now() - startTimeRef.current) / 1000
      setTime(initialTime - Math.floor(runningTime))
      setPercentage(runningTime / initialTime)
    }, 1000);
  }, [initialTime, time])

  const pauseTimer = useCallback(() => {
    clearInterval(countRef.current);
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(countRef.current);
    setIsActive(false);
    setTime(initialTime);
    setPercentage(0)
  }, [initialTime]);

  useEffect(() => {
    if (time <= 0 && isActive) {
      clearInterval(countRef.current);
      setIsActive(false);
      sendNotification({
        title: 'Pomodoro',
        body: endMessage
      })
    }
  }, [time]);

  useEffect(() => {
    return () => clearInterval(countRef.current);
  }, []);

  return { time, percentage, isActive, startTimer, pauseTimer, resetTimer };
}

type TimerInputs = {
  time: number
  percentage: number
  mode: string
} 

export function Timer({ time, percentage, mode = 'FOCUS' }: TimerInputs) {
  return (
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
            stroke-dasharray={2 * Math.PI * 45}
            stroke-dashoffset={2 * Math.PI * 45 * percentage}
          />
          <text x="50" y="55" text-anchor="middle" fill='white' font-size="20">
            {Math.floor(time / 60) + ':' + (time % 60).toString().padStart(2, '0')}
          </text>
          <text x="50" y="70" text-anchor="middle" fill='white' font-size="8">
            {mode}
          </text>
        </g>
      </svg>
    </div>
  )
}