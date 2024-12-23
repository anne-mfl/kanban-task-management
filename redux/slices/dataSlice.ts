import { createSlice } from "@reduxjs/toolkit";
import data from '../../public/data.json'
import type { ColumnDetail, TaskDetail, BoardDetail } from "type/type";

const initialDataState = data

let localStorageData = localStorage.getItem('data') === null ? false : JSON.parse(localStorage.getItem('data') || '{}')

const dataSlice = createSlice({
  name: 'data',
  initialState: localStorageData ? localStorageData : initialDataState,
  // initialState: initialDataState,
  reducers: {
    addTask: (state, action) => {
      const { currentBoard, newTask, currentBoardIndex } = action.payload
      const targetColumnIndex = currentBoard.columns.findIndex((column: ColumnDetail) => column.name === newTask.status)
      state.boards[currentBoardIndex].columns[targetColumnIndex].tasks.push(newTask)
    },
    editTask: (state, action) => {
      const { currentBoard, newTask, oldTask, currentBoardIndex } = action.payload
      const targetColumnIndex = currentBoard.columns.findIndex((column: ColumnDetail) => column.name === oldTask.status)
      const newTargetColumnIndex = currentBoard.columns.findIndex((column: ColumnDetail) => column.name === newTask.status)
      const targetTaskIndex = state.boards[currentBoardIndex].columns[targetColumnIndex].tasks.findIndex((task: TaskDetail) => task.title === oldTask.title)
      if (newTask.status === oldTask.status) {
        state.boards[currentBoardIndex].columns[targetColumnIndex].tasks.splice(targetTaskIndex, 1, newTask)
      } else {
        state.boards[currentBoardIndex].columns[newTargetColumnIndex].tasks.push(newTask)
        state.boards[currentBoardIndex].columns[targetColumnIndex].tasks.splice(targetTaskIndex, 1)
      }
    },
    deleteTask: (state, action) => {
      const { currentBoard, taskToDelete } = action.payload
      const targetBoardIndex = state.boards.findIndex((board: BoardDetail) => board.name === currentBoard.name)
      const targetColumnIndex = currentBoard.columns.findIndex((column: ColumnDetail) => column.name === taskToDelete.status)
      const targetTaskIndex = state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.findIndex((task: TaskDetail) => task.title === taskToDelete.title)
      state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.splice(targetTaskIndex, 1)
    },
    addBoard: (state, action) => {
      const { newBoard } = action.payload
      state.boards.push(newBoard)
    },
    editBoard: (state, action) => {
      const { newBoard, currentBoard } = action.payload
      const targetBoardIndex = state.boards.findIndex((board: BoardDetail) => board.name === currentBoard.name)
      state.boards.splice(targetBoardIndex, 1, newBoard)
    },
    deleteBoard: (state) => {
      state.boards.splice(state.currentBoardIndex, 1)
    },
    changeCurrentBoardIndex: (state, action) => {
      return { ...state, currentBoardIndex: action.payload }
    },
    changeStatus: (state, action) => {
      const { targetTask, newStatus } = action.payload
      const currentBoard = state.boards[state.currentBoardIndex]
      const originalColumnIndex = currentBoard.columns.findIndex((column: ColumnDetail) => column.name === targetTask.status)
      const targetColumnIndex = currentBoard.columns.findIndex((column: ColumnDetail) => column.name === newStatus)
      const targetTaskIndex = currentBoard.columns[originalColumnIndex].tasks.findIndex((task: TaskDetail) => task.title === targetTask.title)
      // change status of a task
      const taskWithNewStatus = currentBoard.columns[originalColumnIndex].tasks.find((task: TaskDetail) => task.title === targetTask.title)
      if (taskWithNewStatus) {
        taskWithNewStatus.status = newStatus
        // remove from the original column
        currentBoard.columns[originalColumnIndex].tasks.splice(targetTaskIndex, 1)
        // add to the new column
        currentBoard.columns[targetColumnIndex].tasks.push(taskWithNewStatus)
      }
    },
    changeSubtaskStatus: (state, action) => {
      const { targetTask, targetSubtaskIndex } = action.payload
      const currentBoard = state.boards[state.currentBoardIndex]
      const targetColumnIndex = currentBoard.columns.findIndex((column: ColumnDetail) => column.name === targetTask.status)
      const targetTaskIndex = currentBoard.columns[targetColumnIndex].tasks.findIndex((task: TaskDetail) => task.title === targetTask.title)
      const targetSubtask = currentBoard.columns[targetColumnIndex].tasks[targetTaskIndex].subtasks[targetSubtaskIndex]
      targetSubtask.isCompleted = !targetSubtask.isCompleted
    },
    dragAndDrop: (state, action) => {
      const { newColumns, destination, destinationColumnIndex } = action.payload;
      const currentBoard: BoardDetail = state.boards[state.currentBoardIndex];
      currentBoard.columns = newColumns;
      // If dragging between different columns, change the status to new status
      if (destination) {
        const targetTask = { ...currentBoard.columns[destinationColumnIndex].tasks[destination.index] };
        targetTask.status = destination.droppableId;
        currentBoard.columns[destinationColumnIndex].tasks[destination.index] = targetTask;
      }
    },
  }
})

export const { changeCurrentBoardIndex, addTask, editTask, deleteTask, changeStatus, addBoard, editBoard, deleteBoard, changeSubtaskStatus, dragAndDrop } = dataSlice.actions

export default dataSlice.reducer