import React, { FC } from 'react'
import styles from './BasketTable.module.scss'

type BasketTablePropsType = {
  tableHeaders: string[]
  tableItems: any[]
  totalMaterialsCost: number
}

export const BasketTable: FC<BasketTablePropsType> = ({ tableHeaders, tableItems, totalMaterialsCost }) => {

  const mappedTabelHeaders = tableHeaders.map(header => <th key={header} className={styles.th}>{header}</th>)

  const mappedTabelItems = tableItems.map(item => (
    <tr key={item.name}>
      <td className={styles.td}>{item.name}</td>
      <td className={styles.td}>{item.unit}</td>
      <td className={styles.td}>{item.count}</td>
      <td className={styles.td}>{item.totalCost}</td>
    </tr>
  ))

  return (
    <div className={styles.componentContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {mappedTabelHeaders}
          </tr>
        </thead>
        <tbody>
          {mappedTabelItems}
        </tbody>
      </table>
      <div className={styles.totalCostInfo}>Итоговая сумма: {totalMaterialsCost.toFixed(1)}</div>
    </div>
  )
}