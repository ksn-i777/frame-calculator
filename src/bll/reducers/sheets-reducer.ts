import { config, data } from 'bll/data'

//constants
const SELECT_SHEET = 'SHEETS/SELECT_SHEET'
const REMOVE_SELECTED_SHEET = 'SHEETS/REMOVE_SELECTED_SHEET'
const SORT_SHEETS_LIST = 'SHEETS/SORT_SHEETS_LIST'

const sheetsList = data.filter(item => item.type === 'list') as SheetType[]
const screwPrice = data.filter(item => item.type === 'fix')[0].price
const screwName = data.filter(item => item.type === 'fix')[0].name
const screwUnit = data.filter(item => item.type === 'fix')[0].unit
const screwList = (config.filter(item => item.type === 'fix')).map(item => ({...item, name: screwName, unit: screwUnit, price: screwPrice})) as ScrewType[]

const initialState = {
  sheetsList,
  sortSheetsTableColumn: '',
  sortSheetsTableСondition: '',
  screwList
}

//reducer
export const sheetsReducer = (state: SheetsStateType = initialState, action: SheetsActionsType):SheetsStateType => {
  switch (action.type) {
  case SELECT_SHEET:
    const screwKey = state.sheetsList.filter(sheet => sheet.name === action.sheetName)[0].material
    return {
      ...state,
      sheetsList: state.sheetsList.filter(sheet => sheet.name === action.sheetName),
      screwList: state.screwList.filter(screw => screw.key === screwKey)
    }
  case REMOVE_SELECTED_SHEET:
    return {...state, sheetsList: sheetsList, screwList: screwList}
  case SORT_SHEETS_LIST:
    let sortedSheetsList
    if (action.sortColumn === 'Наименование') {
      sortedSheetsList = [...state.sheetsList].sort((a, b) => Number(a.name.replace(/\D/, '')) - Number(b.name.replace(/\D/, '')))
    } else {
      sortedSheetsList = [...state.sheetsList].sort((a, b) => {
        const condition
        = action.sortColumn === 'Материал' ? 'material'
          : action.sortColumn === 'Размеры' ? 'width'
            : 'price'
        return a[condition] < b[condition] ? -1 : a > b ? 1 : 0
      })
    }
    const newSheetsList = action.sortСondition === 'asc' ? sortedSheetsList
      : action.sortСondition === 'desc' ? sortedSheetsList.reverse()
        : sheetsList
    return {...state, sheetsList: newSheetsList, sortSheetsTableColumn: action.sortColumn, sortSheetsTableСondition: action.sortСondition}
  default:
    return state
  }
}

//actions
export const selectSheetAC = (sheetName: string) => ({type: SELECT_SHEET, sheetName} as const)
export const removeSelectedSheetAC = () => ({type: REMOVE_SELECTED_SHEET} as const)
export const sortSheetsListAC = (sortColumn: string, sortСondition: string) => ({type: SORT_SHEETS_LIST, sortColumn, sortСondition} as const)

//types
export type SheetType = {
  type: string
  name: string
  material: string
  unit: string
  width: number
  price: number
}
export type ScrewType = {
  type: string
  key: string
  name: string
  value: number
  price: number
  unit: string
}
type SheetsStateType = {
  sheetsList: SheetType[]
  sortSheetsTableColumn: string
  sortSheetsTableСondition: string
  screwList: ScrewType[]
}
type selectSheetAT = ReturnType<typeof selectSheetAC>
type removeSelectedSheetAT = ReturnType<typeof removeSelectedSheetAC>
type sortSheetsListAT = ReturnType<typeof sortSheetsListAC>
type SheetsActionsType = selectSheetAT | removeSelectedSheetAT | sortSheetsListAT