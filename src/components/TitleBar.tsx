import { appWindow } from "@tauri-apps/api/window";
import * as icons from "../Icons"


function TitleBar() {
  return (
    <div className='flex text-white h-12 justify-between px-2 pt-1 items-center relative' data-tauri-drag-region={true} onDragStart={appWindow.startDragging}>
        <button className='hover:text-green-400'>
          {icons.menu}
        </button>
        <h1 className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-400' data-tauri-drag-region={true} onDragStart={appWindow.startDragging}>
        Pomodoro
      </h1>
        <div className='flex w-14 justify-between'>
          <button onClick={appWindow.hide} className='hover:text-green-400'>
            {icons.minimize}
          </button>
          <button onClick={appWindow.close} className='hover:text-red-500'>
            {icons.close}
          </button>
        </div>
    </div>
  )
}


export default TitleBar;