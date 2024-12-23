'use client'

import Image from "next/image";
import "../styles/app/_page.scss";
import { RootState } from '@/redux/store'
import { useSelector, useDispatch } from "react-redux";
import Board from "@/components/Board";
import type { AllData } from "@/type/type";
import { useEffect } from "react";
import { openModal } from "@/redux/slices/modalSlice";

export default function Home() {

  const allData: AllData = useSelector((state: RootState) => state.data)
  const currentBoard = allData.boards[allData.currentBoardIndex]

  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(allData))
  }, [allData])

  return (
    <main className='page' data-cy='page'>
      {
        currentBoard.columns && currentBoard.columns.length === 0
          ?
          <section className='page__emptyBoard'>
            <div>
              <p>This board is empty. Create new columns to get started.</p>
              <button onClick={() => dispatch(openModal({ modalType: 'EditBoard', modalDetail: currentBoard }))}>
                + Add New Column
              </button>
            </div>
          </section>
          :
          <Board />
      }
    </main>
  );
}
