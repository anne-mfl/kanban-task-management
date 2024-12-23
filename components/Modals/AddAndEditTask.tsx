import React, { useEffect, useMemo } from 'react'
import 'styles/components/Modals/_addAndEdit.scss'
import Image from 'next/image'
import CrossIcon from 'public/assets/icon-cross.svg'
import Dropdown from 'components/patterns/Dropdown'
import type { TaskDetail, SubtaskDetail, AllData } from 'type/type'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/redux/store'
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { current } from '@reduxjs/toolkit'
import { addTask, editTask } from '@/redux/slices/dataSlice'
import { closeModal } from '@/redux/slices/modalSlice'


const AddAndEditTask = ({ type }: { type: string }) => {

  const modalDetail: TaskDetail = useSelector((state: RootState) => state.modal.modalDetail)
  const allData: AllData = useSelector((state: RootState) => state.data)
  const currentBoardIndex = allData.currentBoardIndex
  const currentBoard = allData.boards[currentBoardIndex]

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
        subtasks: [
          // { title: '', isCompleted: false }
        ],
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

  const onSubmit: SubmitHandler<TaskDetail> = (newTask) => {
    type === 'add' && dispatch(addTask({ newTask, currentBoard, currentBoardIndex }))
    type === 'edit' && dispatch(editTask({ newTask, oldTask: modalDetail, currentBoard, currentBoardIndex }))
    dispatch(closeModal())
  }

  const onSetCurrentStatus = (value: string) => {
    setValue('status', value)
  }

  watch() //これがないとviewtask, addtaskのstatusの切り替えがうまくいかない

  return (
    <div className='addAndEdit'>
      <h1>
        {type === 'add' && 'Add New Task'}
        {type === 'edit' && 'Edit Task'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <h2>Title</h2>
          <input
            type='text'
            placeholder='e.g. Take coffee break'
            className={errors.title && 'addAndEdit__input__error'}
            {...register('title', { required: true })}
          />
          {errors.title && <span className='addAndEdit__input__errorMessage addAndEdit__input__errorMessage--titleAndName'>cannot be empty</span>}
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
          {fields.map((subtask, index) => {
            return <div className='addAndEdit__subtaskWrapper' key={index}>
              <input
                type='text'
                defaultValue={subtask.title}
                placeholder='e.g. Make coffee'
                className={errors.subtasks?.[index] && 'addAndEdit__input__error'}
                {...register(`subtasks.${index}.title`, { required: true })}
              />
              {errors.subtasks?.[index] && <span className='addAndEdit__input__errorMessage addAndEdit__input__errorMessage--subtaskAndColumn'>cannot be empty</span>}
              <CrossIcon onClick={() => remove(index)} />
            </div>
          })}
          <button
            onClick={() => append({ title: '', isCompleted: false })}
            className='addAndEdit__subtasks__addNewSubTaskButton'
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
          <button className='addAndEdit__submitButton' type='submit'>
            {type === 'add' && 'Create Task'}
            {type === 'edit' && 'Save Changes'}
          </button>
        </section>
      </form>


    </div>
  )
}

export default AddAndEditTask
