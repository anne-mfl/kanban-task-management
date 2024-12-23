'use client'

import { useState } from 'react'
import 'styles/components/patterns/_dropdown.scss'
import type { ColumnDetail } from 'type/type'

import ChevronDown from 'public/assets/icon-chevron-down.svg'

const Dropdown = ({ currentLabel, options, onSetCurrentStatus }: { currentLabel?: string, options: ColumnDetail[], onSetCurrentStatus: (status: string) => void }) => {

  const [dropdownIsOpen, setDropDownIsOpen] = useState(false)

  return (
    <div className='dropdown'>
      <button
        className={`dropdown__button dropdown__button__open--${dropdownIsOpen}`}
        onClick={() => setDropDownIsOpen(!dropdownIsOpen)}
        type='button'
      >
        {currentLabel}
        <ChevronDown />
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