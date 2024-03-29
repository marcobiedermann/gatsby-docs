import React, { FC } from "react"
import * as styles from "./style.module.css"

const Main: FC = props => {
  return <main className={styles.main} {...props} />
}

export default Main
