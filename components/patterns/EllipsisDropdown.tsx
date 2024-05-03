'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import verticalElipsisIcon from 'public/assets/icon-vertical-ellipsis.svg'
import 'styles/components/patterns/_ellipsisdropdown.scss'
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/slices/modalSlice';

const EllipsisDropdown = ({ taskDetail }: { taskDetail: any }) => {

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  const dispatch = useDispatch()

  return (
    <div className='ellipsisDropdown'>
      <Image
        src={verticalElipsisIcon}
        alt='vertical elipsis icon'
        onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
      />
      {dropdownIsOpen && (
        <section className='ellipsisDropdown__menu'>
          <button
            className='ellipsisDropdown__button'
            onClick={() => dispatch(openModal({ modalType: 'EditTask', modalDetail: taskDetail }))}
          >
            Edit Task
          </button>
          <button 
          className='ellipsisDropdown__button ellipsisDropdown__button--warning'
            onClick={()=> dispatch(openModal({modalType: 'DeleteTask', modalDetail: taskDetail}))}
          >
            Delete Task
          </button>
        </section>
      )}
    </div>
  )
}

export default EllipsisDropdown