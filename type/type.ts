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

export interface ColumnsDetail {
  name: string,
  tasks: TaskDetail[]
}

export interface AllData {
  currentBoard?: {
    name: string,
    columns?: ColumnsDetail[]
  },
  boards: {
    name: string,
    columns: ColumnsDetail[]
  }[]
}

