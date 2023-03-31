import React, { Dispatch, FC, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import { selectors } from 'bll/selectors'
import { BasketTable } from './BasketTable'
import styles from './Basket.module.scss'

type BasketPropsType = {
  setIsOpenBasket: Dispatch<SetStateAction<boolean>>
}

export const Basket: FC<BasketPropsType> = ({ setIsOpenBasket }) => {

  const sheetsList = useSelector(selectors.sheetsList)
  const calculatedSheetsCount = useSelector(selectors.calculatedSheetsCount)
  const calculatedSheetsTotalCost = useSelector(selectors.calculatedSheetsTotalCost)
  const pipesList = useSelector(selectors.pipesList)
  const calculatedPipesCount = useSelector(selectors.calculatedPipesCount)
  const calculatedPipesTotalCost = useSelector(selectors.calculatedPipesTotalCost)
  const screwList = useSelector(selectors.screwList)
  const calculatedScrewsCount = useSelector(selectors.calculatedScrewsCount)
  const calculatedScrewsTotalCost = useSelector(selectors.calculatedScrewsTotalCost)
  const totalMaterialsCost = useSelector(selectors.totalMaterialsCost)

  const tableHeaders = ['Наименование', 'Ед.', 'Количество', 'Сумма']
  const tableItems = [...sheetsList, ...pipesList, ...screwList].map(item => {
    if (item.type === 'list') return { ...item, count: calculatedSheetsCount, totalCost: calculatedSheetsTotalCost.toFixed(1) }
    if (item.type === 'pipe') return { ...item, count: calculatedPipesCount, totalCost: calculatedPipesTotalCost.toFixed(1) }
    return { ...item, count: calculatedScrewsCount, totalCost: calculatedScrewsTotalCost.toFixed(1) }
  })

  const onButtonClick = () => {
    setIsOpenBasket(false)
  }

  return (
    <div className={styles.componentContainer}>
      <div className={styles.title}>Результаты рассчета</div>
      <BasketTable tableHeaders={tableHeaders} tableItems={tableItems} totalMaterialsCost={totalMaterialsCost} />
      <button className={styles.button} onClick={onButtonClick}>Рассчитать с другими параметрами</button>
    </div>
  )
}