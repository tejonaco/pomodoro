import { appWindow } from "@tauri-apps/api/window";


function TitleBar() {
  return (
    <div className='flex text-white h-12 justify-between px-2 pt-1 items-center relative' data-tauri-drag-region={true} onDragStart={appWindow.startDragging}>
        <button className='hover:text-green-400'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <h1 className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-400' data-tauri-drag-region={true} onDragStart={appWindow.startDragging}>
        Pomodoro
      </h1>
        <div className='flex w-14 justify-between'>
          <button onClick={appWindow.minimize} className='hover:text-green-400'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
          <button onClick={appWindow.close} className='hover:text-red-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
    </div>
  )
}


export default TitleBar;