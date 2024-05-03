'use client'

import React from 'react'
import 'styles/components/_sidebar.scss'
import Image from 'next/image'
import logoDark from 'public/assets/logo-dark.svg'
import boardIcon from 'public/assets/icon-board.svg'
import lightIcon from 'public/assets/icon-light-theme.svg'
import darkIcon from 'public/assets/icon-dark-theme.svg'
import hideIcon from 'public/assets/icon-hide-sidebar.svg'
import { RootState } from '@/redux/store'
import { useSelector, useDispatch } from "react-redux";
// import { changeCurrentBoard } from '@/redux/slices/currentBoardSlice'
import { changeCurrentBoard } from '@/redux/slices/dataSlice'
import { openModal } from '@/redux/slices/modalSlice'
import type { AllData } from '@/type/type'

const Sidebar = () => {

  const allData: AllData = useSelector((state: RootState) => state.data)
  // console.log('allData=====>', allData)
  // const currentBoard = useSelector((state: RootState) => state.currentBoard)
  // console.log('currentBoard======>', currentBoard)

  // const currentBoard = useSelector((state: RootState) => state.data.boards[0])
  
  const currentBoard = allData.currentBoard ? allData.currentBoard : allData.boards[0]
  

  const dispatch = useDispatch()

  return (
    <div className='sidebar'>
      <section>
        <Image src={logoDark} alt='kanban logo' />

        <h1>ALL BOARDS({allData.boards.length})</h1>

        <ul>
          {allData.boards.map((board, i) => {
            return (
              <li
                className={currentBoard.name === board.name ? 'sidebar__currentBoard' : ''}
                // onClick={() => dispatch(changeCurrentBoard(board.name))}
                onClick={() => dispatch(changeCurrentBoard(i))}
                key={board.name}
              >
                <Image src={boardIcon} alt='board icon' />
                {board.name}
              </li>
            )
          })}
          <li>
            <Image src={boardIcon} alt='board icon' />
            <button onClick={() => dispatch(openModal({ modalType: 'AddNewBoard', modalDetail: {} }))}>
              + Create New Board
            </button>
          </li>
        </ul>
      </section>


      <section>
        <div className='sidebar__themeToggle'>
          <Image src={lightIcon} alt='light icon' />
          <label className='switch'>
            <input type='checkbox' />
            <span className='slider round' />
          </label>
          <Image src={darkIcon} alt='dark icon' />
        </div>

        <div className='sidebar__hideSidebar'>
          <button>
            <Image src={hideIcon} alt='hide sidebar icon' />
            Hide Sidebar
          </button>
        </div>
      </section>



    </div>

  )
}


export default Sidebar