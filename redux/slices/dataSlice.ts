import { createSlice, current } from "@reduxjs/toolkit";
import data from '../../public/data.json'
import type { ColumnsDetail } from "@/type/type";

const initialDataState = data

const dataSlice = createSlice({
  name: 'data',
  initialState: initialDataState,
  reducers: {
    changeCurrentBoard: (state, action) => {
      // const targetBoard = state.boards[action.payload]
      // console.log(targetBoard)
      // console.log({targetBoardIndex})
      // console.log(current(state.boards[targetBoardIndex]))
      return {...state, currentBoard: state.boards[action.payload]}
    },
    addTask: (state, action) => {
      const { currentBoard, newTask } = action.payload
      const targetBoardIndex = state.boards.findIndex((board) => board.name === currentBoard.name)
      const targetColumnIndex = currentBoard.columns.findIndex((column: ColumnsDetail) => column.name === newTask.status)
      state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.push(newTask)
    },
    editTask: (state, action) => {
      const { currentBoard, newTask, oldTask } = action.payload
      const targetBoardIndex = state.boards.findIndex((board) => board.name === currentBoard.name)
      const targetColumnIndex = currentBoard.columns.findIndex((column: ColumnsDetail) => column.name === oldTask.status)
      const newTargetColumnIndex = currentBoard.columns.findIndex((column: ColumnsDetail) => column.name === newTask.status)
      const targetTaskIndex = state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.findIndex((task: any) => task.title === oldTask.title)
      if (newTask.status === oldTask.status) {
        state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.splice(targetTaskIndex, 1, newTask)
      } else {
        state.boards[targetBoardIndex].columns[newTargetColumnIndex].tasks.push(newTask)
        state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.splice(targetTaskIndex, 1)
      }
    },
    deleteTask: (state, action) => {
      const { currentBoard, taskToDelete } = action.payload
      const targetBoardIndex = state.boards.findIndex((board) => board.name === currentBoard.name)
      const targetColumnIndex = currentBoard.columns.findIndex((column: ColumnsDetail) => column.name === taskToDelete.status)
      const targetTaskIndex = state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.findIndex((task: any) => task.title === taskToDelete.title)
      state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.splice(targetTaskIndex, 1)
    },
    chagneStatus: (state, action) => {
      const { currentBoard, task, newStatus } = action.payload
      const targetBoardIndex = state.boards.findIndex((board) => board.name === currentBoard.name)
      const targetColumnIndex = currentBoard.columns.findIndex((column: ColumnsDetail) => column.name === task.status)
      const newTargetColumnIndex = currentBoard.columns.findIndex((column: ColumnsDetail) => column.name === newStatus)
      const targetTaskIndex = state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.findIndex((task: any) => task.title === task.title)
      // change status of a task
      const taskWithNewStatus: any = state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.find((task: any) => task.title === task.title)
      taskWithNewStatus.status = newStatus
      // remove from the original column
      state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.splice(targetTaskIndex, 1)
      // add to the new column
      state.boards[targetBoardIndex].columns[newTargetColumnIndex].tasks.push(taskWithNewStatus)
    },
    addBoard: (state, action) => {
      const { newBoard } = action.payload
      state.boards.push(newBoard)
      // console.log(current(state))
    }
  }
})

export const { changeCurrentBoard, addTask, editTask, deleteTask, chagneStatus, addBoard } = dataSlice.actions

export default dataSlice.reducer