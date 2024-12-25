'use client';

import Image from "next/image";
import "../styles/app/_page.scss";
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from "react-redux";
import Board from "@/components/Board";
import type { AllData } from "@/type/type";
import { useEffect } from "react";
import { openModal } from "@/redux/slices/modalSlice";
import { notFound } from "next/navigation"; // Import the `notFound` function

export default function Home() {
  const allData: AllData = useSelector((state: RootState) => state.data);
  // const allData: AllData = useSelector((state: RootState) => state.data || { boards: [], currentBoardIndex: 0 });
  const currentBoard = allData.boards[allData.currentBoardIndex];

  const dispatch = useDispatch();

  if (!allData || allData.boards.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>No boards available</h1>
        <p>Please create a board to get started.</p>
      </div>
    );
  }

  // useEffect(() => {
  //   localStorage.setItem('data', JSON.stringify(allData));
  // }, [allData]);

  return (
    <main className='page' data-cy='page'>
      {currentBoard.columns && currentBoard.columns.length === 0 ? (
        <section className='page__emptyBoard'>
          <div>
            <p>This board is empty. Create new columns to get started.</p>
            <button
              onClick={() =>
                dispatch(openModal({ modalType: 'EditBoard', modalDetail: currentBoard }))
              }
            >
              + Add New Column
            </button>
          </div>
        </section>
      ) : (
        <Board />
      )}
    </main>
  );
}
