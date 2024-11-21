import React from 'react'
import Navbar from './Navbar'
import AccordionRepeat from './Features/AccordionRepeat.jsx'

export default function PersonalGoals() {
  return (
    <div>
      <Navbar/>
      <div className='flex justify-center bg-slate-300'>
        <div className='flex-col item-center bg-slate-500 w-7/12'>
          <div className='flex-col'>
          <div>
            <AccordionRepeat
            summary={<div>Diabetes Goals</div>}
            details={<div>Sugar Goals:  <input className='border-2 border-solid border-black rounded-lg'></input></div>}
            />
            <AccordionRepeat
              summary={<div>Hypertension Goals</div>}
              details={<div>Blood Pressure Goals: <input/></div>}
            />
            <AccordionRepeat
              summary={<div>Exercise Goals</div>}
              details={<div>Exercise Goals: </div>}
            />
          </div>
        </div>
      </div>
     </div> 
    </div>
  )
}
