'use client'

import '../styles/components/_topbar.scss'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from '@/redux/store'
import { openModal } from '@/redux/slices/modalSlice'
import type { AllData } from 'type/type'
import EllipsisDropdown from './patterns/EllipsisDropdown'
import LogoMobile from 'public/assets/logo-mobile.svg'
import ChevronDown from 'public/assets/icon-chevron-down.svg'

const Topbar = () => {

  const allData: AllData = useSelector((state: RootState) => state.data)
  const currentBoard = allData.boards[allData.currentBoardIndex]
  const currentModal = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  return (
    <div className='topbar' data-cy='topbar'>
      <h1>
        <LogoMobile className='topbar__mobile__logo' />
        {currentBoard.name}
        <ChevronDown
          className={`topbar__mobile__chevronIcon topbar__mobile__chevronIcon__menuOpen--${currentModal.modalType === 'MobileMenu'}`}
          onClick={() => {
            currentModal.modalType === 'MobileMenu'
              ? dispatch(openModal({ modalType: '', modalDetail: {} }))
              : dispatch(openModal({ modalType: 'MobileMenu', modalDetail: {} }))
          }}
        />
      </h1>

      <div>
        <button
          className='topbar__addTaskButton'
          onClick={() => dispatch(openModal({ modalType: 'AddNewTask', modalDetail: {} }))}
          disabled={currentBoard.columns.length === 0}
        >
        </button>
        <EllipsisDropdown detail={currentBoard} boardOrTask={'Board'}/>
      </div>
    </div>
  )
}

export default Topbar