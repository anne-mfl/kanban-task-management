export interface TaskDetail {
  description?: string,
  status?: string,
  subtasks?: SubtaskDetail[],
  title?: string
}

export interface SubtaskDetail {
  title: string,
  isCompleted: boolean,
}

export interface ColumnDetail {
  name: string,
  tasks: TaskDetail[]
}

export interface AllData {
  currentBoardIndex: number,
  boards: {
    name: string,
    columns: ColumnDetail[]
  }[]
}

export interface BoardDetail {
  name: string,
  columns: ColumnDetail[]
}


