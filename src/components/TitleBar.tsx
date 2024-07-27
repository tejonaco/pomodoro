import { appWindow } from "@tauri-apps/api/window";


function TitleBar() {
  return (
    <div className='bg-slate-900 flex text-white h-10' data-tauri-drag-region={true} onDragStart={appWindow.startDragging}>
      <div className=' flex justify-between h-6 w-full mt-2 px-4' data-tauri-drag-region={true} onDragStart={appWindow.startDragging}>
        <div className='w-fit'>MENU</div>
        <h1 data-tauri-drag-region={true} onDragStart={appWindow.startDragging}>Pomotroid</h1>
        <div className='flex w-8 justify-between'>
          <button onClick={appWindow.minimize}>-</button>
          <button onClick={appWindow.close}>X</button>
        </div>
      </div>
    </div>
  )
}


export default TitleBar;