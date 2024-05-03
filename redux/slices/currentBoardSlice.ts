// import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
// import data from '../../public/data.json'

// const initalBoardTabState = data.boards[0]

// const currentBoardSlice = createSlice({
//   name: 'currentBoard',
//   initialState: initalBoardTabState,
//   reducers: {
//     changeCurrentBoard: (state, action: PayloadAction<any>) => {
//       console.log(current(state))
//       return data.boards.filter((board) => board.name === action.payload)[0]
//     }
//   }
// })

// export const { changeCurrentBoard } = currentBoardSlice.actions

// export default currentBoardSlice.reducer