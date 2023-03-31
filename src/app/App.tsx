import React, { FC, useState } from 'react'
import { Basket } from 'ui/components/Basket'
import { DataCollection } from 'ui/components/DataCollection'
import styles from './App.module.scss'

export const App: FC = () => {

  const [isOpenBasket, setIsOpenBasket] = useState<boolean>(false)

  return (
    <div className={styles.app}>
      <DataCollection setIsOpenBasket={setIsOpenBasket} isOpenBasket={isOpenBasket} />
      {isOpenBasket && <Basket setIsOpenBasket={setIsOpenBasket}/>}
    </div>
  )
}