import React, { useMemo, useEffect } from 'react'
// import 'styles/components/Modals/_addAndEdit.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { addBoard, editBoard } from '@/redux/slices/dataSlice'
import { closeModal } from '@/redux/slices/modalSlice'
import CrossIcon from 'public/assets/icon-cross.svg'
import type { BoardDetail, AllData, ColumnDetail } from 'type/type'
import { RootState } from '@/redux/store'


const AddAndEditBoard = ({ type }: { type: string }) => {

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
  } = useForm<BoardDetail>({
    defaultValues: useMemo(() => {
      return {
        name: '',
        columns: [
          // { name: '', tasks: [] }
        ],
      }
    }, [])
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  useEffect(() => {
    if (type === 'edit') {
      reset({
        name: currentBoard.name,
        columns: currentBoard.columns?.map((column: ColumnDetail) => ({ name: column.name, tasks: column.tasks })),
      })
    }
  }, [currentBoard])

  const onSubmit: SubmitHandler<BoardDetail> = (newBoard) => {
    type === 'add' && dispatch(addBoard({ newBoard }))
    type === 'edit' && dispatch(editBoard({ newBoard, currentBoard }))
    dispatch(closeModal())
  }

  // console.log(errors)

  return (
    <div className='addAndEdit'>
      <h1>
        {type === 'add' && 'Add New Board'}
        {type === 'edit' && 'Edit Board'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <h2>Name</h2>
          <input
            type='text'
            placeholder='e.g. Web Design'
            className={errors.name && 'addAndEdit__input__error'}
            {...register('name', { required: true })}
          />
          {errors.name && <span className='addAndEdit__input__errorMessage addAndEdit__input__errorMessage--titleAndName'>cannot be empty</span>}
        </section>

        <section>
          <h2>Columns</h2>
          {fields.map((column, index) => {
            // console.log(column)
            return <div className='addAndEdit__subtaskWrapper' key={index}>
              <input
                type='text'
                defaultValue={column.name}
                placeholder='e.g. Make coffee'
                className={errors.columns?.[index] && 'addAndEdit__input__error'}
                {...register(`columns.${index}.name`, { required: true })}
              />
              {errors.columns?.[index] && <span className='addAndEdit__input__errorMessage addAndEdit__input__errorMessage--subtaskAndColumn'>cannot be empty</span>}
              <CrossIcon onClick={() => remove(index)} />
            </div>
          })}
          {fields.length < 7 &&
            <button
              onClick={() => append({ name: '', tasks: [] })}
              className='addAndEdit__subtasks__addNewSubTaskButton'
              type='button'
            >
              + Add New Column
            </button>
          }
        </section>

        <section>
          <button className='addAndEdit__submitButton' type='submit'>
            {type === 'add' && 'Create New Board'}
            {type === 'edit' && 'Save Changes'}
          </button>
        </section>
      </form>


    </div>
  )
}

export default AddAndEditBoard