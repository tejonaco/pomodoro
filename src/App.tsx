import TitleBar from "./components/TitleBar"
import * as icons from "./Icons"
import { Timer, useTimer } from "./components/Timer";
import { settings } from "./Settings";

function App() {
  const { time, percentage, isActive, startTimer, pauseTimer, resetTimer } = useTimer(settings.workingTime * 60, 'Timer Done!');

  return (
    <div className='bg-slate-800 flex w-full h-screen flex-col rounded-2xl border-slate-700 border-[1px]'>
      <TitleBar/>
      <div className='flex flex-col grow'>
        <Timer time={time} percentage={percentage} mode='FOCUS'/>
        <div className='w-full flex justify-center mt-2'>
          <button 
            className='w-20 stroke-slate-300 stroke-[0.5px] hover:stroke-green-500'
            onClick={isActive ? pauseTimer : startTimer}
          >
            {isActive ? icons.pause : icons.play}
          </button>
        </div>
        <div className='w-full flex justify-between grow items-end p-4 '>
          <button 
            className='text-slate-300 hover:text-green-500'
            onClick={resetTimer}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
