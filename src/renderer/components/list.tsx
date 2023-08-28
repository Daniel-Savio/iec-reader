import { useState, Fragment } from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'


export interface SclListProps 
{ 
    id: number,
    name: string
}

const array: {id: number, name: string}[] = 
[
  { id: 1, name: 'Jiga.cid' },
  { id: 2, name: 'Test.icd' },

]


export function List(){
    
const [selectedScl, setSelectedScl] = useState(array[0])

  return (
    <div className='m-auto center text-center items-center w-full'>
      

      <ul>
        {
       
         array.map((item)=>(
          <li className='border-y-2 transition ease-in-out duration-300 border-dark-50 text-slate-50 hover:cursor-pointer hover:bg-gradient-to-r from-treetech-900 to-treetech-700' key={item.id}>{item.name}</li>
         ))
        
        }
      </ul>

    </div>
  )
}
