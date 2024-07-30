import { useState, useEffect, useRef, useCallback } from "preact/hooks";
import { invoke } from "@tauri-apps/api";

export function useTimer(startAt: number, timerDone: CallableFunction) {
  const initialTime = useRef(startAt)
  const time = useRef(startAt);
  const [displayTime, setDisplayTime] = useState(startAt)
  const [percentage, setPercentage] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef(0);
  const startTimeRef = useRef(0);

  const startTimer = useCallback(() => {
    setIsActive(true);
    startTimeRef.current = Date.now() - (initialTime.current - time.current) * 1000;
    countRef.current = setInterval(() => {
      let runningTime = (Date.now() - startTimeRef.current) / 1000
      time.current = initialTime.current - Math.floor(runningTime)
      setPercentage(runningTime / initialTime.current)
    }, 1000);
  }, [initialTime.current, time])

  const pauseTimer = useCallback(() => {
    clearInterval(countRef.current);
    setIsActive(false);
  }, [])

  const resetTimer = useCallback((timeUpdate=initialTime.current) => {
    clearInterval(countRef.current);
    setIsActive(false);
    initialTime.current = timeUpdate
    time.current = timeUpdate
    setDisplayTime(timeUpdate)
    setPercentage(0)
  }, [])

  useEffect(() => {
    setDisplayTime(time.current)
    if (isActive) {
      if (time.current <= 0) {
        clearInterval(countRef.current);
        setIsActive(false);
        timerDone()
      }
    }
  }, [time.current]);

  return { time: displayTime, percentage, isActive, startTimer, pauseTimer, resetTimer };
}


type TimerInputs = {
  time: number
  percentage: number
  mode: string
  isActive: boolean
} 

export function Timer({ time, percentage, mode = 'FOCUS', isActive = false}: TimerInputs) {
  const [key, setKey] = useState(0)

  useEffect(()=>{
    if (!isActive){
      setKey(key+1)
    }
  }, [time])

  useEffect(()=>{
    const status = isActive ?
          `<circle
          cx="50"
          cy="50"
          r="28"
          fill="none"
          stroke="${mode == 'FOCUS'? '#ef4444': '#22c55e'}"
          stroke-width="14"
          transform="rotate(-90)"
          transform-origin="50 50"
          stroke-dasharray="${2 * Math.PI * 28}"
          stroke-dashoffset="${2 * Math.PI * 28 * percentage}"
        />`:

        `<rect
          fill="${mode == 'FOCUS'? '#ef4444': '#22c55e'}"
          width="13"
          height="50"
          x="27"
          y="25" />
        <rect
          fill="${mode == 'FOCUS'? '#ef4444': '#22c55e'}"
          width="13"
          height="50"
          x="61"
          y="25" />`

    // generate tray icon svg from timer percentage
    const svg = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="#1e293b"
            />
            ${status}
        </svg>
    `

    invoke('set_tray_icon', {
      svg: svg
    })
  }, [time, isActive])

  return (
    <div key={key} className='flex justify-center content-start font-light'>
      <svg viewBox="0 0 100 100" className="w-56 h-56 mt-6">
        <g className="text-white flex items-center justify-center">
          <circle
            className="stroke-slate-400 stroke-[0.5px] fill-none"
            cx="50"
            cy="50"
            r="45"
          />
          <circle
            className={'stroke-[4px] fill-none ' + (mode == 'FOCUS'? 'stroke-red-500': 'stroke-green-500')}
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
            {Math.floor(time / 60) + ':' + Math.round(time % 60).toString().padStart(2, '0')}
          </text>
          <text x="50" y="70" text-anchor="middle" fill='white' font-size="8">
            {mode}
          </text>
        </g>
      </svg>
    </div>
  )
}