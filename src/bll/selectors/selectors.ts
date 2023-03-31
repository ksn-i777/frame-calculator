import { AppStateType } from 'bll/store'

const sheetsList = (state: AppStateType) => state.sheets.sheetsList
const sortSheetsTableColumn = (state: AppStateType) => state.sheets.sortSheetsTableColumn
const sortSheetsTableСondition = (state: AppStateType) => state.sheets.sortSheetsTableСondition
const screwList = (state: AppStateType) => state.sheets.screwList

const pipesList = (state: AppStateType) => state.pipes.pipesList
const sortPipesTableColumn = (state: AppStateType) => state.pipes.sortPipesTableColumn
const sortPipesTableСondition = (state: AppStateType) => state.pipes.sortPipesTableСondition

const currentLength = (state: AppStateType) => state.frame.currentLength
const minLength = (state: AppStateType) => state.frame.lengthData.min
const maxLength = (state: AppStateType) => state.frame.lengthData.max
const lengthStep = (state: AppStateType) => state.frame.lengthData.step
const currentWidth = (state: AppStateType) => state.frame.currentWidth
const minWidth = (state: AppStateType) => state.frame.widthData.min
const maxWidth = (state: AppStateType) => state.frame.widthData.max
const widthStep = (state: AppStateType) => state.frame.widthData.step
const strengthsData = (state: AppStateType) => state.frame.strengthsData
const currentStrength = (state: AppStateType) => state.frame.currentStrength

const calculatedSheetsCount = (state: AppStateType) => state.calculation.sheetsCount
const calculatedSheetsTotalCost = (state: AppStateType) => state.calculation.sheetsTotalCost
const calculatedPipesCount = (state: AppStateType) => state.calculation.pipesCount
const calculatedPipesTotalCost = (state: AppStateType) => state.calculation.pipesTotalCost
const calculatedScrewsCount = (state: AppStateType) => state.calculation.screwsCount
const calculatedScrewsTotalCost = (state: AppStateType) => state.calculation.screwsTotalCost
const totalMaterialsCost = (state: AppStateType) => state.calculation.totalMaterialsCost

export const selectors = {
  sheetsList, sortSheetsTableColumn, sortSheetsTableСondition, screwList,
  pipesList, sortPipesTableColumn, sortPipesTableСondition,
  currentLength, minLength, maxLength, lengthStep, currentWidth, minWidth, maxWidth, widthStep, strengthsData, currentStrength,
  calculatedSheetsCount, calculatedSheetsTotalCost, calculatedPipesCount, calculatedPipesTotalCost,
  calculatedScrewsCount, calculatedScrewsTotalCost, totalMaterialsCost
}