import React, { useEffect } from 'react'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from "react-redux";
import type { TaskDetail, AllData, SubtaskDetail } from 'type/type'
import '/styles/components/Modals/_viewTask.scss';
import Dropdown from 'components/patterns/Dropdown';
import EllipsisDropdown from '../patterns/EllipsisDropdown';
import { changeStatus, changeSubtaskStatus } from '@/redux/slices/dataSlice';

const ViewTask = () => {

  const modalDetail: TaskDetail = useSelector((state: RootState) => state.modal.modalDetail)

  const allData: AllData = useSelector((state: RootState) => state.data)
  const currentBoardIndex = allData.currentBoardIndex
  const currentBoard = allData.boards[currentBoardIndex]

  // modalDetail2 is to sync the modalDetail with the newest data when the subtask status is changed
  const targetColumnIndex = currentBoard.columns.findIndex((column) => column.name === modalDetail.status)
  const targetTaskIndex = currentBoard.columns[targetColumnIndex].tasks.findIndex((task) => task.title === modalDetail.title)
  const modalDetail2 = currentBoard.columns[targetColumnIndex].tasks[targetTaskIndex] ? currentBoard.columns[targetColumnIndex].tasks[targetTaskIndex] : modalDetail

  const dispatch = useDispatch()
  
  const onSetCurrentStatus = (value: string) => {
    dispatch(changeStatus({ targetTask: modalDetail, newStatus: value }))
  }
  
  const completedSubtasks = modalDetail2?.subtasks?.filter((subtask: SubtaskDetail) => subtask.isCompleted)

  return (
    <div className='viewTask'>
      <section className='viewTask__titleWrapper'>
        <h1>{modalDetail.title}</h1>
        <EllipsisDropdown detail={modalDetail} boardOrTask={'Task'} />
      </section>

      <section>
        <p>{modalDetail.description}</p>
      </section>

      <section>
        <h2>Subtasks ({completedSubtasks?.length} of {modalDetail.subtasks?.length})</h2>
        <ul className='viewTask__subtasks'>
          {modalDetail2.subtasks?.map((subtask, i) => {
            return (
              <li key={subtask.title} className={`viewTask__subtasks__eachTask viewTask__subtasks__eachTask--${subtask.isCompleted}`}>
                <input
                  type='checkbox'
                  checked={subtask.isCompleted}
                  onChange={() => dispatch(changeSubtaskStatus({ targetTask: modalDetail, targetSubtaskIndex: i }))}
                />
                <span>{subtask.title}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <section>
        <h2>Current Status</h2>
        <Dropdown
          currentLabel={modalDetail?.status}
          options={currentBoard.columns}
          onSetCurrentStatus={onSetCurrentStatus}
        />
      </section>
    </div>
  )
}

export default ViewTask