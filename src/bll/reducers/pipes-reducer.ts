import { data } from 'bll/data'

//constants
const SELECT_PIPE = 'PIPES/SELECT_PIPE'
const REMOVE_SELECTED_PIPE = 'PIPES/REMOVE_SELECTED_PIPE'
const SORT_PIPES_LIST = 'PIPES/SORT_PIPES_LIST'

const pipesList = data.filter(pipe => pipe.type === 'pipe') as PipeType[]

const initialState = {
  pipesList,
  sortPipesTableColumn: '',
  sortPipesTableСondition: ''
}

//reducer
export const pipesReducer = (state: PipesStateType = initialState, action: PipesActionsType):PipesStateType => {
  switch (action.type) {
  case SELECT_PIPE:
    return {...state, pipesList: state.pipesList.filter(pipe => pipe.name === action.pipeName)}
  case REMOVE_SELECTED_PIPE:
    return {...state, pipesList: pipesList}
  case SORT_PIPES_LIST:
    let sortedPipesList
    if (action.sortColumn === 'Наименование') {
      sortedPipesList = [...state.pipesList].sort((a, b) => Number(a.name.replace(/\D/, '')) - Number(b.name.replace(/\D/, '')))
    } else {
      sortedPipesList = [...state.pipesList].sort((a, b) => {
        const condition = action.sortColumn === 'Размеры' ? 'width' : 'price'
        return a[condition] < b[condition] ? -1 : a > b ? 1 : 0
      })
    }
    const newPipesList = action.sortСondition === 'asc' ? sortedPipesList
      : action.sortСondition === 'desc' ? sortedPipesList.reverse()
        : pipesList
    return {...state, pipesList: newPipesList, sortPipesTableColumn: action.sortColumn, sortPipesTableСondition: action.sortСondition}
  default:
    return state
  }
}

//actions
export const selectPipeAC = (pipeName: string) => ({type: SELECT_PIPE, pipeName} as const)
export const removeSelectedPipeAC = () => ({type: REMOVE_SELECTED_PIPE} as const)
export const sortPipesListAC = (sortColumn: string, sortСondition: string) => ({type: SORT_PIPES_LIST, sortColumn, sortСondition} as const)

//types
export type PipeType = {
  type: string
  name: string
  unit: string
  width: number
  price: number
}
type PipesStateType = {pipesList: PipeType[], sortPipesTableColumn: string, sortPipesTableСondition: string}
type selectPipeAT = ReturnType<typeof selectPipeAC>
type removeSelectedPipeAT = ReturnType<typeof removeSelectedPipeAC>
type sortPipesListAT = ReturnType<typeof sortPipesListAC>
type PipesActionsType = selectPipeAT | removeSelectedPipeAT | sortPipesListAT