import { StrengthDataType } from './frame-reducer'
import { PipeType } from './pipes-reducer'
import { ScrewType, SheetType } from './sheets-reducer'

//constants
const CALCULATE_TOTAL = 'CALCULATION/CALCULATE_TOTAL'

const initialState = {
  sheetsCount: 0,
  sheetsTotalCost: 0,
  pipesCount: 0,
  pipesTotalCost: 0,
  screwsCount: 0,
  screwsTotalCost: 0,
  totalMaterialsCost: 0
}

//reducer
export const calculationReducer = (state: CalculationStateType = initialState, action: calculateAT):CalculationStateType => {
  switch (action.type) {
  case CALCULATE_TOTAL:
    const frameLength = action.currentLength
    const frameWidth = action.currentWidth

    const newSheetsCount = Math.ceil(frameLength * frameWidth / action.currentSheet.width)
    const newSheetsTotalCost = (newSheetsCount * action.currentSheet.price)
   
    const maxStepBetweenLags = action.currentStrength.step
    const lengthLagsCount = frameWidth / maxStepBetweenLags + 1
    const widthLagsCount = frameLength / maxStepBetweenLags + 1
    const newPipesCount = Math.ceil((frameLength * lengthLagsCount) + (frameWidth * widthLagsCount))
    const newPipesTotalCost = newPipesCount * action.currentPipe.price

    const newScrewsCount = Math.ceil(frameLength * frameWidth * action.currentScrew.value)
    const newScrewsTotalCost = newScrewsCount * action.currentScrew.price

    const newTotaMateriallCost = newSheetsTotalCost + newPipesTotalCost + newScrewsTotalCost

    return {...state,
      sheetsCount: newSheetsCount,
      sheetsTotalCost: newSheetsTotalCost,
      pipesCount: newPipesCount,
      pipesTotalCost: newPipesTotalCost,
      screwsCount: newScrewsCount,
      screwsTotalCost: newScrewsTotalCost,
      totalMaterialsCost: newTotaMateriallCost
    }
  default:
    return state
  }
}

//actions
export const calculateAC = (currentSheet: SheetType, currentPipe: PipeType, currentLength: number,
  currentWidth: number, currentStrength: StrengthDataType, currentScrew: ScrewType) => ({
  type: CALCULATE_TOTAL, currentSheet, currentPipe, currentLength, currentWidth, currentStrength, currentScrew
} as const)

//types
type CalculationStateType = {
  sheetsCount: number,
  sheetsTotalCost: number,
  pipesCount: number,
  pipesTotalCost: number,
  screwsCount: number,
  screwsTotalCost: number,
  totalMaterialsCost: number
}
type calculateAT = ReturnType<typeof calculateAC>