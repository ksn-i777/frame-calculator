import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { calculateAC } from 'bll/reducers/calculation-reducer'
import { changeLengthAC, changeWidthAC, selectFrameAC } from 'bll/reducers/frame-reducer'
import { removeSelectedPipeAC, selectPipeAC, sortPipesListAC } from 'bll/reducers/pipes-reducer'
import { removeSelectedSheetAC, selectSheetAC, sortSheetsListAC } from 'bll/reducers/sheets-reducer'
import { selectors } from 'bll/selectors'
import { useCustomAppDispatch } from 'bll/store'
import { Input } from 'ui/common/Input'
import { Select } from 'ui/common/Select'
import { Table } from 'ui/common/Table'
import { getNewSortConditionUtil } from 'utils/getNewSortConditionUtil'
import { undisableButtonInfoUtil } from 'utils/undisableButtonInfoUtil'
import styles from './DataCollection.module.scss'

type DataCollectionPropsType = {
  isOpenBasket: boolean
  setIsOpenBasket: Dispatch<SetStateAction<boolean>>
}

export const DataCollection: FC<DataCollectionPropsType> = ({ isOpenBasket, setIsOpenBasket }) => {

  const dispatch = useCustomAppDispatch()
  const sheetsList = useSelector(selectors.sheetsList)
  const sortSheetsTableColumn = useSelector(selectors.sortSheetsTableColumn)
  const sortSheetsTableСondition = useSelector(selectors.sortSheetsTableСondition)
  const screwList = useSelector(selectors.screwList)
  const pipesList = useSelector(selectors.pipesList)
  const sortPipesTableColumn = useSelector(selectors.sortPipesTableColumn)
  const sortPipesTableСondition = useSelector(selectors.sortPipesTableСondition)
  const currentLength = useSelector(selectors.currentLength)
  const minLength = useSelector(selectors.minLength)
  const maxLength = useSelector(selectors.maxLength)
  const lengthStep = useSelector(selectors.lengthStep)
  const currentWidth = useSelector(selectors.currentWidth)
  const minWidth = useSelector(selectors.minWidth)
  const maxWidth = useSelector(selectors.maxWidth)
  const widthStep = useSelector(selectors.widthStep)
  const strengthsData = useSelector(selectors.strengthsData)
  const currentStrength = useSelector(selectors.currentStrength)

  const [lengthError, setLengthError] = useState<string>('')
  const [widthError, setWidthError] = useState<string>('')
  const [buttonText, setButtonText] = useState<string>('')

  const tableHeaders = ['Наименование', 'Материал', 'Размеры', 'Ед.', 'Цена за 1 ед.']

  const selectSheet = (sheetName: string) => {
    dispatch(selectSheetAC(sheetName))
  }
  const removeSelectedSheet = () => {
    dispatch(removeSelectedSheetAC())
  }
  const sortSheetsColumnsItems = (sortColumn: string) => {
    dispatch(sortSheetsListAC(sortColumn, getNewSortConditionUtil(sortSheetsTableСondition)))
  }
  const selectPipe = (pipeName: string) => {
    dispatch(selectPipeAC(pipeName))
  }
  const removeSelectedPipe = () => {
    dispatch(removeSelectedPipeAC())
  }
  const sortPipesColumnsItems = (sortColumn: string) => {
    dispatch(sortPipesListAC(sortColumn, getNewSortConditionUtil(sortPipesTableСondition)))
  }
  const changeLength = (newLength: number) => {
    dispatch(changeLengthAC(newLength))
  }
  const changeWidth = (newWidth: number) => {
    dispatch(changeWidthAC(newWidth))
  }
  const changeFrame = (newStrengthKey: string) => {
    dispatch(selectFrameAC(newStrengthKey))
  }
  const onCalculatebuttonClick = () => {
    dispatch(calculateAC(sheetsList[0], pipesList[0], currentLength, currentWidth, currentStrength, screwList[0]))
    setIsOpenBasket(true)
  }

  useEffect(() => {
    setButtonText(undisableButtonInfoUtil(sheetsList, pipesList, lengthError, widthError, currentStrength))
  }, [sheetsList, pipesList, lengthError, widthError, currentStrength])

  return (
    <div className={styles.componentContainer}>
      <Table
        isOpenBasket={isOpenBasket}
        tableHeaders={tableHeaders}
        tableItems={sheetsList}
        sortColumn={sortSheetsTableColumn}
        sortCondition={sortSheetsTableСondition}
        selectItem={selectSheet}
        removeSelectedItem={removeSelectedSheet}
        sortItems={sortSheetsColumnsItems}
      />
      <Table
        isOpenBasket={isOpenBasket}
        tableHeaders={tableHeaders}
        tableItems={pipesList}
        sortColumn={sortPipesTableColumn}
        sortCondition={sortPipesTableСondition}
        selectItem={selectPipe}
        removeSelectedItem={removeSelectedPipe}
        sortItems={sortPipesColumnsItems}
      />
      <Input
        isOpenBasket={isOpenBasket}
        title={`Укажите длину каркаса от ${minLength} до ${maxLength}м (шаг ${lengthStep}м):`}
        value={currentLength}
        minInputValue={minLength}
        maxInputValue={maxLength}
        valueStep={lengthStep}
        error={lengthError}
        setError={setLengthError}
        changeInputValue={changeLength}
      />
      <Input
        isOpenBasket={isOpenBasket}
        title={`Укажите ширину каркаса от ${minWidth} до ${maxWidth}м (шаг ${widthStep}м):`}
        value={currentWidth}
        minInputValue={minWidth}
        maxInputValue={maxWidth}
        valueStep={widthStep}
        error={widthError}
        setError={setWidthError}
        changeInputValue={changeWidth}
      />
      <Select
        isOpenBasket={isOpenBasket}
        title={'Укажите прочность конструкции:'}
        options={strengthsData}
        currentValue={currentStrength.key}
        setCurrentValue={changeFrame}
      />
      {!isOpenBasket &&
        <button
          disabled={buttonText !== 'Рассчитать'}
          className={buttonText === 'Рассчитать' ? styles.button : styles.disabledButton}
          onClick={onCalculatebuttonClick}
        >
          {buttonText}
        </button>
      }
    </div>
  )
}