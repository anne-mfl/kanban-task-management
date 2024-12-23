import React, { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from "react-redux";
import 'styles/components/_board.scss';
import Column from './Column';
import type { AllData } from 'type/type';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { dragAndDrop } from '@/redux/slices/dataSlice';
import { openModal } from '@/redux/slices/modalSlice';


const Board = () => {

  const allData: AllData = useSelector((state: RootState) => state.data);
  const currentBoard = allData.boards[allData.currentBoardIndex];

  const dispatch = useDispatch();

  const [columns, setColumns] = useState(currentBoard.columns);

  useEffect(() => {
    setColumns(currentBoard.columns)
  }, [currentBoard])

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const sourceColumnIndex = columns.findIndex((col) => col.name === source.droppableId);
    const destinationColumnIndex = columns.findIndex((col) => col.name === destination.droppableId);

    const sourceColumn = { ...columns[sourceColumnIndex], tasks: [...columns[sourceColumnIndex].tasks] };
    const destinationColumn = { ...columns[destinationColumnIndex], tasks: [...columns[destinationColumnIndex].tasks] };

    const [movedTask] = sourceColumn.tasks.splice(source.index, 1); // Remove the task from the source column

    // If dragging within the same column
    if (source.droppableId === destination.droppableId) {
      sourceColumn.tasks.splice(destination.index, 0, movedTask);
      const newColumns = [...columns];
      newColumns[sourceColumnIndex] = sourceColumn;
      setColumns(newColumns);
      dispatch(dragAndDrop({ newColumns }));
    } else {
      // If dragging between different columns
      destinationColumn.tasks.splice(destination.index, 0, movedTask);
      const newColumns = [...columns];
      newColumns[sourceColumnIndex] = sourceColumn;
      newColumns[destinationColumnIndex] = destinationColumn;
      setColumns(newColumns);
      dispatch(dragAndDrop({ newColumns, destinationColumnIndex, destination }));
    }
  };

  return (
    <div className='board'>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column, index) => (
          <Column
            key={column.name}
            columnTitle={column.name}
            columnData={column}
            columnIndex={index}
          />
        ))}
      </DragDropContext>
      {columns.length < 7 &&
        <section
          className='board__addNewColumn'
          onClick={() => dispatch(openModal({ modalType: 'EditBoard', modalDetail: currentBoard }))}
        >
          <h1>+ New Column</h1>
        </section>
      }
    </div>
  );
}

export default Board;


