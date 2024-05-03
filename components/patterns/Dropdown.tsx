'use client'

import { useState } from 'react'
import 'styles/components/patterns/_dropdown.scss'
import type { ColumnsDetail } from '@/type/type'
import Image from 'next/image'
// import { chevronUp } from 'public/assets/icon-chevron-up.svg'
import chevronDown from 'public/assets/icon-chevron-down.svg'

const Dropdown = ({ currentLabel, options, onSetCurrentStatus }: { currentLabel?: string, options: ColumnsDetail[], onSetCurrentStatus: (status: string) => void }) => {

  const [dropdownIsOpen, setDropDownIsOpen] = useState(false)

  return (
    <div className='dropdown'>
      <button
        className='dropdown__button'
        onClick={() => setDropDownIsOpen(!dropdownIsOpen)}
        type='button'
      >
        {currentLabel}
        <Image src={chevronDown} alt='chevron icon' />
      </button>

      {dropdownIsOpen &&
        <ul className='dropdown__options'>
          {options.map((option) => {
            return (
              <li key={option.name} onClick={() => {
                onSetCurrentStatus(option.name)
                setDropDownIsOpen(false)
              }}>
                {option.name}
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default Dropdown