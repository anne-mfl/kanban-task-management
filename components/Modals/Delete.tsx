import React from 'react'
import type { TaskDetail, AllData, BoardDetail } from 'type/type'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '@/redux/store'
import '/styles/components/Modals/_deleteTask.scss'
import { closeModal } from '@/redux/slices/modalSlice'
import { deleteTask, deleteBoard, changeCurrentBoardIndex } from '@/redux/slices/dataSlice'

const Delete = ({ boardOrTask }: { boardOrTask: string }) => {

  const modalDetail: BoardDetail | TaskDetail = useSelector((state: RootState) => state.modal.modalDetail)

  const allData: AllData = useSelector((state: RootState) => state.data)
  const currentBoard = allData.boards[allData.currentBoardIndex]

  const dispatch = useDispatch()

  const onDelete = () => {
    if (boardOrTask === 'Task') {
      dispatch(deleteTask({ currentBoard, taskToDelete: modalDetail }))
    } else if (boardOrTask === 'Board') {
      dispatch(deleteBoard())
      dispatch(changeCurrentBoardIndex(0))
    }
    dispatch(closeModal())
  }

  const onCancel = () => {
    dispatch(closeModal())
  }

  return (
    <div className='deleteTask'>
      <h1>Delete this {boardOrTask}?</h1>
      {boardOrTask === 'Board' && <p>Are you sure you want to delete the<span>{currentBoard.name}</span> board? This action will remove all columns and tasks and cannot be reversed.</p>}
      {boardOrTask === 'Task' && <p> Are you sure you want to delete the <span>{modalDetail.title}</span> task and its subtasks? This action cannot be reversed.</p>}

      <div className='deleteTask__buttonWrapper'>
        <button
          className='deleteTask__deleteButton'
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          className='deleteTask__cancelButton'
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Delete