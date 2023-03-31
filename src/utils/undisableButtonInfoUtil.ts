import { StrengthDataType } from 'bll/reducers/frame-reducer'
import { PipeType } from 'bll/reducers/pipes-reducer'
import { SheetType } from 'bll/reducers/sheets-reducer'

export const undisableButtonInfoUtil = (
  sheetsList: SheetType[], pipesList: PipeType[], lengthError: string, widthError:string, currentStrength: StrengthDataType
) => {
  if(sheetsList.length > 1) {
    return 'для рассчета необходимо выбрать модель листа'
  }
  if(pipesList.length > 1) {
    return 'для рассчета необходимо выбрать модель трубы'
  }
  if(lengthError) {
    return 'для рассчета необходимо ввести корректную длину каркаса'
  }
  if(widthError) {
    return 'для рассчета необходимо ввести корректную ширину каркаса'
  }
  if(!currentStrength.key) {
    return 'для рассчета необходимо выбрать прочность конструкции'
  }
  return 'Рассчитать'
}