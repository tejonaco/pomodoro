import { ChangeEvent, StateUpdater } from "preact/compat"
import { settings, saveConfig, PomodoroSettings } from "../Settings"
import * as icons from '../Icons'

type NumericInputData = {
  label: string,
  value: number,
  onChange: (value: number) => void,
  isInt?: boolean
}

function NumericInput({label, value, onChange, isInt=false}: NumericInputData) {
  return(
    <label className='text-slate-300 flex flex-col items-center gap-1 mb-2 justify-center'>
      {label}
      <input
        type='number'
        value={value}
        step={isInt? 1: 0.01}
        className=' appearance-none bg-slate-600 text-slate-300 rounded-md py-[2px] px-2 w-12 text-center '
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const textValue = (e.target as HTMLInputElement).value
          const inputValue = Number(textValue)
          onChange(inputValue)
        }}/>
  </label>
  )
}


export default function SettingsPage({setShowSettings}: {setShowSettings: StateUpdater<boolean>}) {
  const formData: PomodoroSettings = Object.assign({}, settings)

  return (
    <div className='flex items-center justify-center p-2'>
      <form className='text-slate-400 p-2 flex flex-col items-center w-56'
      onSubmit={async(e) => {
        e.preventDefault()
        await saveConfig(formData)
        setShowSettings(false)
      }}>
          <NumericInput label="Working time" value={formData.workingTime} onChange={(v) => formData.workingTime = v}/>
          <NumericInput label="Short break time" value={formData.shortBreakTime} onChange={(v) => formData.shortBreakTime = v}/>
          <NumericInput label="Long break time" value={formData.longBreakTime} onChange={(v) => formData.longBreakTime = v}/>
          <NumericInput label="Rounds" value={formData.rounds} onChange={(v) => formData.rounds = v} isInt={true}/>
          <label className='text-slate-300 flex flex-col items-center gap-1 mb-2 justify-center'>
            Auto-start timer
            <input type='checkbox'
              className='w-6 h-6'
              checked={formData.autoStartRound}
                  onChange={e => formData.autoStartRound = (e.target as HTMLInputElement).checked}/>
          </label>

          <div className='mt-2 flex justify-center gap-1 w-full'>
            <button className='flex justify-center bg-slate-600 hover:bg-slate-500 hover:text-green-400 text-green-500 stroke-[2px] w-12 h-12 rounded-lg items-center'>
              {icons.ok}
            </button>
            <button type='' className='flex justify-center bg-slate-600 hover:bg-slate-500 hover:text-red-400 text-red-500 stroke-[2px] w-12 h-12 rounded-lg items-center'
            onClick={() => setShowSettings(false)}
            >
              {icons.close}
            </button>
          </div>
      </form>
    </div>
  )
}