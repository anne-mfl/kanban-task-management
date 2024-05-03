'use client'
import Image from "next/image";
import "../styles/app/_page.scss";

import { RootState } from '@/redux/store'
import { useSelector } from "react-redux";
import Board from "@/components/Board";
import type { AllData } from "@/type/type";


export default function Home() {

  const allData: AllData = useSelector((state: RootState) => state.data)
  // console.log('=====>', allData)
  // const currentBoard = useSelector((state: RootState) => state.currentBoard)
  // console.log({currentBoard})

  const currentBoard = allData.currentBoard ? allData.currentBoard : allData.boards[0]

  return (
    <main className='page'>
      {
        currentBoard.columns && currentBoard.columns.length === 0
          ?
          <section className='page__emptyBoard'>
            <div>
              <p>This board is empty. Create a new columns to get started.</p>
              <button>+ Add New Column</button>
            </div>
          </section>
          :
          <Board/>
      }
    </main>
  );
}
