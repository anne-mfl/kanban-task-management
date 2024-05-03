'use client'

import React from 'react'
import ViewTask from './ViewTask'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from "react-redux";
import 'styles/components/Modals/_index.scss'
import { closeModal } from '@/redux/slices/modalSlice';
import AddAndEditTask from './AddAndEditTask';
import DeleteTask from './DeleteTask';
import AddAndEditBoard from './AddAndEditBoard';

const Modals = () => {

  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal)
  // console.log('index.tsx==>', modal)

  return (
    <>
      {modal.modalType !== '' &&
        <div className='modal' onClick={() => dispatch(closeModal())}>
          <main onClick={(e) => e.stopPropagation()}>
            {modal.modalType === 'ViewTask' && <ViewTask />}
            {modal.modalType === 'AddNewTask' && <AddAndEditTask type={'add'} />}
            {modal.modalType === 'EditTask' && <AddAndEditTask type={'edit'} />}
            {modal.modalType === 'DeleteTask' && <DeleteTask />}
            {modal.modalType === 'AddNewBoard' && <AddAndEditBoard type={'add'} />}
            {modal.modalType === 'EditBoard' && <AddAndEditBoard type={'edit'} />}
          </main>
        </div >
      }
    </>
  )
}

export default Modals