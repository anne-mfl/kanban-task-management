import React, { useEffect, useMemo } from 'react'
import 'styles/components/Modals/_addAndEditTask.scss'
import Image from 'next/image'
import crossIcon from 'public/assets/icon-cross.svg'
import Dropdown from 'components/patterns/Dropdown'
import type { TaskDetail, SubtaskDetail, AllData } from 'type/type'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/redux/store'
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { current } from '@reduxjs/toolkit'
import { addTask, editTask } from '@/redux/slices/dataSlice'
import { closeModal } from '@/redux/slices/modalSlice'
import 'styles/components/Modals/_addAndEditTask.scss'

const AddAndEditTask = ({ type }: { type: string }) => {

  const modalDetail: TaskDetail = useSelector((state: RootState) => state.modal.modalDetail)
  // console.log('modalDetail.status=====>',modalDetail.status)
  // const currentBoard = useSelector((state: RootState) => state.currentBoard)
  // console.log('currentBoard.columns.name==>',currentBoard.columns[0].name)

  const allData: AllData = useSelector((state: RootState)=> state.data)
  const currentBoard = allData.currentBoard ? allData.currentBoard : allData.boards[0]
  // console.log('currentboard=====>', currentBoard)


  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    getValues,
    formState: { errors }
  } = useForm<TaskDetail>({
    defaultValues: useMemo(() => {
      return {
        title: '',
        description: '',
        subtasks: [{ title: '', isCompleted: false }],
        status: currentBoard.columns[0].name
      }
    }, [modalDetail])
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  });

  useEffect(() => {
    if (type === 'edit') {
      reset({
        title: modalDetail.title,
        description: modalDetail.description,
        subtasks: modalDetail.subtasks?.map((subtask: SubtaskDetail) => ({ title: subtask.title, isCompleted: subtask.isCompleted })),
        status: modalDetail.status
      })
    }
  }, [modalDetail])

  const status = getValues().status

  const onSubmit: SubmitHandler<any> = (newTask) => {
    type === 'add' && dispatch(addTask({ newTask, currentBoard }))
    type === 'edit' && dispatch(editTask({newTask, oldTask: modalDetail, currentBoard}))
    dispatch(closeModal())
  }



  const onSetCurrentStatus = (value: string) => {
    setValue('status', value)
  }

  watch() //これがないとviewtask, addtaskのstatusの切り替えがうまくいかない
  // console.log(watch('status'))

  return (
    <div className='addAndEditTask'>
      <h1>
        {type === 'add' && 'Add New Task'}
        {type === 'edit' && 'Edit Task'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>

          <h2>Title</h2>
          <input type='text' placeholder='e.g. Take coffee break' {...register('title')} />
        </section>

        <section>
          <h2>Description</h2>
          <textarea
            rows={4}
            placeholder="e.g. it's always good to take a break. This 15 minute break will recharge the batteries a little."
            {...register('description')}
          />
        </section>

        <section>
          <h2>Subtasks</h2>
          {fields.map((subtask: SubtaskDetail, index: number) => {
            return <div className='addAndEditTask__subtaskWrapper' key={index}>
              <input
                type='text'
                defaultValue={subtask.title}
                placeholder='e.g. Make coffee'
                {...register(`subtasks.${index}.title`)}
              />
              <Image
                src={crossIcon}
                alt='close icon'
                onClick={() => remove(index)}
              />
            </div>
          })}
          <button
            onClick={() => append({ title: '', isCompleted: false })}
            className='addAndEditTask__subtasks__addNewSubTaskButton'
            type='button'
          >
            + Add New Subtask
          </button>
        </section>

        <section>
          <h2>Status</h2>
          <Dropdown
            currentLabel={status ? status : currentBoard.columns[0].name}
            options={currentBoard.columns}
            onSetCurrentStatus={onSetCurrentStatus}
          />
        </section>

        <section>
          <button className='addAndEditTask__submitButton' type='submit'>
            {type === 'add' && 'Create Task'}
            {type === 'edit' && 'Save Changes'}
          </button>
        </section>
      </form>


    </div>
  )
}

export default AddAndEditTask
