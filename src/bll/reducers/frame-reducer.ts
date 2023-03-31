import { config } from 'bll/data'

//constants
const CHANGE_CURRENT_LENGTH = 'FRAME/CHANGE_CURRENT_LENGTH'
const CHANGE_CURRENT_WIDTH = 'FRAME/CHANGE_CURRENT_WIDTH'
const SELECT_CURRENT_FRAME = 'FRAME/SELECT_CURRENT_FRAME'

const lengthData = config.filter(item => item.key === 'length')[0] as ProportionsDataType
const widthData = config.filter(item => item.key === 'width')[0] as ProportionsDataType
const strengthsData = config.filter(item => item.type === 'frame') as StrengthDataType[]
const currentLength = lengthData.min as number
const currentWidth = lengthData.min as number
const currentStrength = {} as StrengthDataType

const initialState = {
  lengthData,
  widthData,
  strengthsData,
  currentLength,
  currentWidth,
  currentStrength,
}

//reducer
export const frameReducer = (state: FrameStateType = initialState, action: FrameActionsType):FrameStateType => {
  switch (action.type) {
  case CHANGE_CURRENT_LENGTH:
    return {...state, currentLength: action.newLength}
  case CHANGE_CURRENT_WIDTH:
    return {...state, currentWidth: action.newWidth}
  case SELECT_CURRENT_FRAME:
    return {...state, currentStrength: {...state.strengthsData.filter(strength => strength.key === action.newStrengthKey)[0]}}
  default:
    return state
  }
}

//actions
export const changeLengthAC = (newLength: number) => ({type: CHANGE_CURRENT_LENGTH, newLength} as const)
export const changeWidthAC = (newWidth: number) => ({type: CHANGE_CURRENT_WIDTH, newWidth} as const)
export const selectFrameAC = (newStrengthKey: string) => ({type: SELECT_CURRENT_FRAME, newStrengthKey} as const)

//types
export type ProportionsDataType = {
  type: string
  key: string
  name: string
  min: number
  max: number
  step: number
}
export type StrengthDataType = {
  type: string
  key: string
  name: string
  step: number
}
type FrameStateType = {
  lengthData: ProportionsDataType
  widthData: ProportionsDataType
  strengthsData: StrengthDataType[]
  currentLength: number
  currentWidth: number
  currentStrength: StrengthDataType
}
type changeLengthAT = ReturnType<typeof changeLengthAC>
type changeWidthAT = ReturnType<typeof changeWidthAC>
type selectFrameAT = ReturnType<typeof selectFrameAC>
type FrameActionsType = changeLengthAT | changeWidthAT | selectFrameAT