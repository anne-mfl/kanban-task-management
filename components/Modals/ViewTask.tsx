import React from 'react'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from "react-redux";
import type { TaskDetail, AllData } from 'type/type'
import '/styles/components/Modals/_viewTask.scss';
import Dropdown from 'components/patterns/Dropdown';
import EllipsisDropdown from '../patterns/EllipsisDropdown';
import { chagneStatus } from '@/redux/slices/dataSlice';

const ViewTask = () => {

  const modalDetail: TaskDetail = useSelector((state: RootState) => state.modal.modalDetail)
  // console.log(modalDetail.status)
  // const currentBoard = useSelector((state: RootState) => state.currentBoard)
  // console.log(currentBoard.columns)
  const allData: AllData = useSelector((state: RootState) => state.data)
  const currentBoard = allData.currentBoard ? allData.currentBoard : allData.boards[0]

  const dispatch = useDispatch()

  const completedSubtasks = modalDetail.subtasks?.filter((subtask: any) => subtask.isCompleted)

  const onSetCurrentStatus = (value: string) => {
    dispatch(chagneStatus({currentBoard, task: modalDetail ,newStatus: value}))
  }

  return (
    <div className='viewTask'>
      <section className='viewTask__titleWrapper'>
        <h1>{modalDetail.title}</h1>
        <EllipsisDropdown taskDetail={modalDetail}/>
      </section>

      <section>
        <p>{modalDetail.description}</p>
      </section>

      <section>
        <h2>Subtasks ({completedSubtasks?.length} of {modalDetail.subtasks?.length})</h2>
        <ul className='viewTask__subtasks'>
          {modalDetail.subtasks?.map((subtask) => {
            return (
              <li key={subtask.title} className={`viewTask__subtasks__eachTask viewTask__subtasks__eachTask--${subtask.isCompleted}`}>
                <input
                  type='checkbox'
                  checked={subtask.isCompleted}
                  onChange={() => { }}
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