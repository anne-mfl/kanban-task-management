'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import VerticalElipsisIcon from 'public/assets/icon-vertical-ellipsis.svg'
import 'styles/components/patterns/_ellipsisdropdown.scss'
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/slices/modalSlice';
import type { BoardDetail, TaskDetail } from 'type/type'

const EllipsisDropdown = ({ detail, boardOrTask }: { detail: BoardDetail | TaskDetail, boardOrTask: string }) => {

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  const dispatch = useDispatch()

  return (
    <div className='ellipsisDropdown' data-cy='ellipsisDropdown'>
      <VerticalElipsisIcon onClick={() => setDropdownIsOpen(!dropdownIsOpen)} />
      {dropdownIsOpen && (
        <section className={`ellipsisDropdown__menu ellipsisDropdown__menu--${boardOrTask}`}>
          <button
            className='ellipsisDropdown__button'
            onClick={() => {
              dispatch(openModal({ modalType: `Edit${boardOrTask}`, modalDetail: detail }))
              setDropdownIsOpen(false)
            }}
          >
            Edit {boardOrTask}
          </button>
          <button
            className='ellipsisDropdown__button ellipsisDropdown__button--warning'
            onClick={() => {
              dispatch(openModal({ modalType: `Delete${boardOrTask}`, modalDetail: detail }))
              setDropdownIsOpen(false)
            }}
          >
            Delete {boardOrTask}
          </button>
        </section>
      )}
    </div>
  )
}

export default EllipsisDropdown