import React from 'react';
import 'styles/components/_card.scss';
import { useDispatch } from "react-redux";
import { openModal } from '@/redux/slices/modalSlice';
import { Draggable } from '@hello-pangea/dnd';
import type { SubtaskDetail, TaskDetail } from 'type/type';

const Card = ({ taskName, taskData, taskIndex }: { taskName: string, taskData: TaskDetail, taskIndex: number }) => {

  const completedSubtasks = taskData.subtasks?.filter((subtask: SubtaskDetail) => subtask.isCompleted) || [];
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={taskName} index={taskIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='card'
          onClick={() => dispatch(openModal({ modalType: 'ViewTask', modalDetail: taskData }))}
        >
          <h1 className='card__title'>
            {taskName}
          </h1>
          <p className='card__subtasksNum'>
            {completedSubtasks.length} of {taskData.subtasks?.length} subtasks
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
