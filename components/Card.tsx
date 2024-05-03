import React from 'react'
import 'styles/components/_card.scss'
import { useSelector, useDispatch } from "react-redux";
import { openModal } from '@/redux/slices/modalSlice';


const Card = ({ taskName, taskData }: { taskName: any, taskData: any }) => {

  const completedSubtasks = taskData.subtasks.filter((subtask: any) => subtask.isCompleted)
  const dispatch = useDispatch()

  return (
    <div className='card'
      onClick={() => dispatch(openModal({modalType: 'ViewTask', modalDetail: taskData}))}
    >
      <h1 className='card__title'>
        {taskName}
      </h1>
      <p className='card__subtasksNum'>
        {completedSubtasks.length} of {taskData.subtasks.length} subtasks
      </p>
    </div>
  )
}

export default Card