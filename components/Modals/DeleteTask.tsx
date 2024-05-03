import React from 'react'
import type { TaskDetail, AllData } from '@/type/type'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/redux/store'
import '/styles/components/Modals/_deleteTask.scss';
import { closeModal } from '@/redux/slices/modalSlice';
import { deleteTask } from '@/redux/slices/dataSlice'

const DeleteTask = () => {

  const modalDetail: TaskDetail = useSelector((state: RootState) => state.modal.modalDetail)
  // console.log(modalDetail)
  // const currentBoard = useSelector((state: RootState) => state.currentBoard)
  // console.log(currentBoard.columns)

  const allData: AllData = useSelector((state: RootState) => state.data)
  const currentBoard = allData.currentBoard ? allData.currentBoard : allData.boards[0]

  const dispatch = useDispatch()

  const onDeleteTask = () => {
    dispatch(deleteTask({ currentBoard, taskToDelete: modalDetail }))
    dispatch(closeModal())
  }

  const onCancelDeleteTask = () => {
    dispatch(closeModal())
  }

  return (
    <div className='deleteTask'>
      <h1>Delete this task?</h1>
      <p>
        Are you sure you want to delete the
        <span>'{modalDetail.title}'</span>
        task and its subtasks? This action cannot be reversed.
      </p>

      <div className='deleteTask__buttonWrapper'>
        <button
          className='deleteTask__deleteButton'
          onClick={onDeleteTask}
        >
          Delete
        </button>
        <button
          className='deleteTask__cancelButton'
          onClick={onCancelDeleteTask}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteTask