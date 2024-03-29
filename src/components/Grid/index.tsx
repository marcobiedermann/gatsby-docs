import React, { FC } from "react"
import * as styles from "./style.module.css"

const Grid: FC = props => {
  return <div className={styles.grid} {...props} />
}

export default Grid
