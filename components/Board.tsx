import React from 'react'
import { RootState } from '@/redux/store'
import { useSelector } from "react-redux";
import 'styles/components/_board.scss'
import Column from './Column';
import { current } from '@reduxjs/toolkit';
import type { AllData, ColumnsDetail } from '@/type/type'; 

const Board = () => {
  // const currentBoard = useSelector((state: RootState) => state.currentBoard)

  // const allData = useSelector((state: RootState)=> state.data.boards)
  // const currentBoardIndex = allData.findIndex((board)=> board.name === currentBoard.name)
  // const currentBoardData = allData[currentBoardIndex]

  const allData: AllData = useSelector((state: RootState)=> state.data)
  const currentBoard = allData.currentBoard ? allData.currentBoard : allData.boards[0]
  console.log('currentBoard in BOARD', currentBoard)
  
  return (
    <div className='board'>
      {currentBoard.columns && currentBoard.columns.map((column: ColumnsDetail, index: number) => {
        return (
          <Column
            key={column.name}
            columnTitle={column.name}
            columnData={column}
            index={index}
          />
        )
      })}
      <section className='board__addNewColumn'>
        <h1>+ New Column</h1>
      </section>
    </div>
  )
}

export default Board