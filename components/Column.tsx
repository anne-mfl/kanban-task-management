import React from 'react'
import 'styles/components/_column.scss'
import Card from './Card'

const Column = ({ columnTitle, index, columnData }: { columnTitle: string, index: number, columnData: any }) => {

  return (
    <div className='column'>
      <h1 className='column__title'>
        <span className={`column__titleColorBall column__titleColorBall--${index}`}>&nbsp;</span>
        {columnTitle}
      </h1>

      {
        columnData.tasks.length === 0
          ? (
            <div className='column__emptyColumn'>
              &nbsp;
            </div>
          )
          :
          columnData.tasks.map((task: any) => {
            return (
              <Card
                key={task.title}
                taskName={task.title}
                taskData={task}
              />
            )
          })
      }

    </div>
  )
}

export default Column