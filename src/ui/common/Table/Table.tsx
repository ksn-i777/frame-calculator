import React, { FC } from 'react'
import { sheetProportionsUtil } from 'utils/sheetProportionsUtil'
import { pipeProportionsUtil } from 'utils/pipeProportionsUtil'
import styles from './Table.module.scss'
import sortList from './icons/list_dashes_icon_174419.svg'
import sortArrowDown from './icons/downarrow_121316.svg'
import sortArrowUp from './icons/uparrow2_89326.svg'

type TablePropsType = {
  isOpenBasket: boolean
  tableHeaders: string[]
  tableItems: any[]
  sortColumn: string
  sortCondition: string
  selectItem: (itemName: string) => void
  removeSelectedItem: () => void
  sortItems: (sortColumn: string) => void
}

export const Table: FC<TablePropsType> = (
  { isOpenBasket, tableHeaders, tableItems, sortColumn, sortCondition, selectItem, removeSelectedItem, sortItems }) => {

  const mappedTabelHeaders = tableHeaders.map(header => {
    const sortImg = sortCondition === '' ? sortList : sortCondition === 'asc' ? sortArrowDown : sortArrowUp
    return (
      <th key={header} className={styles.th}>
        <span>{header}</span>
        <img className={styles.icon} src={header === sortColumn ? sortImg : sortList} onClick={() => onColumnSortIconClick(header)} alt={'sort icon'} />
      </th>
    )
  })

  const mappedTabelItems = tableItems.map(item => (
    <tr key={item.name}>
      <td className={styles.td}>{item.name}</td>
      <td className={styles.td}>{item.material ? item.material : '-'}</td>
      <td className={styles.td}>{item.type === 'list' ? sheetProportionsUtil(item.width) : pipeProportionsUtil(item.width)}</td>
      <td className={styles.td}>{item.unit}</td>
      <td className={styles.td}>{item.price}</td>
      <td>
        {tableItems.length !== 1
          ? <button className={styles.button} onClick={() => onSelectItemButtonClick(item.name)}>выбрать материал</button>
          : !isOpenBasket && <button className={styles.button} onClick={onRemoveSelectButtonClick}>отменить выбор</button>
        }
      </td>
    </tr>
  ))

  function onSelectItemButtonClick(itemName: string) {
    selectItem(itemName)
  }
  function onRemoveSelectButtonClick() {
    removeSelectedItem()
  }
  function onColumnSortIconClick(sortColumn: string) {
    sortItems(sortColumn)
  }

  return (
    <table className={styles.table}>
      {tableItems.length > 1 && <caption className={styles.caption}>Выберите материал из списка</caption>}
      <thead>
        <tr>
          {mappedTabelHeaders}
        </tr>
      </thead>
      <tbody>
        {mappedTabelItems}
      </tbody>
    </table>
  )
}