import { settings } from "../Settings"


export default function SettingsPage() {

  return (
    <div className='[&>label>p]:text-slate-400'>
    <label className='flex gap-2 p-4 justify-center'>
      <p>Working time:</p>
      <input
        type='number'
        defaultValue={'8'}
        className='appearance-none'
        onChange={e => console.log(e)}
        />
    </label>
    </div>
  )
}