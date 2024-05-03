'use client'

import React from 'react'
import '../styles/components/_topbar.scss'
import Image from 'next/image'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '@/redux/store'
import verticalElipsisIcon from 'public/assets/icon-vertical-ellipsis.svg'
import { openModal } from '@/redux/slices/modalSlice';
import type { AllData } from '@/type/type';

const Topbar = () => {

  const allData: AllData = useSelector((state: RootState) => state.data)
  // const currentBoard = useSelector((state: RootState) => state.currentBoard)
  const dispatch = useDispatch()
  const currentBoard = allData.currentBoard ? allData.currentBoard : allData.boards[0]

  return (
    <>
      <div className='topbar'>
        <h1 className='headingXl'>{currentBoard.name}</h1>
        <div>
          <button
            onClick={() => dispatch(openModal({ modalType: 'AddNewTask', modalDetail: {} }))}
          >
            + Add New Task
          </button>
          <Image src={verticalElipsisIcon} alt='vertical elipsis icon' />
        </div>
      </div>
    </>
  )
}

export default Topbar