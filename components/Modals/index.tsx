'use client'

import React from 'react'
import ViewTask from './ViewTask'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from "react-redux";
import 'styles/components/Modals/_index.scss'
import { closeModal } from '@/redux/slices/modalSlice';
import AddAndEditTask from './AddAndEditTask';
import AddAndEditBoard from './AddAndEditBoard';
import Delete from './Delete';
import Sidebar from '../Sidebar';

const Modals = () => {

  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal)

  return (
    <div data-cy='modal'>
      {modal.modalType === 'MobileMenu'
        ? <div className='modal__mobileMenu' onClick={() => dispatch(closeModal())}>
          <main className=''>
            {modal.modalType === 'MobileMenu' && <Sidebar />}
          </main>
        </div >
        : modal.modalType !== ''
        && <div className='modal' onClick={() => dispatch(closeModal())}>
          <main className='modal__content' onClick={(e) => e.stopPropagation()}>
            {modal.modalType === 'ViewTask' && <ViewTask />}
            {modal.modalType === 'AddNewTask' && <AddAndEditTask type={'add'} />}
            {modal.modalType === 'EditTask' && <AddAndEditTask type={'edit'} />}
            {modal.modalType === 'AddNewBoard' && <AddAndEditBoard type={'add'} />}
            {modal.modalType === 'EditBoard' && <AddAndEditBoard type={'edit'} />}
            {modal.modalType === 'DeleteBoard' && <Delete boardOrTask={'Board'} />}
            {modal.modalType === 'DeleteTask' && <Delete boardOrTask={'Task'} />}
          </main>
        </div >
      }
    </div>
  )
}

export default Modals