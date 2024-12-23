'use client'

import React, { useState, useEffect } from 'react'
import 'styles/components/_sidebar.scss'
import LogoDark from 'public/assets/logo-dark.svg'
import LogoLight from 'public/assets/logo-light.svg'
import BoardIcon from 'public/assets/icon-board.svg'
import LightIcon from 'public/assets/icon-light-theme.svg'
import DarkIcon from 'public/assets/icon-dark-theme.svg'
import HideIcon from 'public/assets/icon-hide-sidebar.svg'
import ShowIcon from 'public/assets/icon-show-sidebar.svg'
import { RootState } from '@/redux/store'
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentBoardIndex } from '@/redux/slices/dataSlice'
import { openModal } from '@/redux/slices/modalSlice'
import type { AllData } from 'type/type'
import { toggleTheme } from '@/redux/slices/themeSlice'

const Sidebar = () => {

  const [sidebarIsDisplayed, setSidebarIsDisplayed] = useState(true)

  const allData: AllData = useSelector((state: RootState) => state.data)
  const currentBoard = allData.boards[allData.currentBoardIndex]
  const currentTheme = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <div className={`sidebar sidebar--${sidebarIsDisplayed}`} data-cy='sidebar'>
      <section>
        {currentTheme === 'light' ? <LogoDark className='sidebar__logo' /> : <LogoLight className='sidebar__logo' />}

        <h1>ALL BOARDS({allData.boards.length})</h1>

        <ul>
          {allData.boards.map((board, i) => {
            return (
              <li
                className={`sidebar__currentBoard--${currentBoard.name === board.name}`}
                onClick={() => dispatch(changeCurrentBoardIndex(i))}
                key={board.name}
              >
                <BoardIcon />
                {board.name}
              </li>
            )
          })}
          <li
            onClick={(e) => {
              e.stopPropagation()
              dispatch(openModal({ modalType: 'AddNewBoard', modalDetail: {} }))
            }}
            className='sidebar__currentBoard--createNewBoard'
          >
            <BoardIcon />
            + Create New Board
          </li>
        </ul>
      </section>


      <div>

        <section className='sidebar__themeToggle'>
          <LightIcon />
          <label className='switch' onClick={(e) => e.stopPropagation()}>
            <input type='checkbox' onClick={() => dispatch(toggleTheme())} />
            <span data-cy='themeToggle' />
          </label>
          <DarkIcon />
        </section>

        <div>
          <button
            data-cy='hideSidebar'
            className={`sidebar__hideSidebar sidebar__hideSidebar--${sidebarIsDisplayed}`}
            onClick={() => setSidebarIsDisplayed(!sidebarIsDisplayed)}
          >
            {sidebarIsDisplayed
              ? <div>
                <HideIcon />
                Hide Sidebar
              </div>
              : <ShowIcon />
            }
          </button>
        </div>
      </div>

    </div>

  )
}


export default Sidebar