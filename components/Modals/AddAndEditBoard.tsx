import React, { useMemo, useEffect } from 'react'
import 'styles/components/Modals/_addAndEditBoard.scss'
import { useDispatch } from 'react-redux'
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { addBoard } from '@/redux/slices/dataSlice'
import { closeModal } from '@/redux/slices/modalSlice'
import Image from 'next/image'
import crossIcon from 'public/assets/icon-cross.svg'


const AddAndEditBoard = ({ type }: { type: string }) => {

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
  } = useForm<any>({
    defaultValues: useMemo(() => {
      return {
        name: '',
        columns: [
          {name: '', tasks: []}
        ],
      }
    }, [])
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  // useEffect(() => {
  //   if (type === 'edit') {
  //     reset({
  //       title: modalDetail.title,
  //       subtasks: modalDetail.subtasks?.map((subtask: SubtaskDetail) => ({ title: subtask.title, isCompleted: subtask.isCompleted })),
  //     })
  //   }
  // }, [modalDetail])

  const onSubmit: SubmitHandler<any> = (newBoard) => {
    type === 'add' && dispatch(addBoard({ newBoard }))
    // type === 'edit' && dispatch(editTask({newBoard, oldTask: modalDetail, currentBoard}))
    dispatch(closeModal())
  }

  return (
    <div className='addAndEditTask'>
      <h1>
        {type === 'add' && 'Add New Board'}
        {type === 'edit' && 'Edit Board'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <h2>Name</h2>
          <input type='text' placeholder='e.g. Web Design' {...register('name')} />
        </section>
      
        <section>
          <h2>Columns</h2>
          {fields.map((column: any, index: number) => {
            return <div className='addAndEditTask__subtaskWrapper' key={index}>
              <input
                type='text'
                // defaultValue={subtask.title}
                placeholder='e.g. Make coffee'
                {...register(`columns.${index}.name`)}
              />
              <Image
                src={crossIcon}
                alt='close icon'
                onClick={() => remove(index)}
              />
            </div>
          })}
          <button
            onClick={() => append({name: '', tasks: []})}
            className='addAndEditTask__subtasks__addNewSubTaskButton'
            type='button'
          >
            + Add New Column
          </button>
        </section>

        <section>
          <button className='addAndEditTask__submitButton' type='submit'>
            {type === 'add' && 'Create New Board'}
            {type === 'edit' && 'Save Changes'}
          </button>
        </section>
      </form>


    </div>
  )
}

export default AddAndEditBoard