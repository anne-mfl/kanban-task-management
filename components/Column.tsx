import 'styles/components/_column.scss'
import Card from './Card'
import type { ColumnDetail, TaskDetail } from 'type/type';
import { Droppable } from '@hello-pangea/dnd';


const Column = ({ columnTitle, columnIndex, columnData }: { columnTitle: string, columnIndex: number, columnData: ColumnDetail }) => {

  return (
    <div className='column'>
      <h1 className='column__title'>
        <span className={`column__titleColorBall column__titleColorBall--${columnIndex}`}>&nbsp;</span>
        {columnTitle}
      </h1>

      <Droppable droppableId={columnTitle}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='column__tasks'
          >
            {columnData.tasks.length === 0 ? (
              <div className='column__emptyColumn'>
                &nbsp;
              </div>
            ) : (
              columnData.tasks.map((task: TaskDetail, index: number) => (
                <Card
                  key={task.title}
                  taskName={task.title || ''}
                  taskData={task}
                  taskIndex={index}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;

